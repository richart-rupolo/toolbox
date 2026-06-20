import 'reflect-metadata'
import forge from 'node-forge'
import {
  BasicConstraintsExtension,
  DNS,
  ExtendedKeyUsage,
  ExtendedKeyUsageExtension,
  IP,
  KeyUsageFlags,
  KeyUsagesExtension,
  PemConverter,
  SubjectAlternativeNameExtension,
  X509CertificateGenerator,
} from '@peculiar/x509'
import type { JsonGeneralNames } from '@peculiar/x509'
import { AsnConvert, OctetString } from '@peculiar/asn1-schema'
import { ContentInfo, id_data } from '@peculiar/asn1-cms'
import {
  AuthenticatedSafe,
  CertBag,
  PFX,
  SafeBag,
  SafeContents,
  id_certBag,
  id_keyBag,
  id_x509Certificate,
} from '@peculiar/asn1-pfx'

export type CertificateAlgorithm = 'rsa' | 'ecdsa'
export type EcCurveName = 'P-256' | 'P-384' | 'P-521'

export interface CertificateFormValues {
  algorithm: CertificateAlgorithm
  commonName: string
  organization: string
  country: string
  validityDays: number
  keySize: number
  ecCurve: EcCurveName
  subjectAltNames: string
  pfxPassword: string
}

export interface GeneratedCertificate {
  certificatePem: string
  privateKeyPem: string
  combinedPem: string
  pfxBlob: Blob
  pfxPasswordProtected: boolean
}

const parseForgeSubjectAltNames = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((name) => ({
      type: /^(\d{1,3}\.){3}\d{1,3}$/.test(name) ? 7 : 2,
      value: name,
    }))

const parseX509SubjectAltNames = (value: string, fallbackName: string): JsonGeneralNames => {
  const names = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return (names.length ? names : [fallbackName]).map((name) => ({
    type: /^(\d{1,3}\.){3}\d{1,3}$/.test(name) ? IP : DNS,
    value: name,
  }))
}

const buildForgeSubject = ({ commonName, country, organization }: CertificateFormValues) => [
  { name: 'commonName', value: commonName.trim() },
  { name: 'organizationName', value: organization.trim() },
  { name: 'countryName', value: country.trim().slice(0, 2).toUpperCase() },
]

const buildX509Subject = ({ commonName, country, organization }: CertificateFormValues) =>
  `CN=${commonName.trim()}, O=${organization.trim()}, C=${country.trim().slice(0, 2).toUpperCase()}`

const forgeBytesToUint8Array = (bytes: string) => {
  const buffer = new Uint8Array(bytes.length)

  for (let index = 0; index < bytes.length; index += 1) {
    buffer[index] = bytes.charCodeAt(index)
  }

  return buffer
}

const arrayBufferToBlob = (buffer: ArrayBuffer, type: string) => new Blob([new Uint8Array(buffer)], { type })

const createEcPfxBlob = (privateKeyDer: ArrayBuffer, certificateDer: ArrayBuffer) => {
  const keyBag = new SafeBag({
    bagId: id_keyBag,
    bagValue: privateKeyDer,
  })
  const certBag = new SafeBag({
    bagId: id_certBag,
    bagValue: AsnConvert.serialize(
      new CertBag({
        certId: id_x509Certificate,
        certValue: AsnConvert.serialize(new OctetString(certificateDer)),
      }),
    ),
  })
  const safeContents = AsnConvert.serialize(new SafeContents([keyBag, certBag]))
  const authenticatedSafe = AsnConvert.serialize(
    new AuthenticatedSafe([
      new ContentInfo({
        contentType: id_data,
        content: AsnConvert.serialize(new OctetString(safeContents)),
      }),
    ]),
  )
  const pfx = new PFX({
    authSafe: new ContentInfo({
      contentType: id_data,
      content: AsnConvert.serialize(new OctetString(authenticatedSafe)),
    }),
  })

  pfx.macData = undefined as never

  return arrayBufferToBlob(AsnConvert.serialize(pfx), 'application/x-pkcs12')
}

const validateCommonValues = (values: CertificateFormValues) => {
  if (!values.commonName.trim()) {
    throw new Error('Informe um dominio ou nome comum para o certificado.')
  }

  const validityDays = Number(values.validityDays)

  if (!Number.isFinite(validityDays) || validityDays < 1 || validityDays > 3650) {
    throw new Error('A validade deve ficar entre 1 e 3650 dias.')
  }
}

const generateRsaCertificate = (values: CertificateFormValues): GeneratedCertificate => {
  const keySize = Number(values.keySize)

  if (![2048, 3072, 4096].includes(keySize)) {
    throw new Error('Escolha um tamanho de chave valido.')
  }

  const keys = forge.pki.rsa.generateKeyPair({ bits: keySize, workers: -1 })
  const certificate = forge.pki.createCertificate()
  const now = new Date()
  const expiresAt = new Date(now)

  expiresAt.setDate(expiresAt.getDate() + Number(values.validityDays))

  certificate.publicKey = keys.publicKey
  certificate.serialNumber = forge.util.bytesToHex(forge.random.getBytesSync(16))
  certificate.validity.notBefore = now
  certificate.validity.notAfter = expiresAt

  const subject = buildForgeSubject(values)
  certificate.setSubject(subject)
  certificate.setIssuer(subject)

  const altNames = parseForgeSubjectAltNames(values.subjectAltNames)
  certificate.setExtensions([
    {
      name: 'basicConstraints',
      cA: false,
    },
    {
      name: 'keyUsage',
      digitalSignature: true,
      keyEncipherment: true,
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
    },
    {
      name: 'subjectAltName',
      altNames: altNames.length ? altNames : [{ type: 2, value: values.commonName.trim() }],
    },
  ])

  certificate.sign(keys.privateKey, forge.md.sha256.create())

  const certificatePem = forge.pki.certificateToPem(certificate)
  const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey)
  const pfxAsn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [certificate], values.pfxPassword, {
    algorithm: '3des',
    friendlyName: values.commonName.trim(),
  })
  const pfxDer = forge.asn1.toDer(pfxAsn1).getBytes()

  return {
    certificatePem,
    privateKeyPem,
    combinedPem: `${certificatePem}\n${privateKeyPem}`,
    pfxBlob: new Blob([forgeBytesToUint8Array(pfxDer)], { type: 'application/x-pkcs12' }),
    pfxPasswordProtected: Boolean(values.pfxPassword),
  }
}

const getEcHashName = (curve: EcCurveName) => {
  if (curve === 'P-521') {
    return 'SHA-512'
  }

  if (curve === 'P-384') {
    return 'SHA-384'
  }

  return 'SHA-256'
}

const generateEcCertificate = async (values: CertificateFormValues): Promise<GeneratedCertificate> => {
  const curve = values.ecCurve

  if (!['P-256', 'P-384', 'P-521'].includes(curve)) {
    throw new Error('Escolha uma curva eliptica valida.')
  }

  const signingAlgorithm = {
    name: 'ECDSA',
    namedCurve: curve,
    hash: getEcHashName(curve),
  }
  const keys = await crypto.subtle.generateKey(signingAlgorithm, true, ['sign', 'verify'])
  const now = new Date()
  const expiresAt = new Date(now)

  expiresAt.setDate(expiresAt.getDate() + Number(values.validityDays))

  const certificate = await X509CertificateGenerator.createSelfSigned({
    serialNumber: forge.util.bytesToHex(forge.random.getBytesSync(16)),
    name: buildX509Subject(values),
    notBefore: now,
    notAfter: expiresAt,
    signingAlgorithm,
    keys,
    extensions: [
      new BasicConstraintsExtension(false, undefined, true),
      new KeyUsagesExtension(KeyUsageFlags.digitalSignature, true),
      new ExtendedKeyUsageExtension([ExtendedKeyUsage.serverAuth, ExtendedKeyUsage.clientAuth]),
      new SubjectAlternativeNameExtension(parseX509SubjectAltNames(values.subjectAltNames, values.commonName.trim())),
    ],
  })
  const privateKeyDer = await crypto.subtle.exportKey('pkcs8', keys.privateKey)
  const certificatePem = certificate.toString('pem')
  const privateKeyPem = PemConverter.encode(privateKeyDer, PemConverter.PrivateKeyTag)

  return {
    certificatePem,
    privateKeyPem,
    combinedPem: `${certificatePem}\n${privateKeyPem}`,
    pfxBlob: createEcPfxBlob(privateKeyDer, certificate.rawData),
    pfxPasswordProtected: false,
  }
}

export const generateSelfSignedCertificate = async (
  values: CertificateFormValues,
): Promise<GeneratedCertificate> => {
  validateCommonValues(values)

  if (values.algorithm === 'ecdsa') {
    return generateEcCertificate(values)
  }

  return generateRsaCertificate(values)
}

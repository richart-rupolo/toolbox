import { downloadBlob, downloadTextFile } from '../utils/fileDownload'

export const useFileDownload = () => {
  const downloadText = (content: string, fileName: string) => {
    downloadTextFile(content, fileName)
  }

  return { downloadBlob, downloadText }
}

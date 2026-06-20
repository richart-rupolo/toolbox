import { writeClipboardText } from '../utils/clipboard'

export const useClipboard = () => {
  const copyText = async (text: string) => writeClipboardText(text)

  return { copyText }
}

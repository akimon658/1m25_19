import { useMutation } from "@tanstack/react-query"
import { commands } from "../../../api/bindings.gen.ts"

// 合成フック（複数のテキストを合成）
export const useAudioSynth = () => {
  const { mutateAsync: synthMultiple } = useMutation({
    mutationFn: async (texts: string[]) => {
      const results: Record<string, string> = {}
      for (const text of texts) {
        const audioData = await commands.synth(text)
        results[text] = URL.createObjectURL(
          new Blob([new Uint8Array(audioData)]),
        )
      }
      return results
    },
  })
  return { synthMultiple }
}

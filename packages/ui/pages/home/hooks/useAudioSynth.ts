import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { commands } from "../../../api/bindings.gen.ts"

type UseAudioSynthOptions = Omit<
  UseMutationOptions<Record<string, string>, unknown, string[]>,
  "mutationFn"
>

export const useAudioSynth = (opts: UseAudioSynthOptions) => {
  const { mutate: synth, ...rest } = useMutation({
    mutationFn: async (texts: string[]) => {
      const results: Record<string, string> = {}
      const promises = texts.map(async (text) => {
        const audioData = await commands.synth(text)
        results[text] = URL.createObjectURL(
          new Blob([new Uint8Array(audioData)]),
        )
      })

      await Promise.all(promises)

      return results
    },
    ...opts,
  })

  return { synth, ...rest }
}

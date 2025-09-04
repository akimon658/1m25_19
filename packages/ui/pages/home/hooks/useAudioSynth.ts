import { useMutation, type UseMutationOptions } from "@tanstack/react-query"
import { commands } from "../../../api/bindings.gen.ts"

type SynthVariables = {
  texts: string[]
  context: {
    readingName: string
  }
}

type UseAudioSynthOptions = Omit<
  UseMutationOptions<
    Record<string, string>,
    unknown,
    SynthVariables
  >,
  "mutationFn"
>

export const useAudioSynth = (opts: UseAudioSynthOptions) => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async ({ texts }) => {
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

  return { synth: mutate, ...rest }
}

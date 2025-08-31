import { useMutation } from "@tanstack/react-query"
import { type Answer, commands } from "../../../api/bindings.gen.ts"

export const useSubmitAnswer = (graphId: number) => {
  const { mutate: submitAnswer, ...rest } = useMutation({
    mutationFn: (answer: Answer) => commands.submitAnswer(graphId, answer),
  })

  return { submitAnswer, ...rest }
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  commands,
  type Graph,
  type GraphMetadata,
} from "../../../api/bindings.gen.ts"
import { keyGetGraph, keyGetGraphs } from "../../../api/queryKey.ts"

export const useGenerateGraph = () => {
  const queryClient = useQueryClient()
  const { mutate: generate_graph, ...rest } = useMutation({
    mutationFn: commands.generateGraph,
    onSuccess: (data) => {
      queryClient.setQueryData<Graph>(keyGetGraph(data.id), data)
      queryClient.setQueryData<GraphMetadata[]>(
        keyGetGraphs,
        (old) => [...(old || []), data],
      )
    },
  })

  return { generate_graph, ...rest }
}

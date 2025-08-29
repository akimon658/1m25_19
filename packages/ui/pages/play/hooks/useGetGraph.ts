import { useQuery } from "@tanstack/react-query"
import { commands } from "../../../api/bindings.gen.ts"
import { keyGetGraph } from "../../../api/query_keys.ts"

export const useGetGraph = (graphId: number) => {
  const { data: graph, ...rest } = useQuery({
    queryKey: keyGetGraph(graphId),
    queryFn: () => commands.getGraph(graphId),
    enabled: !Number.isNaN(graphId),
  })

  return { graph, ...rest }
}

import { useQuery } from "@tanstack/react-query"
import { commands } from "../api/bindings.gen.ts"
import { keyGetGraph } from "../api/queryKey.ts"

export const useGetGraph = (graphId: number) => {
  const { data: graph, ...rest } = useQuery({
    queryKey: keyGetGraph(graphId),
    queryFn: () => commands.getGraph(graphId),
    select: (data) => ({
      ...data,
      edges: data.edges.map((edge, index) => ({
        id: index.toString(),
        source: edge.source.toString(),
        target: edge.target.toString(),
      })),
      nodes: Array.from({ length: data.num_nodes }, (_, index) => ({
        id: index.toString(),
        data: { clickable: true, selected: false },
        position: { x: 0, y: 0 }, // Initial position, will be updated by layout
      })),
    }),
  })

  return { graph, ...rest }
}

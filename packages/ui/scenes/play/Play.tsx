import { useQuery } from "@tanstack/react-query"
import { keyGenerateGraph } from "../../api/mutation_keys.ts"
import { commands } from "../../api/bindings.gen.ts"
import { Player } from "./components/Player.tsx"

export const Play = () => {
  const { data: graph } = useQuery({
    queryKey: keyGenerateGraph,
    queryFn: commands.generateGraph,
  })

  if (!graph) {
    return null
  }

  return (
    <div>
      <Player
        edges={graph.edges.map((edge, index) => ({
          id: index.toString(),
          source: edge.source.toString(),
          target: edge.target.toString(),
        }))}
        nodes={[...Array(graph.num_nodes)].map((_, index) => ({
          id: index.toString(),
          data: { label: `Node ${index}` },
          position: { x: 0, y: 0 }, // Placeholder position, adjust as needed
        }))}
      />
    </div>
  )
}

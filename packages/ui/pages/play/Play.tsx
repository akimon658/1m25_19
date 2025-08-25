import { useQuery } from "@tanstack/react-query"
import { commands } from "../../api/bindings.gen.ts"
import { keyGenerateGraph } from "../../api/query_keys.ts"
import { Player } from "./components/Player.tsx"
import { getLayoutedNodes } from "./lib/layout.ts"
import { playPageStyle } from "./play.css.ts"

export const Play = () => {
  const { data: graph } = useQuery({
    queryKey: keyGenerateGraph,
    queryFn: commands.generateGraph,
  })

  if (!graph) {
    return null
  }

  const edges = graph.edges.map((edge, index) => ({
    id: index.toString(),
    source: edge.source.toString(),
    target: edge.target.toString(),
  }))
  const nodes = Array.from({ length: graph.num_nodes }, (_, index) => ({
    id: index.toString(),
    data: { clickable: true, selected: false },
    position: { x: 0, y: 0 }, // Initial position, will be updated by layout
  }))

  return (
    <div className={playPageStyle}>
      <Player
        edges={edges}
        nodes={getLayoutedNodes(nodes, edges)}
      />
    </div>
  )
}

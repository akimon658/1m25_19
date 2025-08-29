import { Link, useParams } from "react-router"
import { Player } from "./components/Player.tsx"
import { getLayoutedNodes } from "./lib/layout.ts"
import { playPageStyle } from "./play.css.ts"
import { useGetGraph } from "./hooks/useGetGraph.ts"

export const Play = () => {
  const { graphId } = useParams<{ graphId: string }>()
  const { graph } = useGetGraph(Number(graphId))

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
      <Link to="/">ホーム</Link>
      <Player
        edges={edges}
        nodes={getLayoutedNodes(nodes, edges)}
      />
    </div>
  )
}

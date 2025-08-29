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

  return (
    <div className={playPageStyle}>
      <Link to="/">ホーム</Link>
      <Player
        edges={graph.edges}
        nodes={getLayoutedNodes(graph.nodes, graph.edges)}
      />
    </div>
  )
}

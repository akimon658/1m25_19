import { Link, useParams } from "react-router"
import { Player } from "./components/Player.tsx"
import { useGetGraph } from "./hooks/useGetGraph.ts"
import { useSubmitAnswer } from "./hooks/useSubmitAnswer.ts"
import { getLayoutedNodes } from "./lib/layout.ts"
import { playerWrapperStyle, playPageStyle } from "./play.css.ts"

export const Play = () => {
  const { graphId } = useParams<{ graphId: string }>()
  const { graph } = useGetGraph(Number(graphId))
  const { submitAnswer } = useSubmitAnswer(Number(graphId))

  if (!graph) {
    return null
  }

  return (
    <div className={playPageStyle}>
      <Link to="/">ホーム</Link>

      <div className={playerWrapperStyle}>
        <Player
          edges={graph.edges}
          nodes={getLayoutedNodes(graph.nodes, graph.edges)}
          onAnswerSubmit={submitAnswer}
        />
      </div>
    </div>
  )
}

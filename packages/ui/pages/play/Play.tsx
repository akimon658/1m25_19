import { useState } from "react"
import { Link, useParams } from "react-router"
import { useGetGraph } from "../../hooks/useGetGraph.ts"
import { ClearDialog } from "./components/ClearDialog.tsx"
import { Player } from "./components/Player.tsx"
import { useSubmitAnswer } from "./hooks/useSubmitAnswer.ts"
import { playerWrapperStyle, playPageStyle } from "./play.css.ts"

export const Play = () => {
  const { graphId } = useParams<{ graphId: string }>()
  const { graph } = useGetGraph(Number(graphId))
  const { submitAnswer } = useSubmitAnswer(Number(graphId))
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)

  if (!graph) {
    return null
  }

  return (
    <div className={playPageStyle}>
      <Link to="/">ホーム</Link>

      <div className={playerWrapperStyle}>
        <Player
          key={graph.id}
          edges={graph.edges}
          nodes={graph.nodes}
          onClear={(answer) => {
            submitAnswer(answer)
            setIsClearDialogOpen(true)
          }}
        />
        <ClearDialog
          open={isClearDialogOpen}
          onOpenChange={setIsClearDialogOpen}
        />
      </div>
    </div>
  )
}

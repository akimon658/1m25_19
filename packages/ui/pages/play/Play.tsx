import { useState } from "react"
import { Link, useParams } from "react-router"
import { useGetGraph } from "../../hooks/useGetGraph.ts"
import { useGenerateGraph } from "../home/hooks/useGenerateGraph.ts"
import { ClearDialog } from "./components/ClearDialog.tsx"
import { Player } from "./components/Player.tsx"
import { useSubmitAnswer } from "./hooks/useSubmitAnswer.ts"
import { playerWrapperStyle, playPageStyle } from "./play.css.ts"

export const Play = () => {
  const { graphId } = useParams<{ graphId: string }>()
  const { graph } = useGetGraph(Number(graphId))
  const { submitAnswer } = useSubmitAnswer(Number(graphId))
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const { generateGraph } = useGenerateGraph()
  const [nextGraphId, setNextGraphId] = useState<number>()

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
          onClear={async (answer) => {
            submitAnswer(answer)

            const newGraph = await generateGraph()

            setNextGraphId(newGraph.id)
            setIsClearDialogOpen(true)
          }}
        />
        {nextGraphId && (
          <ClearDialog
            open={isClearDialogOpen}
            onOpenChange={setIsClearDialogOpen}
            nextGraphId={nextGraphId}
          />
        )}
      </div>
    </div>
  )
}

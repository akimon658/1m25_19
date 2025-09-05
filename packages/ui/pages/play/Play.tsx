import { useState } from "react"
import { Link, useParams } from "react-router"
import type { Answer } from "../../api/bindings.gen.ts"
import { useGetGraph } from "../../hooks/useGetGraph.ts"
import { useGenerateGraph } from "../home/hooks/useGenerateGraph.ts"
import { ClearDialog } from "./components/ClearDialog.tsx"
import { Player } from "./components/Player.tsx"
import { useSubmitAnswer } from "./hooks/useSubmitAnswer.ts"
import { playerWrapperStyle, playPageStyle } from "./play.css.ts"

type PlayProps = {
  graphId?: number
  isTutorial?: boolean
  onClear?: (answer: Answer) => void
}

export const Play = (
  { graphId: graphIdFromProps, isTutorial, onClear }: PlayProps = {},
) => {
  const { graphId: graphIdFromParams } = useParams<{ graphId: string }>()
  const graphId = graphIdFromProps ?? Number(graphIdFromParams)
  const { graph } = useGetGraph(graphId)
  const { submitAnswer } = useSubmitAnswer(graphId)
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const { generateGraph } = useGenerateGraph()
  const [nextGraphId, setNextGraphId] = useState<number>()

  if (!graph) {
    return null
  }

  return (
    <div className={playPageStyle}>
      {!isTutorial && <Link to="/">ホーム</Link>}

      <div className={playerWrapperStyle}>
        <Player
          key={graph.id}
          edges={graph.edges}
          nodes={graph.nodes}
          onClear={async (answer) => {
            submitAnswer(answer)

            if (isTutorial) {
              onClear?.(answer)
              return
            }

            const newGraph = await generateGraph()

            setNextGraphId(newGraph.id)
            setIsClearDialogOpen(true)
          }}
        />
        {!isTutorial && nextGraphId && (
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

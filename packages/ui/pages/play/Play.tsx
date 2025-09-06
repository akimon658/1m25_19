import { useState } from "react"
import { useParams } from "react-router"
import type { Answer } from "../../api/bindings.gen.ts"
import { useGetGraph } from "../../hooks/useGetGraph.ts"
import { useGenerateGraph } from "../home/hooks/useGenerateGraph.ts"
import { CharacterDialogOverlay } from "./components/CharacterDialogOverlay.tsx"
import { CharacterDisplay } from "./components/CharacterDisplay.tsx"
import { ClearDialog } from "./components/ClearDialog.tsx"
import { Player } from "./components/Player.tsx"
import { useSubmitAnswer } from "./hooks/useSubmitAnswer.ts"
import { clearDialogs, type Dialog, stuckDialogs } from "./lib/dialogs.ts"
import { playerWrapperStyle, playPageStyle } from "./play.css.ts"

type ClearResult = {
  timeMs: number
  isCycle: boolean
}

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
  const [nextGraphId, setNextGraphId] = useState<number | undefined>()
  const [clearResult, setClearResult] = useState<ClearResult | null>(null)
  const [dialogQueue, setDialogQueue] = useState<Dialog[]>([])
  const [clearDialogData, setClearDialogData] = useState<Dialog | null>(null)

  if (!graph) {
    return null
  }

  const handleStuck = () => {
    setDialogQueue(stuckDialogs)
  }

  const handleDialogEnd = () => {
    setDialogQueue([])
  }

  const handleClearDialogOpenChange = (open: boolean) => {
    setIsClearDialogOpen(open)
    if (!open) {
      // ダイアログが閉じたらキャラクター表示も消す
      setClearDialogData(null)
    }
  }

  return (
    <div className={playPageStyle}>
      <div className={playerWrapperStyle}>
        <Player
          key={graph.id}
          edges={graph.edges}
          nodes={graph.nodes}
          isTutorial={isTutorial}
          onStuck={handleStuck}
          onClear={async (result) => {
            const answer: Answer = {
              time_ms: result.time_ms,
              path: result.path,
            }
            submitAnswer(answer)

            if (isTutorial) {
              onClear?.(answer)
              return
            }

            const dialog = result.isCycle
              ? clearDialogs.perfect
              : clearDialogs.normal
            setClearDialogData(dialog)

            setClearResult({
              timeMs: result.time_ms,
              isCycle: result.isCycle,
            })
            // 未クリアのグラフの場合のみ、新しいグラフを生成する
            if (graph.best_time_ms === null) {
              const newGraph = await generateGraph()
              setNextGraphId(newGraph.id)
            }
            setIsClearDialogOpen(true)
          }}
        />
        {dialogQueue.length > 0 && (
          <CharacterDialogOverlay
            dialogQueue={dialogQueue}
            onEnd={handleDialogEnd}
          />
        )}
        {clearDialogData && <CharacterDisplay dialog={clearDialogData} />}
        {!isTutorial && clearResult && (
          <ClearDialog
            open={isClearDialogOpen}
            onOpenChange={handleClearDialogOpenChange}
            nextGraphId={nextGraphId}
            result={clearResult}
            isPerfected={graph.cycle_found}
          />
        )}
      </div>
    </div>
  )
}

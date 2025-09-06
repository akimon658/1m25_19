import { Panel } from "@xyflow/react"
import { Link } from "react-router"
import type { Answer } from "../../../api/bindings.gen.ts"
import { Button } from "../../../components/Button.tsx"
import { GraphRenderer } from "../../../components/GraphRenderer.tsx"
import type { SelectableEdge, SelectableNode } from "../../../model/graph.ts"
import { useNodeSelection } from "../hooks/useNodeSelection.ts"
import { reactFlowWrapperStyle } from "./player.css.ts"
import { ResetDialog } from "./ResetDialog.tsx"

type ClearResult = Answer & {
  isCycle: boolean
}

type PlayerProps = {
  edges: SelectableEdge[]
  isTutorial?: boolean
  nodes: SelectableNode[]
  onClear: (result: ClearResult) => void
}

export const Player = (
  { edges: initialEdges, isTutorial, nodes: initialNodes, onClear }:
    PlayerProps,
) => {
  const { resetSelection, ...graphRendererProps } = useNodeSelection({
    initialEdges,
    initialNodes,
    onClear,
  })

  return (
    <div className={reactFlowWrapperStyle}>
      <GraphRenderer {...graphRendererProps}>
        {!isTutorial && (
          <Panel position="top-left">
            <Button asChild>
              <Link to="/">ホームへ</Link>
            </Button>
          </Panel>
        )}
        <Panel position="bottom-right">
          <ResetDialog
            onAccept={resetSelection}
          />
        </Panel>
      </GraphRenderer>
    </div>
  )
}

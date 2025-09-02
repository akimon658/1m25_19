import { Panel } from "@xyflow/react"
import type { Answer } from "../../../api/bindings.gen.ts"
import { GraphRenderer } from "../../../components/GraphRenderer.tsx"
import type { SelectableEdge, SelectableNode } from "../../../model/graph.ts"
import { useNodeSelection } from "../hooks/useNodeSelection.ts"
import { reactFlowWrapperStyle } from "./player.css.ts"
import { ResetDialog } from "./ResetDialog.tsx"

type PlayerProps = {
  edges: SelectableEdge[]
  nodes: SelectableNode[]
  onClear: (answer: Answer) => void
}

export const Player = (
  { edges: initialEdges, nodes: initialNodes, onClear }: PlayerProps,
) => {
  const { resetSelection, ...graphRendererProps } = useNodeSelection({
    initialEdges,
    initialNodes,
    onClear,
  })

  return (
    <div className={reactFlowWrapperStyle}>
      <GraphRenderer {...graphRendererProps}>
        <Panel position="bottom-right">
          <ResetDialog
            onAccept={resetSelection}
          />
        </Panel>
      </GraphRenderer>
    </div>
  )
}

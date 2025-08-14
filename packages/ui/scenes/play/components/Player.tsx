import { type Edge, type Node, ReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { CustomNode } from "./CustomNode.tsx"
import { playerWrapperStyle } from "./player.css.ts"

const nodeTypes = {
  custom: CustomNode,
}

type PlayerProps = {
  edges: Edge[]
  nodes: Node[]
}

export const Player = ({ edges, nodes }: PlayerProps) => {
  return (
    <div className={playerWrapperStyle}>
      <ReactFlow
        defaultEdgeOptions={{ type: "straight" }}
        edges={edges}
        nodes={nodes.map((node) => ({ ...node, type: "custom" }))}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  )
}

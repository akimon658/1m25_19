import { type Edge, type Node, ReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { playerWrapperStyle } from "./player.css.ts"

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
        nodes={nodes}
      />
    </div>
  )
}

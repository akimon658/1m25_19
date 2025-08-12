import { type Edge, type Node, ReactFlow } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

type PlayerProps = {
  edges: Edge[]
  nodes: Node[]
}

export const Player = ({ edges, nodes }: PlayerProps) => {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <ReactFlow edges={edges} nodes={nodes} />
    </div>
  )
}

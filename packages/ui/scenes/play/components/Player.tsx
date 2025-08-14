import { type Edge, ReactFlow, useNodesState } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useState } from "react"
import type { SelectableNode } from "../lib/nodeData.ts"
import { CustomNode } from "./CustomNode.tsx"
import { playerWrapperStyle } from "./player.css.ts"

const nodeTypes = {
  custom: CustomNode,
}

type PlayerProps = {
  edges: Edge[]
  nodes: SelectableNode[]
}

export const Player = ({ edges, nodes: initialNodes }: PlayerProps) => {
  const [nodes, setNodes] = useNodesState(initialNodes)
  const [selectedPath, setSelectedPath] = useState<string[]>([])
  const onNodeClick = (_: unknown, node: SelectableNode) => {
    const lastNodeId = selectedPath.at(-1)

    if (lastNodeId === node.id) {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === lastNodeId ? { ...n, data: { selected: false } } : n
        )
      )
      setSelectedPath((prev) => prev.filter((id) => id !== lastNodeId))

      return
    }

    const isNeighbor = edges.some((edge) =>
      (edge.source === lastNodeId && edge.target === node.id) ||
      (edge.source === node.id && edge.target === lastNodeId)
    )
    const isSelected = selectedPath.includes(node.id)

    if (lastNodeId === undefined || (isNeighbor && !isSelected)) {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === node.id ? { ...n, data: { selected: true } } : n
        )
      )
      setSelectedPath((prev) => [...prev, node.id])
    }
  }

  return (
    <div className={playerWrapperStyle}>
      <ReactFlow
        defaultEdgeOptions={{ type: "straight" }}
        edges={edges}
        nodes={nodes.map((node) => ({ ...node, type: "custom" }))}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  )
}

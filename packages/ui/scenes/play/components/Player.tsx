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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])
  const onNodeClick = (_: unknown, node: SelectableNode) => {
    if (node.data.clickable === false) {
      return
    }

    const lastNodeId = selectedNodeIds.at(-1)

    if (lastNodeId === node.id) {
      const previousNodeId = selectedNodeIds.at(-2)

      if (previousNodeId === undefined) {
        setNodes((nodes) =>
          nodes.map((n) => ({
            ...n,
            data: {
              clickable: true,
              selected: false,
            },
          }))
        )
      } else {
        const clickableNodeIds = new Set([lastNodeId, previousNodeId])

        for (const edge of edges) {
          if (
            (edge.source === previousNodeId &&
              !selectedNodeIds.includes(edge.target)) ||
            (edge.target === previousNodeId &&
              !selectedNodeIds.includes(edge.source))
          ) {
            clickableNodeIds.add(edge.source)
            clickableNodeIds.add(edge.target)
          }
        }

        setNodes((nodes) =>
          nodes.map((n) => ({
            ...n,
            data: {
              clickable: clickableNodeIds.has(n.id),
              selected: n.id === lastNodeId ? false : n.data.selected,
            },
          }))
        )
      }

      setSelectedNodeIds((prev) => prev.filter((id) => id !== lastNodeId))

      return
    }

    const isNeighbor = edges.some((edge) =>
      (edge.source === lastNodeId && edge.target === node.id) ||
      (edge.source === node.id && edge.target === lastNodeId)
    )
    const isSelected = selectedNodeIds.includes(node.id)

    if (lastNodeId === undefined || (isNeighbor && !isSelected)) {
      const clickableNodeIds = new Set([node.id])

      for (const edge of edges) {
        if (
          (edge.source === node.id && !selectedNodeIds.includes(edge.target)) ||
          (edge.target === node.id && !selectedNodeIds.includes(edge.source))
        ) {
          clickableNodeIds.add(edge.source)
          clickableNodeIds.add(edge.target)
        }
      }

      setNodes((nodes) =>
        nodes.map((n) => ({
          ...n,
          data: {
            clickable: clickableNodeIds.has(n.id),
            selected: n.id === node.id ? true : n.data.selected,
          },
        }))
      )
      setSelectedNodeIds((prev) => [...prev, node.id])
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
        onNodesChange={onNodesChange}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  )
}

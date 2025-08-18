import { ReactFlow, useEdgesState, useNodesState } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useState } from "react"
import type { SelectableEdge, SelectableNode } from "../lib/graphType.ts"
import { CustomEdge } from "./CustomEdge.tsx"
import { CustomNode } from "./CustomNode.tsx"
import { playerWrapperStyle, reactFlowWrapperStyle } from "./player.css.ts"
import { ResetDialog } from "./ResetDialog.tsx"

const edgeTypes = {
  custom: CustomEdge,
}

const nodeTypes = {
  custom: CustomNode,
}

type PlayerProps = {
  edges: SelectableEdge[]
  nodes: SelectableNode[]
}

export const Player = (
  { edges: initialEdges, nodes: initialNodes }: PlayerProps,
) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
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

      setEdges((edges) =>
        edges.map((edge) =>
          (edge.source === lastNodeId || edge.target === lastNodeId)
            ? { ...edge, data: { ...edge.data, selected: false } }
            : edge
        )
      )
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

      setEdges((edges) =>
        edges.map((edge) => (
          (edge.source === lastNodeId && edge.target === node.id) ||
            (edge.source === node.id && edge.target === lastNodeId)
            ? { ...edge, data: { ...edge.data, selected: true } }
            : edge
        ))
      )
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
      <div className={reactFlowWrapperStyle}>
        <ReactFlow
          defaultEdgeOptions={{ type: "custom" }}
          edges={edges}
          edgeTypes={edgeTypes}
          fitView
          nodes={nodes.map((node) => ({ ...node, type: "custom" }))}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          proOptions={{ hideAttribution: true }}
        />
      </div>

      <ResetDialog />
    </div>
  )
}

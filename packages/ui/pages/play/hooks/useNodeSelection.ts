import { useEdgesState, useNodesState } from "@xyflow/react"
import { useEffect, useRef, useState } from "react"
import type { Answer } from "../../../api/bindings.gen.ts"
import type { SelectableEdge, SelectableNode } from "../../../model/graph.ts"

type UseNodeSelectionParams = {
  initialEdges: SelectableEdge[]
  initialNodes: SelectableNode[]
  onClear: (answer: Answer) => void
}

export const useNodeSelection = (
  { initialEdges, initialNodes, onClear }: UseNodeSelectionParams,
) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

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
      if (selectedNodeIds.length + 1 === initialNodes.length) {
        const endTime = Date.now()

        if (startTimeRef.current === null) {
          throw new Error("startTimeRef is null")
        }

        const timeMs = endTime - startTimeRef.current

        onClear({
          time_ms: timeMs,
          path: [
            ...selectedNodeIds.map((id) => Number(id)),
            Number(node.id),
          ],
        })
      }
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

  const resetSelection = () => {
    setEdges(initialEdges)
    setNodes(initialNodes)
    setSelectedNodeIds([])
  }

  return {
    edges,
    nodes,
    onNodeClick,
    onEdgesChange,
    onNodesChange,
    resetSelection,
  }
}

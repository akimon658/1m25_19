import { useEdgesState, useNodesState } from "@xyflow/react"
import { useEffect, useRef, useState } from "react"
import type { Answer } from "../../../api/bindings.gen.ts"
import type { SelectableEdge, SelectableNode } from "../../../model/graph.ts"

type ClearResult = Answer & {
  isCycle: boolean
}

type UseNodeSelectionParams = {
  initialEdges: SelectableEdge[]
  initialNodes: SelectableNode[]
  onClear: (result: ClearResult) => void
  onStuck?: () => void
}

export const useNodeSelection = (
  { initialEdges, initialNodes, onClear, onStuck }: UseNodeSelectionParams,
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
        const path = [
          ...selectedNodeIds.map((id) => Number(id)),
          Number(node.id),
        ]

        // 閉路チェック: 始点と終点を結ぶ辺が存在するか
        const startNodeId = path.at(0)?.toString()
        const endNodeId = path.at(-1)?.toString()
        const isCycle = edges.some((edge) =>
          (edge.source === startNodeId && edge.target === endNodeId) ||
          (edge.source === endNodeId && edge.target === startNodeId)
        )

        // 閉路の場合、該当辺をselectedにする
        if (isCycle) {
          setEdges((edges) =>
            edges.map((edge) =>
              (edge.source === startNodeId && edge.target === endNodeId) ||
                (edge.source === endNodeId && edge.target === startNodeId)
                ? { ...edge, data: { ...edge.data, selected: true } }
                : edge
            )
          )
        }

        onClear({
          time_ms: timeMs,
          path,
          isCycle,
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

      // 行き詰まりチェック: 新しい選択後に次に進めるノードがあるかを確認
      const newSelectedNodeIds = [...selectedNodeIds, node.id]
      if (newSelectedNodeIds.length < initialNodes.length && onStuck) {
        const nextClickableNodeIds = new Set<string>()

        for (const edge of edges) {
          if (
            (edge.source === node.id &&
              !newSelectedNodeIds.includes(edge.target)) ||
            (edge.target === node.id &&
              !newSelectedNodeIds.includes(edge.source))
          ) {
            nextClickableNodeIds.add(edge.source)
            nextClickableNodeIds.add(edge.target)
          }
        }

        // 次に選択可能なノードが存在しない場合は行き詰まり
        if (nextClickableNodeIds.size === 0) {
          onStuck()
        }
      }
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

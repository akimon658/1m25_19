import type { Edge } from "@xyflow/react"
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationNodeDatum,
} from "d3-force"
import type { SelectableNode } from "./nodeData.ts"

export const getLayoutedNodes = (
  nodes: SelectableNode[],
  edges: Edge[],
): SelectableNode[] => {
  const simulationNodes: SimulationNodeDatum[] = nodes.map((node) => ({
    index: Number(node.id),
  }))
  const simulation = forceSimulation(simulationNodes)
    .force(
      "link",
      forceLink({ ...edges }),
    )
    .force("charge", forceManyBody().strength(-300))
    .force("center", forceCenter(400, 200))
    .stop()

  simulation.tick(300)

  const nodePositionMap = new Map(
    simulation.nodes().map((
      node,
    ) => {
      if (node.x === undefined || node.y === undefined) {
        throw new Error(`Node position is undefined for node id: ${node.index}`)
      }

      return [node.index?.toString(), { x: node.x, y: node.y }]
    }),
  )

  return nodes.map((node) => {
    const position = nodePositionMap.get(node.id)

    if (!position) {
      throw new Error(`Node position not found for node id: ${node.id}`)
    }

    return {
      ...node,
      position,
    }
  })
}

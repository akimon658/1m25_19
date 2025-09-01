import type { Edge } from "@xyflow/react"
import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationNodeDatum,
} from "d3-force"
import type { SelectableNode } from "../model/graph.ts"

type SimulationNode = SelectableNode & SimulationNodeDatum

export const getLayoutedNodes = (
  nodes: SelectableNode[],
  edges: Edge[],
): SelectableNode[] => {
  const simulationNodes: SimulationNode[] = nodes.map((
    node,
  ) => ({
    ...node,
    index: Number(node.id),
  }))
  const simulation = forceSimulation(simulationNodes)
    .force(
      "link",
      // Use structuredClone to avoid mutating the original edges array
      forceLink<SimulationNode, Edge>(structuredClone(edges)).id((node) =>
        node.id
      ).distance(150),
    )
    .force("charge", forceManyBody().strength(-1000))
    .force("center", forceCenter(400, 200))
    .stop()

  simulation.tick(300)

  const nodePositionMap = new Map(
    simulation.nodes().map((
      node,
    ) => {
      if (node.x === undefined || node.y === undefined) {
        throw new Error(`Node position is undefined for node id: ${node.id}`)
      }

      return [node.id, { x: node.x, y: node.y }]
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

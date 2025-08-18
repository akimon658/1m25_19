import type { Edge, Node } from "@xyflow/react"

export type SelectableEdge = Edge<{
  selected: boolean
}>

export type SelectableNode = Node<{
  clickable: boolean
  selected: boolean
}>

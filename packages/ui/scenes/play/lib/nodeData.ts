import type { Node } from "@xyflow/react"

export type SelectableNode = Node<{
  clickable: boolean
  selected: boolean
}>

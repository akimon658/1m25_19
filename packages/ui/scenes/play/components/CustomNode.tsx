import { type NodeProps } from "@xyflow/react"
import type { SelectableNode } from "../lib/nodeData.ts"
import { CustomHandle } from "./CustomHandle.tsx"
import { customNodeStyle } from "./customNode.css.ts"

export const CustomNode = (
  { data: { selected } }: NodeProps<SelectableNode>,
) => {
  return (
    <div className={customNodeStyle[selected ? "selected" : "default"]}>
      <CustomHandle type="source" />
      <CustomHandle type="target" />
    </div>
  )
}

import { type NodeProps } from "@xyflow/react"
import type { SelectableNode } from "../lib/nodeData.ts"
import { CustomHandle } from "./CustomHandle.tsx"
import { customNodeStyle } from "./customNode.css.ts"

export const CustomNode = (
  { data: { clickable, selected } }: NodeProps<SelectableNode>,
) => {
  let styleKey: keyof typeof customNodeStyle

  if (clickable) {
    styleKey = selected ? "clickableSelected" : "clickableUnselected"
  } else {
    styleKey = selected ? "unclickableSelected" : "unclickableUnselected"
  }

  return (
    <div className={customNodeStyle[styleKey]}>
      <CustomHandle type="source" />
      <CustomHandle type="target" />
    </div>
  )
}

import { type NodeProps } from "@xyflow/react"
import { CustomHandle } from "./CustomHandle.tsx"
import { customNodeStyle } from "./customNode.css.ts"

export const CustomNode = ({ id: _id }: NodeProps) => {
  return (
    <div className={customNodeStyle}>
      <CustomHandle type="source" />
      <CustomHandle type="target" />
    </div>
  )
}

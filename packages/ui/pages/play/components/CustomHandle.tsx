import { Handle, type HandleProps, Position } from "@xyflow/react"
import { customHandleStyle } from "./customHandle.css.ts"

export const CustomHandle = (props: Omit<HandleProps, "position">) => {
  return (
    <Handle {...props} className={customHandleStyle} position={Position.Top} />
  )
}

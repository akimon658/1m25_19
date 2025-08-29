import { BaseEdge, type EdgeProps, getStraightPath } from "@xyflow/react"
import type { SelectableEdge } from "../lib/graphType.ts"
import { customEdgeStyle } from "./customEdge.css.ts"

export const CustomEdge = (
  { data, sourceX, sourceY, targetX, targetY, ...props }: EdgeProps<
    SelectableEdge
  >,
) => {
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY })

  return (
    <BaseEdge
      {...props}
      className={customEdgeStyle[
        data?.selected ? "selected" : "default"
      ]}
      path={path}
    />
  )
}

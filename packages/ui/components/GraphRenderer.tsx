import {
  BaseEdge,
  type EdgeProps,
  getStraightPath,
  Handle,
  type HandleProps,
  type NodeProps,
  Position,
  ReactFlow,
  type ReactFlowProps,
} from "@xyflow/react"
import "@xyflow/react/dist/base.css"
import { getLayoutedNodes } from "../lib/layout.ts"
import type { SelectableEdge, SelectableNode } from "../model/graph.ts"
import {
  customEdgeStyle,
  customHandleStyle,
  customNodeStyle,
} from "./graphRenderer.css.ts"

const CustomEdge = (
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

const CustomHandle = (props: Omit<HandleProps, "position">) => {
  return (
    <Handle {...props} className={customHandleStyle} position={Position.Top} />
  )
}

const CustomNode = (
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

type GraphRendererProps = Omit<
  ReactFlowProps<SelectableNode, SelectableEdge>,
  | "defaultEdgeOptions"
  | "edgeTypes"
  | "elementsSelectable"
  | "fitView"
  | "nodeTypes"
  | "proOptions"
>

/**
 * Custom wrapper for the ReactFlow component with auto-layout
 */
export const GraphRenderer = ({ nodes, ...props }: GraphRendererProps) => {
  return (
    <ReactFlow
      defaultEdgeOptions={{ type: "custom" }}
      edgeTypes={{ custom: CustomEdge }}
      elementsSelectable={false} // Disable ReactFlow's default element selection
      fitView
      nodes={nodes && props.edges &&
        getLayoutedNodes(nodes, props.edges).map((node) => ({
          ...node,
          type: "custom",
        }))}
      nodeTypes={{ custom: CustomNode }}
      proOptions={{ hideAttribution: true }}
      {...props}
    />
  )
}

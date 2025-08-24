import { style } from "@vanilla-extract/css"

export const customHandleStyle = style({
  // To position the handle in the center
  // https://github.com/xyflow/xyflow/issues/2665
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",

  // To hide the handle
  // https://reactflow.dev/learn/customization/handles#hiding-handles
  visibility: "hidden",
})

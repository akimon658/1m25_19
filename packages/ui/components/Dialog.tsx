import { Dialog as RadixDialog } from "radix-ui"
import type { ComponentProps, HTMLAttributes } from "react"
import { dialogContentStyle, dialogControlStyle } from "./dialog.css.ts"

const Close = RadixDialog.Close
const Description = RadixDialog.Description
const Root = RadixDialog.Root
const Title = RadixDialog.Title
const Trigger = RadixDialog.Trigger

type ContentProps = ComponentProps<typeof RadixDialog.DialogContent>

const Content = (props: ContentProps) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay />
      <RadixDialog.Content {...props} className={dialogContentStyle} />
    </RadixDialog.Portal>
  )
}

type ControlProps = HTMLAttributes<HTMLDivElement>

const Control = (props: ControlProps) => {
  return <div className={dialogControlStyle} {...props} />
}

export const Dialog = {
  Close,
  Description,
  Root,
  Title,
  Trigger,
  Content,
  Control,
}

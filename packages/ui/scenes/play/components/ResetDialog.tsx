import { Dialog, VisuallyHidden } from "radix-ui"
import { Button } from "../../../components/Button.tsx"
import { dialogContentStyle } from "./resetDialog.css.ts"

export const ResetDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>やりなおす</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />

        <Dialog.Content className={dialogContentStyle}>
          <VisuallyHidden.Root>
            <Dialog.Title>やりなおす</Dialog.Title>
          </VisuallyHidden.Root>

          <Dialog.Description>
            最初からやりなおしますか？
          </Dialog.Description>

          <Dialog.Close asChild>
            <Button>いいえ</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button variant="accept">はい</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

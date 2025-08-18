import { Dialog, VisuallyHidden } from "radix-ui"
import { dialogContentStyle } from "./resetDialog.css.ts"

export const ResetDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button">やりなおす</button>
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
            <button type="button">いいえ</button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button type="button">はい</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

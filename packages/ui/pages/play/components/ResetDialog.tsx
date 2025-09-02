import { VisuallyHidden } from "radix-ui"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"

type ResetDialogProps = {
  onAccept: () => void
}

export const ResetDialog = ({ onAccept }: ResetDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>やりなおす</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <VisuallyHidden.Root>
          <Dialog.Title>やりなおす</Dialog.Title>
        </VisuallyHidden.Root>

        <Dialog.Description>
          最初からやりなおしますか？
        </Dialog.Description>

        <Dialog.Control>
          <Dialog.Close asChild>
            <Button>いいえ</Button>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Button onClick={onAccept} variant="primary">はい</Button>
          </Dialog.Close>
        </Dialog.Control>
      </Dialog.Content>
    </Dialog.Root>
  )
}

import { VisuallyHidden } from "radix-ui"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"

type VolumeWarningDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export const VolumeWarningDialog = (
  { open, onOpenChange, onConfirm }: VolumeWarningDialogProps,
) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <VisuallyHidden.Root>
          <Dialog.Title>注意</Dialog.Title>
        </VisuallyHidden.Root>
        <Dialog.Description>
          音声が再生されます。音量にご注意ください
        </Dialog.Description>
        <Dialog.Control>
          <Button onClick={onConfirm} variant="primary">
            始める
          </Button>
        </Dialog.Control>
      </Dialog.Content>
    </Dialog.Root>
  )
}

import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"

type CreditDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreditDialog = ({ open, onOpenChange }: CreditDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>クレジット</Dialog.Title>
        <Dialog.Description>
          このゲームはVoiceVox: 猫使ビィを使用しています。<br />
          猫使プロジェクト公式サイト：https://nekotukarb.wixsite.com/nekonohako
        </Dialog.Description>
        <Dialog.Control>
          <Dialog.Close asChild>
            <Button variant="primary">閉じる</Button>
          </Dialog.Close>
        </Dialog.Control>
      </Dialog.Content>
    </Dialog.Root>
  )
}

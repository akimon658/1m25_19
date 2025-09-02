import { Link, useNavigate } from "react-router"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"

type ClearDialogProps = {
  nextGraphId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ClearDialog = (
  { open, onOpenChange, nextGraphId }: ClearDialogProps,
) => {
  const navigate = useNavigate()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>クリア</Dialog.Title>

        <Dialog.Control>
          <Button asChild>
            <Link to="/">ホームに戻る</Link>
          </Button>

          <Dialog.Close asChild>
            <Button
              onClick={() => navigate(`/play/${nextGraphId}`)}
              variant="primary"
            >
              次のステージへ
            </Button>
          </Dialog.Close>
        </Dialog.Control>
      </Dialog.Content>
    </Dialog.Root>
  )
}

import { Link, useNavigate } from "react-router"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"
import { useGenerateGraph } from "../../home/hooks/useGenerateGraph.ts"

type ClearDialogProps = {
  open: boolean
}

export const ClearDialog = ({ open }: ClearDialogProps) => {
  const { generateGraph } = useGenerateGraph()
  const navigate = useNavigate()

  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        <Dialog.Title>クリア</Dialog.Title>

        <Dialog.Control>
          <Button asChild>
            <Link to="/">ホームに戻る</Link>
          </Button>

          <Button
            onClick={async () => {
              const graph = await generateGraph()

              navigate(`/play/${graph.id}`)
            }}
            variant="primary"
          >
            次のステージへ
          </Button>
        </Dialog.Control>
      </Dialog.Content>
    </Dialog.Root>
  )
}

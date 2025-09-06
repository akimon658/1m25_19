import { Link, useNavigate } from "react-router"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"
import {
  grayTextStyle,
  statItemStyle,
  statLabelStyle,
  statsContainerStyle,
  statValueStyle,
} from "../../home/components/graphInfoPanel.css.ts"
import { formatDurationMs } from "../../home/lib/duration.ts"
import { clearDialogStyle } from "./clearDialog.css.ts"

type ClearResult = {
  timeMs: number
  isCycle: boolean
}

type ClearDialogProps = {
  nextGraphId?: number
  open: boolean
  onOpenChange: (open: boolean) => void
  result: ClearResult
  isPerfected: boolean
}

export const ClearDialog = (
  { open, onOpenChange, nextGraphId, result, isPerfected }: ClearDialogProps,
) => {
  const navigate = useNavigate()
  const title = result.isCycle ? "パーフェクト！" : "クリア"

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={clearDialogStyle}>
        <Dialog.Title>{title}</Dialog.Title>

        <div className={statsContainerStyle}>
          <div className={statItemStyle}>
            <span className={statLabelStyle}>タイム</span>
            <span className={statValueStyle}>
              {formatDurationMs(result.timeMs)}
            </span>
          </div>
          {!isPerfected && (
            <div className={statItemStyle}>
              <span className={statLabelStyle}>パーフェクト</span>
              <span
                className={`${statValueStyle} ${
                  result.isCycle ? "" : grayTextStyle
                }`}
              >
                {result.isCycle ? "達成" : "未達成"}
              </span>
            </div>
          )}
        </div>

        <Dialog.Control>
          <Button asChild>
            <Link to="/">ホームに戻る</Link>
          </Button>

          {nextGraphId && (
            <Dialog.Close asChild>
              <Button
                onClick={() => navigate(`/play/${nextGraphId}`)}
                variant="primary"
              >
                次のステージへ
              </Button>
            </Dialog.Close>
          )}
        </Dialog.Control>
      </Dialog.Content>
    </Dialog.Root>
  )
}

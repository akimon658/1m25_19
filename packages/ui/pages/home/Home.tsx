import { Info } from "lucide-react"
import { useEffect, useState } from "react"
import { CreditDialog } from "./components/CreditDialog.tsx"
import { GraphInfoPanel } from "./components/GraphInfoPanel.tsx"
import { GraphSelector } from "./components/GraphSelector.tsx"
import { Tutorial } from "./components/Tutorial.tsx"
import {
  creditIconStyle,
  graphInfoPanelWrapper,
  graphSelectorWrapper,
  homeLayout,
} from "./home.css.ts"
import { useGraphList } from "./hooks/useGraphList.ts"

export const Home = () => {
  const { graphs } = useGraphList()
  const [selectedGraphId, setSelectedGraphId] = useState<number>(
    graphs?.at(-1)?.id ?? 1,
  )
  const [isCreditDialogOpen, setIsCreditDialogOpen] = useState(false)

  useEffect(() => {
    setSelectedGraphId(graphs?.at(-1)?.id ?? 1)
  }, [graphs])

  if (!graphs) {
    return null
  }

  return (
    <>
      {graphs.length === 1 ? <Tutorial /> : (
        <div className={homeLayout}>
          <div className={graphSelectorWrapper}>
            <GraphSelector
              graphs={graphs}
              selectedGraphId={selectedGraphId}
              onGraphSelect={setSelectedGraphId}
            />
          </div>
          <div className={graphInfoPanelWrapper}>
            <GraphInfoPanel graphId={selectedGraphId} />
          </div>
        </div>
      )}
      <Info
        className={creditIconStyle}
        onClick={() => setIsCreditDialogOpen(true)}
      />
      <CreditDialog
        open={isCreditDialogOpen}
        onOpenChange={setIsCreditDialogOpen}
      />
    </>
  )
}

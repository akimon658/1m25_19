import { useState } from "react"
import { GraphInfoPanel } from "./components/GraphInfoPanel.tsx"
import { GraphSelector } from "./components/GraphSelector.tsx"
import { homeLayout } from "./home.css.ts"
import { useGraphList } from "./hooks/useGraphList.ts"

export const Home = () => {
  const { graphs } = useGraphList()
  const [selectedGraphId, setSelectedGraphId] = useState<number>()

  if (!graphs) {
    return null
  }

  return (
    <div className={homeLayout}>
      <GraphSelector
        graphs={graphs}
        selectedGraphId={selectedGraphId}
        onGraphSelect={setSelectedGraphId}
      />
      <GraphInfoPanel graphId={selectedGraphId} />
    </div>
  )
}

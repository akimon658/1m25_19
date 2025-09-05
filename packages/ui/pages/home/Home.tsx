import { useState } from "react"
import { GraphInfoPanel } from "./components/GraphInfoPanel.tsx"
import { GraphSelector } from "./components/GraphSelector.tsx"
import { Tutorial } from "./components/Tutorial.tsx"
import { homeLayout } from "./home.css.ts"
import { useGraphList } from "./hooks/useGraphList.ts"

export const Home = () => {
  const { graphs } = useGraphList()
  const [selectedGraphId, setSelectedGraphId] = useState<number>(
    graphs?.at(-1)?.id ?? 0,
  )

  if (!graphs) {
    return null
  }

  return (graphs.length === 1 ? <Tutorial /> : (
    <div className={homeLayout}>
      <GraphSelector
        graphs={graphs}
        selectedGraphId={selectedGraphId}
        onGraphSelect={setSelectedGraphId}
      />
      <GraphInfoPanel graphId={selectedGraphId} />
    </div>
  ))
}

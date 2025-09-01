import { Button } from "../../components/Button.tsx"
import { GraphSelector } from "./components/GraphSelector.tsx"
import { useGenerateGraph } from "./hooks/useGenerateGraph.ts"
import { useGraphList } from "./hooks/useGraphList.ts"

export const Home = () => {
  const { graphs } = useGraphList()
  const { generate_graph } = useGenerateGraph()

  if (!graphs) {
    return null
  }

  return (
    <>
      <GraphSelector graphs={graphs} onGraphSelect={() => {}} />
      <Button onClick={() => generate_graph()}>生成</Button>
    </>
  )
}

import { Link } from "react-router"
import { Button } from "../../components/Button.tsx"
import { useGenerateGraph } from "./hooks/useGenerateGraph.ts"
import { useGraphList } from "./hooks/useGraphList.ts"

export const Home = () => {
  const { graphs } = useGraphList()
  const { generate_graph } = useGenerateGraph()

  return (
    <>
      {graphs?.map((graph) => (
        <Link key={graph.id} to={`/play/${graph.id}`}>
          {graph.id}
        </Link>
      ))}
      <Button onClick={() => generate_graph()}>生成</Button>
    </>
  )
}

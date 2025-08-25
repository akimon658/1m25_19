import { useQuery } from "@tanstack/react-query"
import { commands } from "../../api/bindings.gen.ts"
import { keyGetGraphs } from "../../api/query_keys.ts"

export const Home = () => {
  const { data } = useQuery({
    queryKey: keyGetGraphs,
    queryFn: commands.getGraphs,
  })

  return (
    <>
      {data?.map((graph) => (
        <div key={graph.id}>
          {JSON.stringify(graph)}
        </div>
      ))}
    </>
  )
}

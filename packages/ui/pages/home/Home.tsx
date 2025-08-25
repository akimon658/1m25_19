import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"
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
        <Link key={graph.id} to={`/play/${graph.id}`}>
          {graph.id}
        </Link>
      ))}
    </>
  )
}

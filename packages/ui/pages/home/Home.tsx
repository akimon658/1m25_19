import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router"
import {
  commands,
  type Graph,
  type GraphMetadata,
} from "../../api/bindings.gen.ts"
import { keyGetGraph, keyGetGraphs } from "../../api/query_keys.ts"
import { Button } from "../../components/Button.tsx"

export const Home = () => {
  const { data } = useQuery({
    queryKey: keyGetGraphs,
    queryFn: commands.getGraphs,
  })
  const queryClient = useQueryClient()
  const { mutate: generate_graph } = useMutation({
    mutationFn: commands.generateGraph,
    onSuccess: (data) => {
      queryClient.setQueryData<Graph>(keyGetGraph(data.id), data)
      queryClient.setQueryData<GraphMetadata[]>(
        keyGetGraphs,
        (old) => [...(old || []), data],
      )
    },
  })

  return (
    <>
      {data?.map((graph) => (
        <Link key={graph.id} to={`/play/${graph.id}`}>
          {graph.id}
        </Link>
      ))}
      <Button onClick={() => generate_graph()}>生成</Button>
    </>
  )
}

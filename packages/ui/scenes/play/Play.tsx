import { useQuery } from "@tanstack/react-query"
import { keyGenerateGraph } from "../../api/mutation_keys.ts"
import { commands } from "../../api/bindings.gen.ts"

export const Play = () => {
  const { data: graph } = useQuery({
    queryKey: keyGenerateGraph,
    queryFn: commands.generateGraph,
  })

  return <div>{JSON.stringify(graph)}</div>
}

import { useQuery } from "@tanstack/react-query"
import { commands } from "../../../api/bindings.gen.ts"
import { keyGetGraphs } from "../../../api/query_keys.ts"

export const useGraphList = () => {
  const { data: graphs, ...rest } = useQuery({
    queryKey: keyGetGraphs,
    queryFn: commands.getGraphs,
  })

  return { graphs, ...rest }
}

import { Link } from "react-router"
import type { GraphMetadata } from "../../../api/bindings.gen.ts"

type GraphSelectorProps = {
  graphs: ReadonlyArray<GraphMetadata>
  selectedGraphId?: number
  onGraphSelect: (graphId?: number) => void
}

export const GraphSelector = (
  { graphs, selectedGraphId, onGraphSelect }: GraphSelectorProps,
) => {
  const graphIds = [undefined, ...graphs.map((graph) => graph.id).reverse()]

  return graphIds.map((graphId) => (
    <Link key={graphId ?? "new"} to={`/play/${graphId}`}>
      {graphId}
    </Link>
  ))
}

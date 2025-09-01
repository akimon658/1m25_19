import type { GraphMetadata } from "../../../api/bindings.gen.ts"
import { Button } from "../../../components/Button.tsx"

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
    <Button
      key={graphId ?? "new"}
      onClick={() => onGraphSelect(graphId)}
    >
      {graphId}
    </Button>
  ))
}

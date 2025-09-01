import type { GraphMetadata } from "../../../api/bindings.gen.ts"
import { graphSelectorItemStyle } from "./graphSelector.css.ts"

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
    <button
      className={graphSelectorItemStyle[
        graphId === selectedGraphId
          ? "selected"
          : "default"
      ]}
      key={graphId ?? "new"}
      onClick={() => onGraphSelect(graphId)}
      type="button"
    />
  ))
}

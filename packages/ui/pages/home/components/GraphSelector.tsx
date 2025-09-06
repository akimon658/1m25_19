import type { GraphMetadata } from "../../../api/bindings.gen.ts"
import {
  graphSelectorContainerStyle,
  graphSelectorItemStyle,
} from "./graphSelector.css.ts"

type GraphSelectorProps = {
  graphs: ReadonlyArray<GraphMetadata>
  selectedGraphId: number
  onGraphSelect: (graphId: number) => void
}

export const GraphSelector = (
  { graphs, selectedGraphId, onGraphSelect }: GraphSelectorProps,
) => {
  const sortedGraphs = [...graphs].sort((a, b) => b.id - a.id)

  const getStyleVariant = (graph: GraphMetadata) => {
    const isSelected = graph.id === selectedGraphId
    const selectionSuffix = isSelected ? "Selected" : "Unselected"

    if (graph.cycle_found) {
      return `perfect${selectionSuffix}` as keyof typeof graphSelectorItemStyle
    }
    if (graph.best_time_ms !== null) {
      return `cleared${selectionSuffix}` as keyof typeof graphSelectorItemStyle
    }
    return `unlocked${selectionSuffix}` as keyof typeof graphSelectorItemStyle
  }

  return (
    <div className={graphSelectorContainerStyle}>
      {sortedGraphs.map((graph) => (
        <button
          className={graphSelectorItemStyle[getStyleVariant(graph)]}
          key={graph.id}
          onClick={() => onGraphSelect(graph.id)}
          type="button"
        />
      ))}
    </div>
  )
}

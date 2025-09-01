import { Link } from "react-router"
import { GraphRenderer } from "../../../components/GraphRenderer.tsx"
import { useGetGraph } from "../../../hooks/useGetGraph.ts"
import { formatDurationMs } from "../lib/duration.ts"
import {
  graphInfoPanelStyle,
  graphRendererWrapperStyle,
} from "./graphInfoPanel.css.ts"

type GraphInfoPanelProps = {
  graphId?: number
}

export const GraphInfoPanel = ({ graphId }: GraphInfoPanelProps) => {
  const { graph } = useGetGraph(graphId)

  return (
    <div className={graphInfoPanelStyle}>
      {graph && (
        <div className={graphRendererWrapperStyle}>
          <GraphRenderer edges={graph.edges} nodes={graph.nodes} />
        </div>
      )}
      {graph?.best_time_ms && (
        <div>
          ベストタイム：{formatDurationMs(graph.best_time_ms)}
        </div>
      )}
      <Link to={`/play/${graphId}`}>挑戦</Link>
    </div>
  )
}

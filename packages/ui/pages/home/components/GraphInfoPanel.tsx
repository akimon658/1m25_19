import { Link } from "react-router"
import { Button } from "../../../components/Button.tsx"
import { GraphRenderer } from "../../../components/GraphRenderer.tsx"
import { useGetGraph } from "../../../hooks/useGetGraph.ts"
import { formatDurationMs } from "../lib/duration.ts"
import {
  graphInfoPanelStyle,
  graphRendererWrapperStyle,
  unknownGraphPreviewStyle,
} from "./graphInfoPanel.css.ts"

type GraphInfoPanelProps = {
  graphId: number
}

export const GraphInfoPanel = ({ graphId }: GraphInfoPanelProps) => {
  const { graph } = useGetGraph(graphId)

  return (
    <div className={graphInfoPanelStyle}>
      <div className={graphRendererWrapperStyle}>
        {graph?.best_time_ms
          ? (
            <>
              <GraphRenderer
                key={graph.id}
                edges={graph.edges}
                nodes={graph.nodes}
              />
              <div>
                ベストタイム：{formatDurationMs(graph.best_time_ms)}
              </div>
            </>
          )
          : <div className={unknownGraphPreviewStyle}>?</div>}
      </div>

      <Button asChild variant="primary">
        <Link to={`/play/${graphId}`}>挑戦</Link>
      </Button>
    </div>
  )
}

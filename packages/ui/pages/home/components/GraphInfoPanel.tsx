import { Link } from "react-router"
import { Button } from "../../../components/Button.tsx"
import { GraphRenderer } from "../../../components/GraphRenderer.tsx"
import { useGetGraph } from "../../../hooks/useGetGraph.ts"
import { formatDurationMs } from "../lib/duration.ts"
import {
  buttonStyle,
  graphInfoPanelStyle,
  graphRendererWrapperStyle,
  grayTextStyle,
  statItemStyle,
  statLabelStyle,
  statsContainerStyle,
  statValueStyle,
  unknownGraphPreviewStyle,
} from "./graphInfoPanel.css.ts"

type GraphInfoPanelProps = {
  graphId: number
}

export const GraphInfoPanel = ({ graphId }: GraphInfoPanelProps) => {
  const { graph } = useGetGraph(graphId)

  const isCleared = graph?.best_time_ms != null

  return (
    <div className={graphInfoPanelStyle}>
      <div className={graphRendererWrapperStyle}>
        {isCleared
          ? (
            <GraphRenderer
              key={graph.id}
              edges={graph.edges}
              nodes={graph.nodes}
            />
          )
          : <div className={unknownGraphPreviewStyle}>?</div>}
      </div>

      <div className={statsContainerStyle}>
        <div className={statItemStyle}>
          <span className={statLabelStyle}>ベストタイム</span>
          <span
            className={`${statValueStyle} ${!isCleared ? grayTextStyle : ""}`}
          >
            {isCleared ? formatDurationMs(graph.best_time_ms!) : "--秒"}
          </span>
        </div>
        <div className={statItemStyle}>
          <span className={statLabelStyle}>パーフェクト</span>
          <span
            className={`${statValueStyle} ${
              graph?.cycle_found ? "" : grayTextStyle
            }`}
          >
            {graph?.cycle_found ? "達成" : "未達成"}
          </span>
        </div>
      </div>

      <Button asChild variant="primary" className={buttonStyle}>
        <Link to={`/play/${graphId}`}>挑戦</Link>
      </Button>
    </div>
  )
}

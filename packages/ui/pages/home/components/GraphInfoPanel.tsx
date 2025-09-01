import { Link, useNavigate } from "react-router"
import { Button } from "../../../components/Button.tsx"
import { GraphRenderer } from "../../../components/GraphRenderer.tsx"
import { useGetGraph } from "../../../hooks/useGetGraph.ts"
import { useGenerateGraph } from "../hooks/useGenerateGraph.ts"
import { formatDurationMs } from "../lib/duration.ts"
import {
  graphInfoPanelStyle,
  graphRendererWrapperStyle,
  unknownGraphPreviewStyle,
} from "./graphInfoPanel.css.ts"

type GraphInfoPanelProps = {
  graphId?: number
}

export const GraphInfoPanel = ({ graphId }: GraphInfoPanelProps) => {
  const { graph } = useGetGraph(graphId)
  const { generate_graph } = useGenerateGraph()
  const navigate = useNavigate()

  return (
    <div className={graphInfoPanelStyle}>
      <div className={graphRendererWrapperStyle}>
        {graph
          ? <GraphRenderer edges={graph.edges} nodes={graph.nodes} />
          : <div className={unknownGraphPreviewStyle}>?</div>}
      </div>
      {graph?.best_time_ms && (
        <div>
          ベストタイム：{formatDurationMs(graph.best_time_ms)}
        </div>
      )}

      {graphId === undefined
        ? (
          <>
            <Button
              onClick={async () => {
                const graph = await generate_graph()

                navigate(`/play/${graph.id}`)
              }}
              variant="primary"
            >
              挑戦
            </Button>
          </>
        )
        : (
          <Button asChild variant="primary">
            <Link to={`/play/${graphId}`}>挑戦</Link>
          </Button>
        )}
    </div>
  )
}

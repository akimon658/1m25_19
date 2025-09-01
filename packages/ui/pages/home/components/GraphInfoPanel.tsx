import { Link } from "react-router"
import { useGetGraph } from "../../../hooks/useGetGraph.ts"
import { formatDurationMs } from "../lib/duration.ts"

type GraphInfoPanelProps = {
  graphId?: number
}

export const GraphInfoPanel = ({ graphId }: GraphInfoPanelProps) => {
  const { graph } = useGetGraph(graphId)

  return (
    <>
      {graph?.best_time_ms && (
        <div>
          ベストタイム：{formatDurationMs(graph.best_time_ms)}
        </div>
      )}
      <Link to={`/play/${graphId}`}>挑戦</Link>
    </>
  )
}

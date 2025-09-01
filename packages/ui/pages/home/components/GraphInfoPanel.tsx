import { Link } from "react-router"

type GraphInfoPanelProps = {
  graphId?: number
}

export const GraphInfoPanel = ({ graphId }: GraphInfoPanelProps) => {
  return <Link to={`/play/${graphId}`}>挑戦</Link>
}

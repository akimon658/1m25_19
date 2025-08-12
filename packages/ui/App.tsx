import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Play } from "./scenes/play/Play.tsx"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Play />
    </QueryClientProvider>
  )
}

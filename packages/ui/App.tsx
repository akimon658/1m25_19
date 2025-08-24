import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Play } from "./pages/play/Play.tsx"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Play />
    </QueryClientProvider>
  )
}

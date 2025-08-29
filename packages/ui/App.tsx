import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "./pages/home/Home.tsx"
import { Play } from "./pages/play/Play.tsx"

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/play/:graphId" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

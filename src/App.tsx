import { Switch, Route } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import Layout from "./components/layout/Layout"
import Devices from "./pages/Devices"
import ApiExterna from "./pages/ApiExterna"

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/devices" component={Devices}/>
          <Route path="/api" component={ApiExterna}/>
        </Switch>
      </Layout>
    </QueryClientProvider>
  )
}

export default App

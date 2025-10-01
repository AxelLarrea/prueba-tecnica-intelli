import { Switch, Route } from "wouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import Layout from "./components/layout/Layout"

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
          <Route path="/login" component={Home}/>

        </Switch>
      </Layout>
    </QueryClientProvider>
  )
}

export default App

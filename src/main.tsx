import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Race from './components/Race.tsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "race",
    element: <Race />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={appRouter} />
)


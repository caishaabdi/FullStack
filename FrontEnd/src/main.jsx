import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegisterPage from './pages/RegisterPage.jsx'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/loginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './hooks/useUser.jsx'

const router = createBrowserRouter([
  {
    path: "/",  // waxa user u so qoraayo
    element: <App />,  //element laso bandhigoyo  midka Apaha eh waye kan waxa dhan asee hoos imanyan
    // page laka adayo meshan ku qoree
    children: [
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/dashboard",
        element: <DashboardPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Toaster />
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)

import { createBrowserRouter } from "react-router-dom"
import App from './App'
import UtilisateurForm from "./routes/utilisateurs/components/UtilisateurForm"
import UtilisateurList from "./routes/utilisateurs/components/UtilisateurList"
import ErrorPage from "./routes/utilisateurs/ErrorPage"
import HomePage from "./routes/utilisateurs/HomePage"


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
          {
            path: "/utilisateurs",
            element: <UtilisateurList />
          },
          {
            path: "/utilisateurs",
            element: <UtilisateurForm />
          },
          {
            path: "/utilisateurs/edit/:utilisateurId",
            element: <UtilisateurForm />
          },
          {
            path: "/utilisateurs/delete/:utilisateurId",
            element: <UtilisateurForm />
          },
        ]
      }
    ])

export default router
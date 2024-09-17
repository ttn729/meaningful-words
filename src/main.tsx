import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CreateWorksheet from "./components/CreateWorksheet";
import ManageWordPack from "./components/ManageWordPack";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import { session } from "./utils/supabaseClient";

interface RequireAuthProps {
  children: React.ReactNode;
  redirectTo: string;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/create-worksheet",
        element: <CreateWorksheet />,
      },
      {
        path: "/manage-wordpack",
        element: (
          <RequireAuth redirectTo="/">
            <ManageWordPack />,
          </RequireAuth>
        ),
      },
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

function RequireAuth({ children, redirectTo }: RequireAuthProps) {
  let isAuthenticated = session;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

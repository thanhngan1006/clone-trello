import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Login, ResetPassword } from "./pages";

// createBrowserRouter: This function sets up a data router, which is necessary for using components like Form from react-router-dom.
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// React components
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// React router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// App component
import App from "./App";

// Table to create router
import BasicTable from "./Components/Table";

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicTable />,
  },
]);

// Create the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the react app
root.render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);

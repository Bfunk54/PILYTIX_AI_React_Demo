import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import BasicTable from "./Components/Table";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicTable/>
  },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App>
    <RouterProvider router={router} />
    </App>
  </StrictMode>
);

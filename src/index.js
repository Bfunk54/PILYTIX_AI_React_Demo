import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
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

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App>
    <RouterProvider router={router} />
    </App>
  </StrictMode>
);

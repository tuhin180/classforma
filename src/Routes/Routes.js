import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Page/Home";
import SpecificWorkflow from "../component/SpecificWorkflow";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/workflow/:id",
    loader: ({ params }) => {
      return fetch(
        `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${params.id}`
      ).then((response) => response.json());
    },
    element: <SpecificWorkflow />,
  },
]);

export default routes;

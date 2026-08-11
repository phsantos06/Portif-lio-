import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectDetail from "../pages/project/page";
import DemoPage from "../pages/demo/page";
import CodePage from "../pages/code/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projeto/:slug",
    element: <ProjectDetail />,
  },
  {
    path: "/demo/:slug",
    element: <DemoPage />,
  },
  {
    path: "/codigo/:slug",
    element: <CodePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
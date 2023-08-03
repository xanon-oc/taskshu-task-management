import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import DashboardHome from "../Dashboard/DashboardHome";
import Login from "../Pages/login.register/Login";
import Register from "../Pages/login.register/Register";
import AddATask from "../Dashboard/AddATask";
import UpdateTask from "../Dashboard/UpdateTask";
import SecureRoute from "./SecureRoute";
import ViewProjects from "../Pages/Project/ViewProjects";
import AddAProject from "../Pages/Project/AddAProject";
import MainDashboardHome from "../Pages/MainDashboardHome";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <SecureRoute>
        <Dashboard />
      </SecureRoute>
    ),
    children: [
      {
        path: "home",
        element: <MainDashboardHome />,
      },
      {
        path: "taskHome",
        element: <DashboardHome />,
      },
      {
        path: "addATask",
        element: <AddATask />,
      },
      {
        path: "updateTask/:id",
        element: <UpdateTask />,
        loader: ({ params }) =>
          fetch(
            `https://taskshu-task-management-server.vercel.app/allTask/getTask/${params.id}`
          ),
      },
      {
        path: "viewProjects",
        element: <ViewProjects />,
      },
      {
        path: "addAProject",
        element: <AddAProject />,
      },
    ],
  },
]);

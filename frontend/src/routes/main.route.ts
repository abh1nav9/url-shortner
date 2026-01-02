import React from "react";
import MainLayout from "../layout/main-layout";
import Home from "../pages/home/home";
import NotFound from "../pages/not-found";
import { Navigate } from "react-router-dom";

const MainRoutes = {
  path: "/",
  element: React.createElement(MainLayout),
  children: [
    {
      index: true,
      element: React.createElement(Home),
    },
    {
      path: "home",
      element: React.createElement(Navigate, { to: "/", replace: true }),
    },
    {
      path: "*",
      element: React.createElement(NotFound),
    },
  ],
};

export default MainRoutes;
import React from "react";
import AuthLayout from "../layout/auth-layout";
import Auth from "../pages/auth/auth";
import { Navigate } from "react-router-dom";

const AuthRoutes = {
  path: "/auth",
  element: React.createElement(AuthLayout),
  children: [
    {
      index: true,
      element: React.createElement(Navigate, { to: "login", replace: true }),
    },
    {
      path: "login",
      element: React.createElement(Auth),
    },
    {
      path: "register",
      element: React.createElement(Auth),
    },
  ]
}

export default AuthRoutes;
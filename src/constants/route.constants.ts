import path from "path";

export const RoutePaths = {
  main: () => "/",
  login: () => "/login",
  register: () => "/register",
  logout: () => "/logout",
  user: () => "/user",
  me: () => "/me",
  todo: () => "/todo",
};

export const DynamicRoutes = {
  id: () => "/:id",
  user_id: () => "/:user_id",
};

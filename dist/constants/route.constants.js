"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicRoutes = exports.RoutePaths = void 0;
exports.RoutePaths = {
    main: () => "/",
    login: () => "/login",
    register: () => "/register",
    logout: () => "/logout",
    user: () => "/user",
    me: () => "/me",
    todo: () => "/todo",
};
exports.DynamicRoutes = {
    id: () => "/:id",
    user_id: () => "/:user_id",
};

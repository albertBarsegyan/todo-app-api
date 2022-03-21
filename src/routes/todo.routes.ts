import { DynamicRoutes } from "./../constants/route.constants";
import {
  addTodo,
  getTodoByUserId,
  removeTodo,
  editTodo,
} from "./../controllers/todoController";
import { authenticateToken } from "./../middlewares/authorization.middleware";
import { RoutePaths } from "../constants/route.constants";
import { Router } from "express";

const todoRoutes = Router();

todoRoutes.post(RoutePaths.main(), authenticateToken, addTodo);
todoRoutes.patch(RoutePaths.main(), authenticateToken, editTodo);
todoRoutes.delete(RoutePaths.main(), authenticateToken, removeTodo);

todoRoutes.get(DynamicRoutes.userId(), getTodoByUserId);

export default todoRoutes;

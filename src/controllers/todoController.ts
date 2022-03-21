import { ResponseMessages } from "./../constants/messages.constants";
import {
  addTodoToDb as addTodoService,
  editTodoFromDb,
  getTodoByUserIdFromDb as getTodoByUserIdService,
  removeTodoFromDb,
} from "./../services/todo.service";
import { Request, Response } from "express";

export const addTodo = async (req: Request, res: Response) => {
  const { user } = req.session;
  const { text, statusId } = req.body;

  const addTodoResponse = await addTodoService({
    text,
    statusId: Number(statusId),
    userId: Number(user.id),
  });

  if (!addTodoResponse) {
    return res.json({
      data: null,
      message: ResponseMessages.addTodoError,
      status: "error",
    });
  }

  return res.json({
    data: addTodoResponse,
    message: ResponseMessages.addTodoSuccess,
    status: "success",
  });
};

export const editTodo = async (req: Request, res: Response) => {
  const { id, text, statusId } = req.body;

  const editTodoResponse = await editTodoFromDb(id, {
    text,
    statusId,
  });

  if (!editTodoResponse) {
    return res.json({
      data: null,
      message: ResponseMessages.updateTodoError,
      status: "error",
    });
  }

  return res.json({
    data: editTodoResponse,
    message: ResponseMessages.updateTodoSuccess,
    status: "success",
  });
};

export const getTodoByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const userTodos = await getTodoByUserIdService(Number(userId));

  return res.json({
    data: userTodos,
    message: ResponseMessages.successMessage,
    status: "success",
  });
};

export const removeTodo = async (req: Request, res: Response) => {
  const { id } = req.body;

  const removeResponse = await removeTodoFromDb(Number(id));

  if (removeResponse) {
    return res.json({
      data: removeResponse,
      message: ResponseMessages.removeTodoSuccess,
      status: "success",
    });
  }

  return res.json({
    data: null,
    message: ResponseMessages.removeTodoError,
    status: "error",
  });
};

import { ResponseMessages } from "./../constants/messages.constants";
import {
  addTodoToDb,
  editTodoFromDb,
  getTodoByUserIdFromDb,
  removeTodoFromDb,
} from "./../services/todo.service";
import { Request, Response } from "express";

export const addTodo = async (req: Request, res: Response) => {
  const { userId } = req.session;
  const { text, status_id } = req.body;

  const addTodoResponse = await addTodoToDb({
    text,
    status_id: Number(status_id),
    user_id: Number(userId),
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
  const { id, text, status_id } = req.body;

  const editTodoResponse = await editTodoFromDb(id, {
    text,
    status_id,
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
  const { user_id } = req.params;

  const userTodos = await getTodoByUserIdFromDb(Number(user_id));

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

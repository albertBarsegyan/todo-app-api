import { getTodoByUserIdFromDb } from "./../services/todo.service";
import { ResponseMessages } from "./../constants/messages.constants";
import { IResponse } from "./../interfaces/response.interfaces";
import { getUserById } from "./../services/user.service";
import { Request, Response } from "express";

export const userController = async (req: Request, res: Response) => {
  const user_id = Number(req.params.id);

  const userResponse = await getUserById(user_id);

  if (userResponse) {
    return res.json({
      data: userResponse,
      message: ResponseMessages.successMessage,
      status: "success",
    } as IResponse);
  }

  return res.json({
    data: null,
    message: ResponseMessages.dataEmpty,
    status: "success",
  } as IResponse);
};

export const loggedUserController = async (req: Request, res: Response) => {
  const userData = req.session.user;
  const userTodos = await getTodoByUserIdFromDb(userData.id);

  const resData = {
    ...userData,
    todos: userTodos,
  };

  return res.json({
    data: resData,
    message: ResponseMessages.successMessage,
    status: "success",
  });
};

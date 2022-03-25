import { getTodoByUserIdFromDb } from "./../services/todo.service";
import { userLogin } from "./../services/login.service";
import { IUserLogin } from "./../interfaces/user.interfaces";
import { ResponseMessages } from "../constants/messages.constants";
import { registerUser } from "../services/register.service";
import { IUserRegister } from "../interfaces/user.interfaces";
import { Request, Response } from "express";
import { isEmpty } from "lodash";
import jwt from "jsonwebtoken";

export const registrationController = async (req: Request, res: Response) => {
  const userRegisterData = req.body as IUserRegister;

  if (isEmpty(userRegisterData)) {
    return res.json({
      status: "error",
      data: null,
      message: ResponseMessages.invalidData,
    });
  }

  const resData = await registerUser(userRegisterData);

  return res.json(resData);
};

export const loginController = async (req: Request, res: Response) => {
  const userLoginData = req.body as IUserLogin;

  if (isEmpty(userLoginData) || !userLoginData) {
    return res.json({
      status: "error",
      data: null,
      message: ResponseMessages.invalidData,
    });
  }

  const loginResponse = await userLogin(userLoginData);

  const isLoginSuccess = loginResponse.status === "success";

  if (isLoginSuccess) {
    const loggedUserData = loginResponse.data;

    const userTodos = await getTodoByUserIdFromDb(loggedUserData.id);

    const accessToken = jwt.sign(
      loggedUserData.id,
      process.env.JWT_TOKEN_SECRET || "secret"
    );

    const responseData = { ...loggedUserData, todos: userTodos };

    req.session.userId = loggedUserData.id;

    return res.json({
      message: loginResponse.message,
      status: loginResponse.status,
      data: responseData,
      accessToken,
    });
  }

  return res.json(loginResponse);
};

export const logoutController = (req: Request, res: Response) => {
  return req.session.destroy((err) => {
    if (err) {
      return res.json({
        data: null,
        status: "error",
        message: err.message,
      });
    }
    return res.json({
      data: null,
      status: "success",
      message: ResponseMessages.successLogout,
    });
  });
};

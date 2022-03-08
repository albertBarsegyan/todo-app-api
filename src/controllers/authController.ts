import { RoutePaths } from "./../constants/route.constants";
import { SessionKeys } from "./../constants/session.constants";
import { loginUser } from "./../services/login.service";
import { IUserLogin } from "./../interfaces/user.interfaces";
import { ResponseMessages } from "../constants/messages.constants";
import { registerUser } from "../services/register.service";
import { IUserRegister } from "../interfaces/user.interfaces";
import { Request, Response } from "express";
import { isEmpty } from "lodash";

export const registrationController = async (req: Request, res: Response) => {
  const userRegisterData = req.body as IUserRegister;

  if (isEmpty(userRegisterData)) {
    return res.send({
      status: "error",
      data: null,
      message: ResponseMessages.invalidData,
    });
  }

  const resData = await registerUser(userRegisterData);

  if (resData.status === "success") {
    req.session.userId = resData.data.id;
  }

  return res.json(resData);
};

export const loginController = async (req: Request, res: Response) => {
  const userLoginData = req.body as IUserLogin;

  if (isEmpty(userLoginData)) {
    return res.send({
      status: "error",
      data: null,
      message: ResponseMessages.invalidData,
    });
  }

  const resData = await loginUser(userLoginData);

  if (resData.status === "success") {
    req.session.userId = resData.data.id;
  }

  return res.json(resData);
};

export const logoutController = async (req: Request, res: Response) => {
  return req.session.destroy((err) => {
    if (err) {
      throw new Error("Something went wrong with session");
    }

    return res.redirect(RoutePaths.login);
  });
};

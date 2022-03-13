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

  if (isEmpty(userLoginData)) {
    return res.json({
      status: "error",
      data: null,
      message: ResponseMessages.invalidData,
    });
  }

  const resData = await loginUser(userLoginData);
  const isLoginSuccess = resData.status === "success";

  if (isLoginSuccess) {
    req.session.user = resData;
    return res.json(resData);
  }
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

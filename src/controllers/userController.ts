import { ResponseMessages } from "./../constants/messages.constants";
import { IResponse } from "./../interfaces/response.interfaces";
import { getUserById } from "./../services/user.service";
import { Request, Response } from "express";

export const userController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  const userResponse = await getUserById(userId);

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

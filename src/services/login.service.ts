import { comparePassword } from "../helpers/hashPassword.helpers";
import { IUserLogin } from "./../interfaces/user.interfaces";
import { hashPassword } from "../helpers/hashPassword.helpers";
import { IUserRegister } from "../interfaces/user.interfaces";
import { prisma } from "../configs/prismaClient";
import { ResponseMessages } from "../constants/messages.constants";
import { IResponse } from "../interfaces/response.interfaces";
import excludeKeysFromObject from "../helpers/removeKeysFromObject.helpers";

export const loginUser = async ({
  email,
  password,
}: IUserLogin): Promise<IResponse> => {
  const userWithCurrentEmail = await prisma.users.findFirst({
    where: { email },
  });

  if (userWithCurrentEmail) {
    const isPasswordsMatch = await comparePassword(
      password,
      userWithCurrentEmail.password
    );

    if (isPasswordsMatch) {
      const userData = excludeKeysFromObject(userWithCurrentEmail, [
        "password",
      ]);

      return {
        status: "success",
        data: userData,
        message: ResponseMessages.successLogin,
      };
    }

    return {
      status: "error",
      data: null,
      message: ResponseMessages.passwordIncorrect,
    };
  }

  return { status: "error", data: null, message: ResponseMessages.invalidData };
};

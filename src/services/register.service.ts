import { hashPassword } from "../helpers/hashPassword";
import { IUserRegister } from "../interfaces/user.interfaces";
import { prisma } from "../configs/prismaClient";
import { ResponseMessages } from "../constants/messages.constants";
import { IResponse } from "../interfaces/response.interfaces";
import excludeKeysFromObject from "../helpers/removeKeysFromObject";

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: IUserRegister): Promise<IResponse> => {
  const currentUser = await prisma.users.findFirst({
    where: { email },
  });

  if (currentUser) {
    return {
      status: "error",
      data: null,
      message: ResponseMessages.emailExist,
    };
  }

  try {
    const newUser = await prisma.users.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashPassword(password),
      },
    });

    const newUserData = excludeKeysFromObject(newUser, ["password"]);

    return {
      status: "success",
      message: ResponseMessages.successMessage,
      data: newUserData,
    };
  } catch (error: any) {
    return { status: "error", message: error.message, data: null };
  }
};

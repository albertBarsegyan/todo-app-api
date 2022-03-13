import { prisma } from "../configs/prismaClient";
import excludeKeysFromObject from "../helpers/removeKeysFromObject.helpers";

export const getUserById = async (id: number) => {
  const userFromDb = await prisma.users.findUnique({ where: { id } });

  if (userFromDb) {
    const clearedUserData = await excludeKeysFromObject(userFromDb, [
      "password",
    ]);

    return clearedUserData;
  }

  return null;
};

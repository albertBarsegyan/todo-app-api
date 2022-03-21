import { getUpdateFields } from "./../helpers/object.helpers";
import { prisma } from "./../configs/prismaClient";
import { IAddTodo } from "./../types/todo.types";

const selectSettings = {
  text: true,
  id: true,
  userId: true,
  status: true,
};

export const addTodoToDb = async ({ text, userId, statusId }: IAddTodo) => {
  const addTodoResponse = await prisma.todos.create({
    data: {
      text,
      userId,
      statusId,
    },
    select: selectSettings,
  });

  return addTodoResponse;
};

export const getTodoByUserIdFromDb = async (userId: number) => {
  const todosByUserId = await prisma.todos.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    select: selectSettings,
  });

  return todosByUserId;
};

export const editTodoFromDb = async (
  todoId: number,
  { text, statusId }: { text: string; statusId: number }
) => {
  let updateResponse;

  try {
    updateResponse = await prisma.todos.update({
      where: {
        id: todoId,
      },
      data: { ...getUpdateFields(text, statusId) },
      select: selectSettings,
    });
  } catch (e) {
    updateResponse = null;
  }

  return updateResponse;
};

export const removeTodoFromDb = async (todoId: number) => {
  let removeTodoResponse;
  try {
    removeTodoResponse = await prisma.todos.delete({
      where: {
        id: todoId,
      },
      select: selectSettings,
    });
  } catch (e) {
    removeTodoResponse = null;
  }

  return removeTodoResponse;
};

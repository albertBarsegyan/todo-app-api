import { getUpdateFields } from "./../helpers/object.helpers";
import { prisma } from "./../configs/prismaClient";
import { IAddTodo } from "./../types/todo.types";

const selectSettings = {
  text: true,
  id: true,
  user_id: true,
  status: true,
};

export const addTodoToDb = async ({ text, user_id, status_id }: IAddTodo) => {
  const addTodoResponse = await prisma.todos.create({
    data: {
      text,
      user_id,
      status_id,
    },
    select: selectSettings,
  });

  return addTodoResponse;
};

export const getTodoByUserIdFromDb = async (userId: number) => {
  const todosByUserId = await prisma.todos.findMany({
    where: {
      user_id: {
        equals: userId,
      },
    },
    select: selectSettings,
  });

  return todosByUserId;
};

export const editTodoFromDb = async (
  todo_id: number,
  { text, status_id }: { text: string; status_id: number }
) => {
  let updateResponse;

  try {
    updateResponse = await prisma.todos.update({
      where: {
        id: todo_id,
      },
      data: { ...getUpdateFields(text, status_id) },
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

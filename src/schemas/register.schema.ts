import { object, string } from "yup";

export const registerDataSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email(),
  password: string().required().min(8),
});

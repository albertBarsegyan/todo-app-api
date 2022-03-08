import { object, string } from "yup";

export const loginDataSchema = object({
  email: string().required().email(),
  password: string().required().min(8),
});

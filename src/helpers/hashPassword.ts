import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

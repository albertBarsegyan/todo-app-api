export interface IUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePicture: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

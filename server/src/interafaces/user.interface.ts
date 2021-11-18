export interface IUserParams {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
  type?: number;
  status?: number;
}

export interface ICreateUserParams extends IUserParams {
  name: string;
  username: string;
  password: string;
}

export interface ILoginUserParams extends IUserParams {
  username: string;
  password: string;
}

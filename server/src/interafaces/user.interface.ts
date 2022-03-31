export interface IUserParams {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
  type?: number;
  status?: number;
  storeId?: number;
}

export interface ICreateUserParams extends IUserParams {
  name: string;
  username: string;
  password: string;
  storeId: number;
  image: string;
}

export interface IUpdateUserParams extends IUserParams {
  id: number;
  name: string;
  password: string;
}

export interface ILoginUserParams extends IUserParams {
  username: string;
  password: string;
}

export interface ICheckExist extends IUserParams {
  name: string;
  username: string;
}

export interface IUserGetEmployee extends IUserParams {
  storeId: number;
  superAuth?: boolean;
}

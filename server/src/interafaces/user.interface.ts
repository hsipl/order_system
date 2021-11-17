export interface ICreateUserParams {
  id?: number;
  name: string;
  username: string;
  password: string;
  type?: number;
  status?: number;
}

interface IHandoverParams {
  id?: number;
  userId?: number;
  sysmoney?: number;
  realcash?: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IHandoverCreateParams extends IHandoverParams {
  userId: number;
  sysmoney: number;
  realcash: number;
  status: number;
}

export interface IHandoverUpdateParams extends IHandoverParams {
  id: number;
  userId: number;
  sysmoney: number;
  realcash: number;
  status: number;
}

export interface IHandoverDeleteParams extends IHandoverParams {
  id: number;
}

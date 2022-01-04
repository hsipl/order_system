interface IStoreParams {
  id?: number;
  name?: string;
  status?: number;
  type?: number;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IStoreCreateParams extends IStoreParams {
  name: string;
  type: number;
}

export interface IStoreUpdateParams extends IStoreParams {
  id: number;
  name: string;
  status: number;
  type: number;
}

export interface IStoreDeleteParams extends IStoreParams {
  id: number;
}

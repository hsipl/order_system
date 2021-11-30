interface IStoreSession {
  id: number;
  type: number;
}
export declare module 'express-session' {
  interface SessionData {
    user: { username: string; role: number; store: IStoreSession };
  }
}

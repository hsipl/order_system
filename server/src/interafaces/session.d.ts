declare global {
  namespace Express {
    interface Session {
      _user?: User;
    }
  }
}

export enum errorMsg {
  ParameterError = 'parameters error.',
  InternalServerError = 'there is some error caused.',
  DataAlreadyExist = 'data already exists.',
  DataNotFound = 'data not found.',
  LoginFailed = 'username or password incorrect.',
  LogoutFailed = 'logout failed.',
  AuthFailed = 'authenticated failed.',
}
export enum errorStatusCode {
  BadRequest = 400,
  InternalServerError = 500,
  Forbidden = 403,
  UnAuthorization = 401,
}

class ErrorHandler extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
 
export default ErrorHandler;

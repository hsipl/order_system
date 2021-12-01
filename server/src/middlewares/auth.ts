import { NextFunction, Request, Response } from 'express';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';
import CacheService from '../services/cache.service';

export default class Auth {
  private readonly cacheService: CacheService;

  constructor() {
    this.cacheService = new CacheService();
  }

  public async authUser(req: Request, res: Response, next: NextFunction) {
    const { sessionID } = req;
    if (!sessionID) {
      return next(new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed));
    }
    const sessionData = await this.cacheService.get(`sess:${sessionID}`);
    if (sessionData) {
      return next();
    }
    return next(new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed));
  }

  public async authAdmin(req: Request, res: Response, next: NextFunction) {
    const { sessionID } = req;
    if (!sessionID) {
      return next(new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed));
    }
    const sessionData = JSON.parse(await this.cacheService.get(`sess:${sessionID}`));
    if (sessionData && sessionData.user.role === 1) {
      return next();
    }
    return next(new ErrorHandler(errorStatusCode.UnAuthorization, errorMsg.AuthFailed));
  }
}

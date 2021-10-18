import {Router} from "express"

// Abstract BasicRoute for extends and implement
abstract class BasicRoute {
    private prefix = "";
    protected router = Router();
    protected abstract setRoutes(): void;
  
    public getPrefix() {
      return this.prefix;
    }
  
    public getRouter() {
      return this.router;
    }
  }

export default BasicRoute
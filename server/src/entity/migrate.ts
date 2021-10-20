import { Model } from "sequelize"
import User from "./user"
import Store from "./store"

class Migrater {
    private models: Array<any>

    constructor() {
      this.models = [User,Store]
    }

    migrate() {
      this.models.map(model => {
        model.sync({
          logging:false
        })
      })
    }

  
}


export default Migrater;
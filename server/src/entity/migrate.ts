import DBConnection from "../models/mysql"
import User from "./user"
import Store from "./store"

class Migrater {
 
    static async migrate() {
      try {
        const syncRes =  await DBConnection.sync({
          alter: true,
          logging: false
        })
        console.log("Sync db succeed.");
      } catch (error) {
        console.log(error);
      }
  
    }
}

export default Migrater;
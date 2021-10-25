import DBConnection from "../models/mysql";

class Migrater {
  static async migrate() {
    try {
      await DBConnection.sync({
        alter: true,
        logging: false,
      });
      console.log("Sync db succeed.");
    } catch (error) {
      console.log(error);
    }
  }
}

export default Migrater;

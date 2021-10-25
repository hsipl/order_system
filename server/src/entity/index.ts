import User from "./user";
import Store from "./store";
import DBConnection from "../models/mysql";

Store.hasMany(User, {
  sourceKey: "id",
  foreignKey: "store_id",
  onDelete: "cascade",
});

User.belongsTo(Store, {
  foreignKey: "store_id",
  targetKey: "id",
  onDelete: "cascade",
});

(async function () {
  await DBConnection.sync({
    alter: true,
    logging: true,
  });
})();

import User from "./user";
import Store from "./store";
import DBConnection from "../models/mysql";

// if model does not migrate, add model instance to db,
// like: db.user = User
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: any = {};
db.sequelize = DBConnection;

Store.hasMany(User, {
  sourceKey: "id",
  foreignKey: "store_id",
  onDelete: "cascade",
});

User.belongsTo(Store, {
  foreignKey: "store_id",
  targetKey: "id",
});

(async function () {
  await db.sequelize.sync({
    alter: true,
    logging: console.log,
  });
  console.log("DB migration ok!, process exit.");
  process.exit();
})();

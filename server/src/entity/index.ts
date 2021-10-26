import User from "./user";
import Store from "./store";
import DBConnection from "../models/mysql";
import Order from "./order";
import OrderProduct from "./orderProduct";
import Product from "./product";
import ProductTag from "./productTag";
import Tag from "./tag";
Store.hasMany(User, {
  sourceKey: "id",
  foreignKey: "store_id",
  onDelete: "cascade",
});
Store.hasMany(Order, {
  sourceKey: "id",
  foreignKey: "store_id",
  onDelete: "cascade",
});
Store.hasMany(Product, {
  sourceKey: "id",
  foreignKey: "store_id",
  onDelete: "cascade",
});

User.belongsTo(Store, {
  foreignKey: "store_id",
  targetKey: "id",
  onDelete: "cascade",
});
Order.hasOne(OrderProduct, {
  sourceKey: "id",
  foreignKey: "order_id",
  onDelete: "cascade",
});
Order.belongsTo(Store, {
  foreignKey: "store_id",
  targetKey: "id",
  as: "store",
  onDelete: "cascade",
});
ProductTag.belongsTo(Tag, {
  foreignKey: "tag_id",
  targetKey: "id",
  as: "tag",
  onDelete: "cascade",
});
ProductTag.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "id",
  as: "product",
  onDelete: "cascade",
});
Tag.hasOne(ProductTag, {
  sourceKey: "id",
  foreignKey: "tag_id",
  onDelete: "cascade",
});

Product.hasOne(OrderProduct, {
  sourceKey: "id",
  foreignKey: "product_id",
  onDelete: "cascade",
});
Product.hasOne(ProductTag, {
  sourceKey: "id",
  foreignKey: "product_id",
  onDelete: "cascade",
});
Product.belongsTo(Store, {
  foreignKey: "store_id",
  targetKey: "id",
  as: "store",
  onDelete: "cascade",
});

OrderProduct.belongsTo(Order, {
  foreignKey: "order_id",
  targetKey: "id",
  as: "order",
  onDelete: "cascade",
});
OrderProduct.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "id",
  as: "product",
  onDelete: "cascade",
});

(async function () {
  await DBConnection.sync({
    alter: true,
    logging: true,
  });
})();

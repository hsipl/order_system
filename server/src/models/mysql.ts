import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
  } from 'sequelize';


class DBConnection {

    async initDB():Promise<Sequelize> { 
        const sequelize = await new Sequelize(`mysql://${process.env.DEV_USERNAME}:${process.env.DEV_PASSWORD}@${process.env.DEV_HOST}:${process.env.DEV_PORT}/${process.env.DEV_DB}`);
        try {
          await sequelize.authenticate()
          console.log("Connect to MySQL succeed.");
        } catch (error) {
            console.error("Connect to MySQL failed, err:",error)
            throw new Error("Connect to MySQL failed")
        }
        return sequelize
    }

}


export default new DBConnection()
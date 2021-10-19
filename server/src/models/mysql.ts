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
    private username:string
    private password:string
    private host:string
    private port:string
    private db:string

    constructor(username:string,password:string,host:string,port:string,db:string) {
        this.username = username
        this.password = password
        this.host = host
        this.port = port
        this.db = db
    }

    async initDB():Promise<Sequelize> { 
        const sequelize = await new Sequelize(`mysql://${this.username}:${this.password}@${this.host}:${this.port}/${this.db}`);
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


export default DBConnection
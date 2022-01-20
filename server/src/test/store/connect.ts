import { createConnection } from "typeorm"

export async function getConnection() {
    let connection = await createConnection({
        "name": "default",
        "type": "mysql",
        "host": "db",
        "port": 3306,
        "username": "hsipl",
        "password": "hsipl211",
        "database": "dev_db",
        "synchronize": true,
        "logging": false,
        "entities": [
           "./src/entity/**/*.ts"
        ] 
     })
     return connection
}


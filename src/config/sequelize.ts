import {Sequelize} from "sequelize";
import {DB_HOST, DB_PORT, DB_USER, DB_NAME, DB_PASSWORD} from "./env.ts";
import mysql from "mysql2";
import * as modelDefiners from "../data-layer/models/sequilize";

const sequelize = new Sequelize({
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: "mysql",
    dialectModule: mysql,
})

for (const modelDefiner of Object.values(modelDefiners)) {
    modelDefiner(sequelize)
}

const assertDatabaseConnectionOk = async () => {
    console.info(`Checking database connection...`)

    try {
        await sequelize.authenticate()
        console.info('Database connection OK.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        throw error
    }
}

export const initSequelize = async () => {
    await assertDatabaseConnectionOk()
    await sequelize.sync()
}

export default sequelize;
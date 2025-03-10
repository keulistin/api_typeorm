import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { createConnection } from "mysql2/promise";

const dbConfig = {
    type: "mysql" as const,
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "IntProgDB",
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
};

async function initializeDatabase() {
    try {
        const connection = await createConnection({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.username,
            password: dbConfig.password,
        });
        
        const [rows] = await connection.query(`SHOW DATABASES LIKE '${dbConfig.database}'`);
        if ((rows as any[]).length === 0) {
            await connection.query(`CREATE DATABASE \`${dbConfig.database}\``);
            console.log(`Database '${dbConfig.database}' created.`);
        }
        
        await connection.end();
    } catch (error) {
        console.error("Error creating database:", error);
    }
}

export const AppDataSource = new DataSource(dbConfig);

initializeDatabase().then(() => {
    AppDataSource.initialize()
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((error) => console.error("Error connecting to database:", error));
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const promise_1 = require("mysql2/promise");
const dbConfig = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "Int_Prog_DB",
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
};
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield (0, promise_1.createConnection)({
                host: dbConfig.host,
                port: dbConfig.port,
                user: dbConfig.username,
                password: dbConfig.password,
            });
            const [rows] = yield connection.query(`SHOW DATABASES LIKE '${dbConfig.database}'`);
            if (rows.length === 0) {
                yield connection.query(`CREATE DATABASE \`${dbConfig.database}\``);
                console.log(`✅ Database '${dbConfig.database}' created.`);
            }
            else {
                console.log(`ℹ️ Database '${dbConfig.database}' already exists.`);
            }
            yield connection.end();
        }
        catch (error) {
            console.error("Error initializing database:", error);
        }
    });
}
exports.AppDataSource = new typeorm_1.DataSource(dbConfig);
initializeDatabase().then(() => {
    exports.AppDataSource.initialize()
        .then(() => console.log("✅ Database connected successfully"))
        .catch((error) => console.error("Error connecting to database:", error));
});

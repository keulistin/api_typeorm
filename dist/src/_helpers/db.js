"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'GORGONIO_DB',
    entities: [User_1.User],
    synchronize: true, // Set to false in production
    logging: true,
});
exports.AppDataSource.initialize()
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.log('Database connection error:', error));

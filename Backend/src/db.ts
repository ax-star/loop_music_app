import { DataSource } from 'typeorm';

const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT || 3000);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const BD_SCHEME = process.env.BD_SCHEME;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: BD_SCHEME,
    synchronize: true
});
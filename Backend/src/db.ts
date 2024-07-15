import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'some.external.host',
    port: 1000,
    username: 'bd-user',
    password: 'bd-strong-password',
    database: 'bd-name',
    synchronize: true
});
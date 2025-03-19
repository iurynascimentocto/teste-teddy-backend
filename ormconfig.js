/* eslint-disable @typescript-eslint/no-require-imports */

const { DataSource } = require('typeorm');
require('dotenv').config();

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/modules/**/domain/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  migrationsTableName: 'migrations',
});

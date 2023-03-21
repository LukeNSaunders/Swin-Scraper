import { Sequelize } from 'sequelize';
import { green, red } from 'colorette';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env 

export const sequelize = new Sequelize({
  host: '35.234.155.45',
  dialect: 'postgres',
  port: 5432,
  database: DB_USER,
  username: DB_NAME,
  password: DB_PASSWORD,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(green('Successfully connected to the database!'));
  })
  .catch((error) => {
    console.error(red('Unable to connect to the database:'), error);
  });

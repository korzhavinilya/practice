import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db', 'rootuser', 'rootpass', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

export default sequelize;
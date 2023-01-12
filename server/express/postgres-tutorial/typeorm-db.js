const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'rootuser',
  password: 'rootpass',
  database: 'test',
  entities: ['entities/*.js'],
  logging: true,
  synchronize: true,
});

module.exports = dataSource;
// exports = dataSource;

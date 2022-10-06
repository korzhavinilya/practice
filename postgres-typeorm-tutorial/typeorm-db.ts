import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'rootuser',
  password: 'rootpass',
  database: 'test',
  entities: ['entities/*.ts'],
  logging: true,
  // synchronize: true,
});

export default dataSource;

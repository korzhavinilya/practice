const pg = require('pg');
const pool = new pg.Pool({
  user: 'rootuser',
  password: 'rootpass',
  host: 'localhost',
  port: 5432,
  database: 'test',
});

module.exports = pool;

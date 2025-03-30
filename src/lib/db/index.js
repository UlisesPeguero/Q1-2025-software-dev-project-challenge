import postgres from 'postgres';

const sql = postgres('postgres://username:password@localhost:5432/database', {
  host: process.env.SQL_LOCALHOST,
  port: process.env.SQL_PORT,
  database: process.env.SQL_DATABASE,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
});

export default sql;

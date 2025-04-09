import postgres from 'postgres';

const sql = postgres(process.env.SQL_URL, {
  transform: postgres.toCamel,
  max: 100,
  types: {
    bigint: postgres.BigInt,
  },
});

export default sql;

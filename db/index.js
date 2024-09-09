import pg from "pg";
const { Pool } = pg;

const DbPool = new Pool({
  connectionString: `${process.env.PG_DATABASE_URI}`,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  ssl: {
    rejectUnauthorized: false,
  },
  port: 13985,
});

export const queryDb = (text, params) => {
  return DbPool.query(text, params);
};
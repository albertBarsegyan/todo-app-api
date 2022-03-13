import * as session from "express-session";
import expressMySqlSession from "express-mysql-session";

const mysqlSessionStoreSettings = {
  host: process.env.DATABASE_HOST as string,
  port: Number(process.env.DATABASE_PORT) as number,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  createDatabaseTable: true,
};

const MySQLStore = expressMySqlSession(session);

const mysqlSessionStorage = new MySQLStore(mysqlSessionStoreSettings);

export const sessionSettings = {
  secret: process.env.SESSION_SECRET ?? "key",
  resave: false,
  saveUninitialized: true,

  store: mysqlSessionStorage,
  cookie: {
    httpOnly: true,
    maxAge: 3600000,
  },
};

import "dotenv/config";
import { mysqlSessionStorage } from "./configs/mysqlSessionStorage";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { RoutePaths } from "./constants/route.constants";
import loginRouter from "./routes/login.routes";
import registerRouter from "./routes/register.routes";
import session from "express-session";
import bodyParser from "body-parser";
import logoutRouter from "./routes/logout.routes";
import { corsOptions } from "./configs/cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "key",
    resave: false,
    saveUninitialized: true,
    store: mysqlSessionStorage,
  })
);

// routes
// app.use(RoutePaths.main);
app.use(RoutePaths.register, registerRouter);
app.use(RoutePaths.login, loginRouter);
app.use(RoutePaths.logout, logoutRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

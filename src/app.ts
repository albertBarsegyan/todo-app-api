import { userController } from "./controllers/userController";
import { Paths } from "./constants/path.constants";
import "dotenv/config";
import { sessionSettings } from "./configs/session";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { DynamicRoutes, RoutePaths } from "./constants/route.constants";
import loginRouter from "./routes/login.routes";
import registerRouter from "./routes/register.routes";
import session from "express-session";
import bodyParser from "body-parser";
import logoutRouter from "./routes/logout.routes";
import { corsOptions } from "./configs/cors";
import userRouter from "./routes/user.routes";

const app = express();

const PORT = process.env.PORT || 3000;

// serve static folders
app.use("/images", express.static(Paths.storage()));

// middleware connections
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false }));
app.use(express.json({ limit: "1mb" }));
app.use(session(sessionSettings));

// routes
app.use(RoutePaths.register(), registerRouter);
app.use(RoutePaths.login(), loginRouter);
app.use(RoutePaths.logout(), logoutRouter);

app.use(RoutePaths.user(), userRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

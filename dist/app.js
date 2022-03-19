"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mysqlSessionStorage_1 = require("./configs/mysqlSessionStorage");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const route_constants_1 = require("./constants/route.constants");
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const register_routes_1 = __importDefault(require("./routes/register.routes"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(
  (0, express_session_1.default)({
    secret:
      (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : "key",
    resave: false,
    saveUninitialized: true,
    store: mysqlSessionStorage_1.mysqlSessionStorage,
  })
);
// routes
app.use(route_constants_1.RoutePaths.register, register_routes_1.default);
app.use(route_constants_1.RoutePaths.login, login_routes_1.default);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});

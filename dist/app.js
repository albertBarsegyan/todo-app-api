"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_constants_1 = require("./constants/path.constants");
require("dotenv/config");
const session_1 = require("./configs/session");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const route_constants_1 = require("./constants/route.constants");
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const register_routes_1 = __importDefault(require("./routes/register.routes"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const logout_routes_1 = __importDefault(require("./routes/logout.routes"));
const cors_2 = require("./configs/cors");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// middleware connections
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.urlencoded({ limit: "1mb", extended: false }));
app.use(express_1.default.json({ limit: "1mb" }));
app.use((0, express_session_1.default)(session_1.sessionSettings));
// serve static folders
app.use("/images", express_1.default.static(path_constants_1.Paths.storage()));
// routes
app.use(route_constants_1.RoutePaths.register(), register_routes_1.default);
app.use(route_constants_1.RoutePaths.login(), login_routes_1.default);
app.use(route_constants_1.RoutePaths.logout(), logout_routes_1.default);
app.use(route_constants_1.RoutePaths.user(), user_routes_1.default);
app.use(route_constants_1.RoutePaths.todo(), todo_routes_1.default);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});

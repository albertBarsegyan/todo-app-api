import cors from "cors";

const allowedOrigins = [
  "http://localhost:3005",
  "https://todo-applicationapi.herokuapp.com",
];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

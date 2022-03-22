import cors from "cors";

const allowedOrigins = [
  "http://localhost:3005",
  "https://todo-web-teal.vercel.app",
];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

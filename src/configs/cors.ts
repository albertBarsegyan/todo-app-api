import cors from "cors";

const allowedOrigins = ["http://localhost:3005", "localhost:3005"];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

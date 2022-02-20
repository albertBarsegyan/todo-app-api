import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express application listening on port ${PORT}.`);
});

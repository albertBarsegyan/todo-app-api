import bodyParser from "body-parser";
import express from "express";
import regionsRouter from "./routes/regions";

const app = express();

app.use(bodyParser.json());

app.use("/regions", regionsRouter);

// PORTs
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

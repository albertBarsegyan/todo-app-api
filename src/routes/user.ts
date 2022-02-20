import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.send("users");
});

import {
  yerevanRegionsDataParsed,
  filterYerevanRegionsData,
} from "./../services/yerevanRegions.services";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(yerevanRegionsDataParsed);
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const filteredData = filterYerevanRegionsData(id);

  console.log("data", filteredData);

  res.status(200).send(filterYerevanRegionsData(id));
});

export default router;

import { IYerevanData, IRegionData } from "./../types/yerevanData.types";
import { readFileSync } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const pathToYerevanRegionsData = path.join(
  __dirname,
  "../assets/",
  "db",
  "yerevan-regions.json"
);

const yerevanRegionsData = readFileSync(pathToYerevanRegionsData);

export const yerevanRegionsDataParsed: IYerevanData = JSON.parse(
  yerevanRegionsData.toString()
).regions.map((region: IRegionData) => {
  return { ...region, id: nanoid() };
});

export const filterYerevanRegionsData = (id: string | number) =>
  yerevanRegionsDataParsed?.regions?.find((data) => {
    data.id === id;
  }) ?? "Empty";

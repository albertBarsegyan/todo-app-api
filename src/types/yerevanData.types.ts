export interface IRegionData {
  name: string;
  population: number;
  id?: string | number;
}
export interface IYerevanData {
  regions: IRegionData[];
}

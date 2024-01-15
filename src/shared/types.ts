export interface IChartData {
  [key: string]: number | string;
}

export type DataKey = {
  key: string;
  color: string;
}

export interface IConsumptionData {
  id: string,
  reference: string,
  year: number,
  month: number,
  day: number,
  hour: number,
  consumption: number,
  agent: string,
  meter: string,
  origin: string,
  intervalInMinutes: number,
  isEstimated: boolean
}

export interface IChartData {
  name: string;
  [key: string]: string;
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

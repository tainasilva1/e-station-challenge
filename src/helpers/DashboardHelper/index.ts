import { KEYS_DATA_BY_DAY } from "@/src/shared/constants";
import { IChartData, IConsumptionData } from "@/src/shared/types";

type tTotalConsumptionByMonth = {
  [key: number]: {
    [key: string]: number;
  }
}

const MONTH_NAMES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

function getMonthName(date: string) {
  const newDate = new Date(date);
  return MONTH_NAMES[newDate.getMonth()];
}

export function calculateConsumptionByYear(consumptionData: IConsumptionData[]) {
  const totalConsumptionByMonth: tTotalConsumptionByMonth = {};

  consumptionData.forEach((data) => {
    const { year, month, consumption } = data;

    if (!totalConsumptionByMonth[month]) totalConsumptionByMonth[month] = {};

    totalConsumptionByMonth[month][year] = consumption;
  });

  const result = Object.entries(totalConsumptionByMonth).map(([month, yearData]) => {
    const monthlyTotal: IChartData = { name: MONTH_NAMES[Number(month) - 1] };

    Object.entries(yearData).forEach(([year, consumption]) => {
      monthlyTotal[year] = Math.floor(consumption);
    });

    return monthlyTotal;
  });

  return result;
};

export function calculateConsumptionByDay(consumptionData: IConsumptionData[], date: string) {
  const filteredData = consumptionData.filter(data => data.reference === date)
  const flexibility = 0.1; // 10%
  const contractedVolume = 100;
  
  const result = filteredData.map(data => ({
    name: data.hour,
    [KEYS_DATA_BY_DAY.CONSUMPTION]: Math.floor(data.consumption),
    [KEYS_DATA_BY_DAY.MAXIMUM_FLEX]: contractedVolume + (100 * flexibility),
    [KEYS_DATA_BY_DAY.MINIMUM_FLEX]: contractedVolume - (100 * flexibility),
    [KEYS_DATA_BY_DAY.FLAT_CONSUMPTION]: 100
  }));

  return result;
}

export function calculateConsumptionByLastWeek(consumptionData: IConsumptionData[]) {
  const last7days = consumptionData.filter(data => {
    const dateReference = new Date(data.year, data.month - 1, data.day);
    const lastDate = consumptionData[consumptionData.length - 1]
    const formattedLastDate = new Date(lastDate.year, lastDate.month - 1, lastDate.day);

    dateReference.setHours(0, 0, 0, 0);
    formattedLastDate.setHours(0, 0, 0, 0);

    const diffMilissegundos = formattedLastDate.getTime() - dateReference.getTime();
    const diffDays = Math.floor(diffMilissegundos / (1000 * 60 * 60 * 24));

    return diffDays <= 7;
  });

  const result = last7days.map(data => ({
    name: `${data.day}/${data.month}`,
    consumo: parseFloat(data.consumption.toFixed(0)),
  }));

  return result;
}

export function formattedTableData(consumptionData: IConsumptionData[]) {
  return consumptionData.map((data) => {
    return {
      'Agente': data.agent,
      'Ponto': data.meter,
      'Data': data.reference,
      'Hora': data.hour,
      'Consumo Ativo (MWh)': data.consumption,
      'Origem': data.origin
    }
  })
}

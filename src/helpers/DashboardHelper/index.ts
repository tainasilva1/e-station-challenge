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

  // Iterar sobre os dados e calcular o consumo total por mês em cada ano
  consumptionData.forEach((data) => {
    const { year, month, consumption } = data;

    if (!totalConsumptionByMonth[month]) totalConsumptionByMonth[month] = {};

    totalConsumptionByMonth[month][year] = consumption;
  });

  // Converter o objeto em uma matriz para facilitar a renderização
  const result = Object.entries(totalConsumptionByMonth).map(([reference, yearData]) => {
    const monthlyTotal: IChartData = { name: getMonthName(reference) };

    Object.entries(yearData).forEach(([year, consumption]) => {
      monthlyTotal[year] = `${consumption.toFixed(0)}`;
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
    consumo: Math.floor(data.consumption),
    flexMaxima: contractedVolume + (100 * flexibility),
    flexMinima: contractedVolume - (100 * flexibility),
    consumoFlat: 100
  }));

  return result;
}
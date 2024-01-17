import { KEYS_DATA_BY_DAY, MONTH_NAMES } from "@/src/shared/constants";
import { IChartData, IConsumptionData } from "@/src/shared/types";

type tTotalConsumptionByMonth = {
  [key: number]: {
    [key: string]: number;
  }
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

export function calculateConsumptionByDay(consumptionData: IConsumptionData[], day: number, month: number, year: number) {
  const filteredData = consumptionData.filter(data => data.day === day && data.month === month && data.year === year)
  
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
      agent: data.agent,
      meter: data.meter,
      reference: data.reference,
      hour: data.hour,
      consumption: data.consumption,
      origin: data.origin
    }
  })
}

export function sorted(key: keyof IConsumptionData, ordem: 'asc' | 'desc') {
  return (a: IConsumptionData, b: IConsumptionData) => {
    const valueA = a[key];
    const valueB = b[key];

    if (ordem === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueB < valueA ? -1 : valueB > valueA ? 1 : 0;
    }
  };
};

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};


export function filterByRangeDate(data: IConsumptionData[], startDate: Date, endDate: Date) {
  return data.filter((item) => {
    const parseDate = new Date(item.year, item.month - 1, item.day);;
    return parseDate >= startDate && parseDate <= endDate;
  });
}
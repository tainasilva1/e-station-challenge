'use client';
import { useEffect, useState } from 'react';
import AreaChart from '../components/AreaChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import { calculateConsumptionByDay, calculateConsumptionByLastWeek, calculateConsumptionByYear } from '../helpers/DashboardHelper';
import { fetchData } from '../services/APIService';
import { IChartData } from '../shared/types';

export default function Home() {
  const [byYear, setByYear] = useState<IChartData[]>();
  const [byDate, setByDate] = useState<IChartData[]>();
  const [byLast7Days, setByLastSetDays] = useState<IChartData[]>();

  useEffect(() => {
    getConsumption();
  }, []);

  // Todo: criar um arquivo de constants
  const byLast7DaysKeys = [{ key: 'consumo', color: '#8884d8'}]
  const byYearKeys = [
    { key: '2021', color: '#3c81f6' },
    { key: '2022', color: '#1ab8a6' }
  ]

  const byDateKeys = [
    {
      key: 'consumo',
      color: '#5e9ae5'
    },
    {
      key: 'flexMaxima',
      color: '#f97415'
    },
    {
      key: 'flexMinima',
      color: '#6466f1'
    },
    {
      key: 'consumoFlat',
      color: '#23c45e'
    },
  ]

  const getConsumption = async () => {
    const data = await fetchData();

    setByYear(calculateConsumptionByYear(data));
    setByDate(calculateConsumptionByDay(data, '27/04/2022'))
    setByLastSetDays(calculateConsumptionByLastWeek(data))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='z-10 max-w-5xl w-full justify-between font-mono text-sm lg:flex'>
        {byYear && <BarChart data={byYear} dataKey={byYearKeys} />}
        {byDate && <LineChart data={byDate} dataKey={byDateKeys} />}
      </div>
      <div className='z-10 max-w-5xl w-full justify-between font-mono text-sm lg:flex'>
        {byLast7Days && <AreaChart data={byLast7Days} dataKey={byLast7DaysKeys}/>}
      </div>
    </main>
  )
}

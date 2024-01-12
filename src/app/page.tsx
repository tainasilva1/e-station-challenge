'use client';
import { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import { calculateConsumptionByYear } from '../helpers/DashboardHelper';
import { fetchData } from '../services/APIService';
import { IChartData } from '../shared/types';

export default function Home() {
  const [byYear, setByYear] = useState<IChartData[]>();

  useEffect(() => {
    getConsuConsumptionByYear();
  }, []);

  const getConsuConsumptionByYear = async () => {
    const data = await fetchData();
    const total = calculateConsumptionByYear(data);
    setByYear(total);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='z-10 min-h-screen max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        {byYear && <BarChart data={byYear}/>}
      </div>
    </main>
  )
}

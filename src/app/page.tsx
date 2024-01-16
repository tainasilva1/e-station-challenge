'use client';
import { useEffect, useState } from 'react';
import AreaChart from '../components/AreaChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { calculateConsumptionByDay, calculateConsumptionByLastWeek, calculateConsumptionByYear, formattedTableData } from '../helpers/DashboardHelper';
import { usePagination } from '../hooks/usePagination';
import { fetchData } from '../services/APIService';
import { KEYS_BY_DATE, KEYS_BY_LAST_WEEK, KEYS_BY_YEAR } from '../shared/constants';
import { IChartData } from '../shared/types';

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [byYear, setByYear] = useState<IChartData[]>();
  const [byDate, setByDate] = useState<IChartData[]>();
  const [byLast7Days, setByLastSetDays] = useState<IChartData[]>();
  const [dataTable, setDataTable] = useState<any>();

  const { totalPages, currentPage, currentItens, setCurrentPage } = usePagination(data);
  
  useEffect(() => {
    getConsumption();
  }, []);

  useEffect(() => {
    if (currentItens) setDataTable(formattedTableData(currentItens));
  }, [currentItens])

  const getConsumption = async () => {
    const data = await fetchData();

    setData(data);
    setByYear(calculateConsumptionByYear(data));
    setByDate(calculateConsumptionByDay(data, '27/04/2022'))
    setByLastSetDays(calculateConsumptionByLastWeek(data))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='z-10 max-w-5xl w-full justify-between font-mono text-sm lg:flex'>
        {byYear && <BarChart data={byYear} dataKey={KEYS_BY_YEAR} />}
        {byDate && <LineChart data={byDate} dataKey={KEYS_BY_DATE} />}
      </div>
      <div className='z-10 max-w-5xl w-full justify-between font-mono text-sm lg:flex'>
        {byLast7Days && <AreaChart data={byLast7Days} dataKey={KEYS_BY_LAST_WEEK}/>}
      </div>
      <div className='z-10 max-w-5xl w-full flex-col font-mono text-sm lg:flex'>
        {dataTable && <Table data={dataTable} />}
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  )
}

'use client';
import { useEffect, useState } from 'react';
import AreaChart from '../components/AreaChart';
import BarChart from '../components/BarChart';
import Card from '../components/Card';
import LineChart from '../components/LineChart';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import Title from '../components/Title';
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
    <main className="flex justify-center font-roboto bg-gray-100 alig-min-h-screen flex-col justify-between p-7 space-y-8">
      <div>
        <Title> Dashboard </Title>
        <p className="text-sm text-gray-700">
          Informações baseados nos dados de medições colhidos na CCEE.
        </p>
      </div>
      <div className='flex space-x-4 w-full text-sm lg:flex'>
        <div className='w-1/2'>
          {byYear && <Card>
            <div>
              <Title> Consumo Anual (2021/2022) </Title>
              <p className="text-sm text-gray-400 ">
                Comparativo mensal do consumo realizado nos anos de 2021 e 2022.
              </p>
            </div>
            <BarChart data={byYear} dataKey={KEYS_BY_YEAR} />
          </Card>}
        </div>
        <div className='w-1/2'>
          {byDate && <Card>
            <Title> Medição Horária (Por Dia) </Title>
            <LineChart data={byDate} dataKey={KEYS_BY_DATE} />
          </Card>}
        </div>
      </div>
      <div className='flex w-full text-sm lg:flex'>
        {byLast7Days && <Card>
          <Title> Medição Histórica (Última Semana) </Title>
          <AreaChart data={byLast7Days} dataKey={KEYS_BY_LAST_WEEK} />
        </Card>}
      </div>
      <div className='flex w-full text-sm lg:flex'>
        <Card>
          <div>
            <Title> Medições </Title>
          </div>
          {dataTable && <Table data={dataTable} />}
          <div className='flex w-full lg:flex justify-end'>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </Card>
      </div>
    </main >
  )
}

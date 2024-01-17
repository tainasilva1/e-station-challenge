'use client';
import { useEffect, useState } from 'react';
import AreaChart from '../components/AreaChart';
import BarChart from '../components/BarChart';
import Card from '../components/Card';
import DatePicker from '../components/DatePicker';
import LineChart from '../components/LineChart';
import Pagination from '../components/Pagination';
import Select from '../components/Select';
import Table from '../components/Table';
import Title from '../components/Title';
import { calculateConsumptionByDay, calculateConsumptionByLastWeek, calculateConsumptionByYear, filterByRangeDate, formattedTableData, sorted } from '../helpers/DashboardHelper';
import { usePagination } from '../hooks/usePagination';
import { fetchData } from '../services/APIService';
import { KEYS_BY_DATE, KEYS_BY_LAST_WEEK, KEYS_BY_YEAR, MONTH_NAMES } from '../shared/constants';
import { IChartData, IConsumptionData } from '../shared/types';

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [byYear, setByYear] = useState<IChartData[]>();
  const [byDate, setByDate] = useState<IChartData[]>();
  const [byLast7Days, setByLastSetDays] = useState<IChartData[]>();
  const [formatDataTable, setFormatDataTable] = useState<any>();
  const [dataTable, setDataTable] = useState<any>([]);
  const [selectDay, setSelectedDay] = useState(1);
  const [selectMonth, setSelectedMonth] = useState(0);
  const [selectYear, setSelectedYear] = useState(2021);

  const {
    totalPages,
    totalItens,
    totalShowItens,
    currentPage,
    currentItens,
    setCurrentPage 
  } = usePagination(dataTable);

  useEffect(() => {
    getConsumption();
  }, []);

  useEffect(() => {
    if (currentItens) setFormatDataTable(formattedTableData(currentItens));
  }, [currentItens])

  useEffect(() => {
    setByDate(calculateConsumptionByDay(data, selectDay, selectMonth + 1, selectYear))
  }, [data, selectDay, selectMonth, selectYear])

  const getConsumption = async () => {
    const data = await fetchData();

    setDataTable(data);
    setData(data);
    setByYear(calculateConsumptionByYear(data));
    setByLastSetDays(calculateConsumptionByLastWeek(data))
  }

  const generateRange = (n: number) => {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  const optionsDays = generateRange(31).map((day) => ({
    value: day,
    name: day,
  }));

  const optionsMonth = Object.keys(MONTH_NAMES).map((month) => ({
    value: month,
    name: MONTH_NAMES[Number(month)],
  }));

  const optionsYear = [
    { value: 2021, name: '2021' },
    { value: 2022, name: '2022' }
  ]

  const handleSorted = async (sort: { key: keyof IConsumptionData, order: 'desc' | 'asc'}) => {
    const items = dataTable.slice().sort(sorted(sort.key, sort.order));
    setDataTable(items);
  }

  const handleDateChange = (start: Date | null, end: Date | null) => {
    if (!start || !end) return;
    const rangeData = filterByRangeDate(data, start, end);
    setDataTable(rangeData);
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
            <div>
              <Title> Medição Horária (Por Dia) </Title>
              <div className='flex space-x-12 py-4'>
                <Select
                  options={optionsDays}
                  value={selectDay}
                  onChange={(event) => setSelectedDay(parseInt(event.target.value))}
                />
                <Select
                  options={optionsMonth}
                  value={selectMonth}
                  onChange={(event) => setSelectedMonth(parseInt(event.target.value))}
                />
                <Select
                  options={optionsYear}
                  value={selectYear}
                  onChange={(event) => setSelectedYear(parseInt(event.target.value))}
                />
              </div>
            </div>
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
          <div className='flex items-center justify-between'>
            <Title> Medições </Title>
            <div>
              <DatePicker onDateChange={handleDateChange}/>
            </div>
          </div>
          {formatDataTable && <Table data={formatDataTable} onSorted={handleSorted} />}
          <div className='flex w-full items-center lg:flex justify-between'>
            <p className="text-xs text-gray-500">
              Exibindo {totalShowItens} de {totalItens} itens.
            </p>
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

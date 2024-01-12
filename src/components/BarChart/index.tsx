import { IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { BarChart as BarChartRecharts, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  data: IChartData[];
  YAxisMinValue?: number;
  YAxisMaxValue?: number;
  barLeftColor?: string;
  barRightColor?: string;
}

export const BarChart = ({ 
  data,
  YAxisMinValue = 0,
  YAxisMaxValue = 120, // TODO: Escrever o codigo para retornar o maior valor
  barLeftColor = '#3c81f6',
  barRightColor = '#1ab8a6' 
}: Props ) => (
  <BarChartRecharts
    width={500}
    height={300}
    data={data}
    barGap={4}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis tickLine={false} dataKey="name" />
    <YAxis width={80} tickLine={false} axisLine={false} unit='(MWh)' domain={[YAxisMinValue, YAxisMaxValue]} />
    <Tooltip />
    <Legend align='right' verticalAlign='top' iconType='circle' height={36} />
    <Bar barSize={20} dataKey="2021" fill={barLeftColor} />
    <Bar barSize={20} dataKey="2022" fill={barRightColor} />
  </BarChartRecharts>
)

export default memo(BarChart);
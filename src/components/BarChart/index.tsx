import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { BarChart as BarChartRecharts, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  data: IChartData[];
  dataKey: DataKey[];
  YAxisMinValue?: number;
  YAxisMaxValue?: number;
}

export const BarChart = ({ 
  data,
  dataKey,
  YAxisMinValue = 0,
  YAxisMaxValue = 120 // TODO: Escrever o codigo para retornar o maior valor
}: Props ) => (
  <BarChartRecharts
    width={600}
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
    {dataKey.map((data) => (
      <Bar 
        key={data.key} 
        barSize={20} 
        dataKey={data.key} 
        fill={data.color} 
      />
    ))}
  </BarChartRecharts>
)

export default memo(BarChart);
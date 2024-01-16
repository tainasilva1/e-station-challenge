import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { BarChart as BarChartRecharts, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
  data: IChartData[];
  dataKey: DataKey[];
  unit?: string;
  YAxisMinValue?: number;
  YAxisMaxValue?: number;
}

export const BarChart = ({
  data,
  dataKey,
  unit = '(MWh)',
  YAxisMinValue = 0,
  YAxisMaxValue = 120 
}: Props) => (
  <ResponsiveContainer width="100%" height={345}>
    <BarChartRecharts data={data} barGap={4}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis style={{ fontSize: '0.8rem' }} tickLine={false} dataKey="name" />
      <YAxis 
        style={{ fontSize: '0.8rem' }}
        tickLine={false}
        axisLine={false}
        unit={unit}
        domain={[YAxisMinValue, YAxisMaxValue]} 
      />
      <Tooltip formatter={(value, name) => [`${value} ${unit}`, name]} />
      <Legend  align='right' verticalAlign='top' iconType='circle' height={36} />
      {dataKey.map((data) => (
        <Bar
          key={data.key}
          barSize={20}
          dataKey={data.key}
          fill={data.color}
        />
      ))}
    </BarChartRecharts>
  </ResponsiveContainer>
)

export default memo(BarChart);
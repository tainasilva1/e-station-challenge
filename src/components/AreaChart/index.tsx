import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { AreaChart as AreaChartRecharts, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Area, ResponsiveContainer } from 'recharts';

type Props = {
  data: IChartData[];
  dataKey: DataKey[];
  unit?: string;
}

export const AreaChart = ({
  data,
  dataKey,
  unit = '(MWh)',
}: Props) => (
  <ResponsiveContainer width="100%" height={350}>
    <AreaChartRecharts data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis style={{ fontSize: '0.8rem' }} tickLine={false} dataKey="name" minTickGap={8} />
      <YAxis width={70} style={{ fontSize: '0.8rem', wordBreak: 'break-all', maxWidth: '60px' }} unit={unit} tickLine={false} domain={[88, 120]} />
      <Tooltip formatter={(value, name) => [`${value} ${unit}`, name]}/>
      <Legend align='right' verticalAlign='top' iconType='circle' height={36} />
      {dataKey.map((data) => (
        <Area key={data.key} type="monotone" dataKey={data.key} stroke={data.color} strokeWidth={2} fill={data.color} fillOpacity={0.1} />
      ))}
    </AreaChartRecharts>
  </ResponsiveContainer>
)

export default memo(AreaChart);
import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { AreaChart as AreaChartRecharts, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Area } from 'recharts';

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
  <AreaChartRecharts
    width={1000}
    height={300}
    data={data}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis tickLine={false} dataKey="name" minTickGap={8} />
    <YAxis unit={unit} tickLine={false} domain={[88, 120]} />
    <Tooltip />
    <Legend align='right' verticalAlign='top' iconType='circle' height={36} />
    {dataKey.map((data) => (
      <Area key={data.key} type="monotone" dataKey={data.key} stroke={data.color} strokeWidth={2} fill={data.color} fillOpacity={0.1} />
    ))}
  </AreaChartRecharts>
)

export default memo(AreaChart);
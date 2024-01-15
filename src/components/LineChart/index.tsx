import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { LineChart as LineChartRecharts, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

type Props = {
  data: IChartData[];
  dataKey: DataKey[];
  unit?: string;
}

export const LineChart = ({
  data,
  dataKey,
  unit = '(MWh)',
}: Props) => (
  <LineChartRecharts
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis width={80} tickLine={false} dataKey="name" />
    <YAxis unit={unit} tickLine={false} domain={['DataMin', 'DataMax']} />
    <Tooltip />
    <Legend align='right' verticalAlign='top' iconType='circle' height={36} />
    {dataKey.map((data) => (
      <Line
        key={data.key}
        type="monotone"
        dataKey={data.key}
        stroke={data.color}
        strokeWidth={2} 
        dot={false} 
      />
    ))}
  </LineChartRecharts>
)

export default memo(LineChart);
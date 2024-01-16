import { BY_DAY_LEGENDS } from '@/src/shared/constants';
import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { LineChart as LineChartRecharts, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

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
  <ResponsiveContainer width="100%" height={300}>
    <LineChartRecharts
      data={data}
      margin={{
        top: 5,
        right: 20,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis style={{ fontSize: '0.8rem' }} width={80} tick={false} tickLine={false} dataKey="name" />
      <YAxis style={{ fontSize: '0.8rem' }} unit={unit} tickLine={false} domain={['DataMin', 'DataMax']} />
      <Tooltip formatter={(value, name) => [`${value} ${unit}`, BY_DAY_LEGENDS[name]]} />
      <Legend 
        align='right'
        verticalAlign='top'
        iconType='circle'
        height={36}
        formatter={(value) => BY_DAY_LEGENDS[value]}
      />
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
  </ResponsiveContainer>
)

export default memo(LineChart);
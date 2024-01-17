import { BY_DAY_LEGENDS } from '@/src/shared/constants';
import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { LineChart as LineChartRecharts, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import ContentLoader from 'react-content-loader';

type Props = {
  data?: IChartData[];
  dataKey: DataKey[];
  unit?: string;
}

export const LineChart = ({
  data,
  dataKey,
  unit = '(MWh)',
}: Props) => {
  if (!data) return (
    <ContentLoader width='100%' height={300} viewBox="0 0 680 264">
      <rect x="20" y="5" rx="0" ry="0" width="3" height={300} />
      <rect x="20" y="260" rx="0" ry="0" width={640} height="3" />
      <path d="M 656 30.566 C 556.69 20.52 504.966 61.705 335 71.75 c -121.241 8.175 -198.621 66.358 -300 66.358 V 245 h 630 V 30.566 z" />
    </ContentLoader>
  )
  return (
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
}
export default memo(LineChart);
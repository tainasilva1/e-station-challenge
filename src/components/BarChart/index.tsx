import { DataKey, IChartData } from '@/src/shared/types';
import { memo } from 'react';
import { BarChart as BarChartRecharts, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ContentLoader from 'react-content-loader';

type Props = {
  data?: IChartData[];
  dataKey: DataKey[];
  unit?: string;
  YAxisMinValue?: number;
  YAxisMaxValue?: number;
  isLoading?: boolean;
}

export const BarChart = ({
  data,
  dataKey,
  unit = '(MWh)',
  YAxisMinValue = 0,
  YAxisMaxValue = 120,
  isLoading = true
}: Props) => {
  if (!data || data.length < 0) return (
    <div className="animate-pulse">
      <div className="flex space-x-4 items-baseline m-6">
        <div className="flex-1 h-24 bg-gray-200 rounded"></div>
        <div className="flex-1 h-36 bg-gray-200 rounded"></div>
        <div className="flex-1 h-48 bg-gray-200 rounded"></div>
        <div className="flex-1 h-64 bg-gray-300 rounded"></div>
        <div className="flex-1 h-72 bg-gray-200 rounded"></div>
        <div className="flex-1 h-64 bg-gray-300 rounded"></div>
        <div className="flex-1 h-48 bg-gray-200 rounded"></div>
        <div className="flex-1 h-36 bg-gray-200 rounded"></div>
        <div className="flex-1 h-72 bg-gray-300 rounded"></div>
        <div className="flex-1 h-36 bg-gray-200 rounded"></div>
        <div className="flex-1 h-48 bg-gray-200 rounded"></div>
        <div className="flex-1 h-64 bg-gray-300 rounded"></div>
        <div className="flex-1 h-72 bg-gray-200 rounded"></div>
        <div className="flex-1 h-64 bg-gray-300 rounded"></div>
        <div className="flex-1 h-48 bg-gray-200 rounded"></div>
        <div className="flex-1 h-36 bg-gray-200 rounded"></div>
        <div className="flex-1 h-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  )

  return (
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
    </ResponsiveContainer>
  )
}

export default memo(BarChart);
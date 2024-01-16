import { IChartData } from '@/src/shared/types';
import { memo } from 'react';

type Props = {
  data: IChartData[]
}

const Table = ({ data }: Props) => {
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="font-medium">
                <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} scope="col" className="px-6 py-4 text-gray-500">
                    {key}
                  </th>
                ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr className="border-b" key={index}>
                    {Object.keys(row).map((key) => (
                      <td key={key} className="whitespace-nowrap px-6 py-4 font-small text-gray-400">
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Table);
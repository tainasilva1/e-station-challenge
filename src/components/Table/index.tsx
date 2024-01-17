import { CONSUMPTION_LABELS } from '@/src/shared/constants';
import { IChartData, IConsumptionData } from '@/src/shared/types';
import { memo, useState } from 'react';
import { TiArrowUnsorted } from "react-icons/ti";

type Props = {
  data: IChartData[];
  onSorted: (sort: { key: keyof IConsumptionData, order: 'asc' | 'desc' }) => void; 
}

const Table = ({ data, onSorted }: Props) => {
  const [sort, setSort] = useState<{ key: keyof IConsumptionData; order: 'asc' | 'desc' }>();

  const handleSorted = (key: keyof IConsumptionData) => {
    if (sort && sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, order: 'asc' });
    }
    if (!sort) return;
    onSorted(sort)
  };

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
                    <button onClick={() => handleSorted(key)} className='flex space-x-4 items-center'>
                      {CONSUMPTION_LABELS[key]}
                      <TiArrowUnsorted color='#9CA3AF'/>
                    </button>
                  </th>
                ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr className="border-b" key={index}>
                    {Object.keys(row).map((key) => (
                      <td key={key} className="whitespace-nowrap px-6 py-4 font-small text-gray-500">
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
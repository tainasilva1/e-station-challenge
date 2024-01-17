import { CONSUMPTION_LABELS } from '@/src/shared/constants';
import { IChartData, IConsumptionData } from '@/src/shared/types';
import { memo, useState } from 'react';
import { TiArrowUnsorted } from "react-icons/ti";
import ContentLoader from 'react-content-loader';

type Props = {
  data: IChartData[];
  onSorted: (sort: { key: keyof IConsumptionData, order: 'asc' | 'desc' }) => void;
}

const Table = ({ data, onSorted }: Props) => {
  const [sort, setSort] = useState<{ key: keyof IConsumptionData; order: 'asc' | 'desc' }>();

  const handleSorted = (key: keyof IConsumptionData) => {
    if (sort && sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
      onSorted({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ key, order: 'asc' });
      onSorted({ key, order: 'asc' })
    }
  };

  if (!data) return (
    <ContentLoader width={960} height={400}>
      <rect x="10" y="30" rx="4" ry="4" width="250" height="20" />
      <rect x="67" y="31" rx="10" ry="10" width="85" height="19" />
      <rect x="188" y="32" rx="10" ry="10" width="169" height="19" />
      <rect x="402" y="31" rx="10" ry="10" width="85" height="19" />
      <rect x="523" y="32" rx="10" ry="10" width="169" height="19" />
      <rect x="10" y="87" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="88" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="89" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="88" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="89" rx="10" ry="10" width="169" height="19" />
      <rect x="10" y="149" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="150" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="151" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="150" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="151" rx="10" ry="10" width="169" height="19" />
      <rect x="10" y="207" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="208" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="209" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="208" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="209" rx="10" ry="10" width="169" height="19" />
      <rect x="10" y="270" rx="4" ry="4" width="20" height="20" />
      <rect x="66" y="271" rx="10" ry="10" width="85" height="19" />
      <rect x="187" y="272" rx="10" ry="10" width="169" height="19" />
      <rect x="401" y="271" rx="10" ry="10" width="85" height="19" />
      <rect x="522" y="272" rx="10" ry="10" width="169" height="19" />
    </ContentLoader>
  )
  return (
    <div data-testid='table' className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="font-medium">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} scope="col" className="px-6 py-4 text-gray-500">
                      <button data-testid='sort-button' onClick={() => handleSorted(key as keyof IConsumptionData)} className='flex space-x-4 items-center'>
                        {CONSUMPTION_LABELS[key]}
                        <TiArrowUnsorted color='#9CA3AF' />
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
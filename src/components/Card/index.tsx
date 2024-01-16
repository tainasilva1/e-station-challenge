import { memo, ReactNode } from 'react'

type Props = {
  children: ReactNode;
}

const Card = ({ children }: Props) => (
  <div className="flex space-y-4 w-full flex-col bg-white border border-gray-200 rounded-lg shadow p-6">
    {children}
  </div>
)

export default memo(Card);
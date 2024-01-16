import { ChangeEvent, memo } from "react"

type Props = {
  options: {
    value: string | number;
    name: string | number ;
  }[];
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ options, value, onChange }: Props) => (
  <select onChange={onChange} value={value} className="bg-whit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 pr-4">
    {options.map((option, index) => (
      <option key={index} value={option.value}>{option.name}</option>
    ))}
  </select>
)

export default memo(Select);
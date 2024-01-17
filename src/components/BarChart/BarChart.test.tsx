import { KEYS_BY_LAST_WEEK, KEYS_BY_YEAR } from '@/src/shared/constants';
import { render } from '@testing-library/react'
import BarChart from '../BarChart';

const dataMock = [{"2021":100,"2022":100,"name":"Jan"},{"2021":93,"2022":96,"name":"Fev"},{"2021":110,"2022":106,"name":"Mar"},{"2021":106,"2022":97,"name":"Abr"},{"2021":91,"2022":110,"name":"Mai"},{"2021":95,"2022":112,"name":"Jun"},{"2021":91,"2022":109,"name":"Jul"},{"2021":91,"2022":97,"name":"Ago"},{"2021":107,"2022":107,"name":"Set"},{"2021":95,"2022":92,"name":"Out"},{"2021":114,"2022":103,"name":"Nov"},{"2021":105,"2022":97,"name":"Dez"}]
test('renders BarChart correctly', () => {
  const { container } = render(<BarChart data={dataMock} dataKey={KEYS_BY_YEAR} />)
  expect(container).toMatchSnapshot()
})
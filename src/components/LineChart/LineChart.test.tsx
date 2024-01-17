import { KEYS_BY_DATE } from '@/src/shared/constants';
import { render } from '@testing-library/react'
import LineChart from '../LineChart';

const dataMock = [{"name":1,"consumption":106,"maximum_flex":110,"minimum_flex":90,"flat_consumption":100},{"name":2,"consumption":92,"maximum_flex":110,"minimum_flex":90,"flat_consumption":100},{"name":3,"consumption":98,"maximum_flex":110,"minimum_flex":90,"flat_consumption":100},{"name":4,"consumption":95,"maximum_flex":110,"minimum_flex":90,"flat_consumption":100},{"name":5,"consumption":93,"maximum_flex":110,"minimum_flex":90,"flat_consumption":100}]
test('renders LineChart correctly', () => {
  const { container } = render(<LineChart data={dataMock} dataKey={KEYS_BY_DATE} />)
  expect(container).toMatchSnapshot()
})
import { KEYS_BY_LAST_WEEK } from '@/src/shared/constants';
import { render } from '@testing-library/react'
import AreaChart from '../AreaChart';

const dataMock = [{ "name": "24/12", "consumo": 98 }, { "name": "24/12", "consumo": 98 }, { "name": "24/12", "consumo": 101 }, { "name": "24/12", "consumo": 104 }, { "name": "24/12", "consumo": 93 }, { "name": "24/12", "consumo": 107 }, { "name": "24/12", "consumo": 97 }, { "name": "24/12", "consumo": 101 }, { "name": "24/12", "consumo": 91 }, { "name": "24/12", "consumo": 111 }, { "name": "24/12", "consumo": 97 }]
test('renders AreaChart correctly', () => {
  const { container } = render(<AreaChart data={dataMock} dataKey={KEYS_BY_LAST_WEEK} />)
  expect(container).toMatchSnapshot()
})
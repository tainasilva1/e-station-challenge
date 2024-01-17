import { render, screen, fireEvent } from '@testing-library/react'
import Table from '../Table';

const mockData = [{"agent":"E-STATION","meter":"STSTSTSTSTSTST","reference":"01/01/2021","hour":1,"consumption":91.178746,"origin":"COLETA DIÁRIA"},{"agent":"E-STATION","meter":"STSTSTSTSTSTST","reference":"01/01/2021","hour":2,"consumption":109.930235,"origin":"COLETA DIÁRIA"},{"agent":"E-STATION","meter":"STSTSTSTSTSTST","reference":"01/01/2021","hour":3,"consumption":114.07125,"origin":"COLETA DIÁRIA"},{"agent":"E-STATION","meter":"STSTSTSTSTSTST","reference":"01/01/2021","hour":4,"consumption":97.89187,"origin":"COLETA DIÁRIA"},{"agent":"E-STATION","meter":"STSTSTSTSTSTST","reference":"01/01/2021","hour":5,"consumption":96.384956,"origin":"COLETA DIÁRIA"}]
describe('Table', () => {
  test('Renders Date Picker', () => {
    render(<Table data={mockData} onSorted={jest.fn()} />)
    const element = screen.getByTestId('table')
    expect(element).toBeInTheDocument()
  })

  test('Call on sorted', () => {
    const mockOnSorted = jest.fn();
    render(<Table data={mockData} onSorted={mockOnSorted} />)
    const element = screen.getAllByTestId('sort-button')[0]
    fireEvent.click(element);
    expect(mockOnSorted).toHaveBeenCalled();
  })
})
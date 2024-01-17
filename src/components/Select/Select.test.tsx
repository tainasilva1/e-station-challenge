import { render, screen, fireEvent } from '@testing-library/react'
import Select from '../Select';

const mockOptions = [
  { value: 1, name: '1' },
  { value: 2, name: '2' },
  { value: 3, name: '3' },
  { value: 4, name: '4' },
  { value: 5, name: '5' },
]

const mockOnChange = jest.fn();
describe('Select', () => {
  test('Renders Select', () => {
    render(<Select options={mockOptions} onChange={mockOnChange} value={1} />)
    const element = screen.getByTestId('select')
    expect(element).toBeInTheDocument()
  })

  test('Shoul be call OnChange function', () => {
    render(<Select options={mockOptions} onChange={mockOnChange} value={1} />)
    const element = screen.getByTestId('select')
    fireEvent.select(element, mockOptions[0].name)
    expect(screen.getByText('1').selected).toBeTruthy();
  })
})
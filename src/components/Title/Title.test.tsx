import { render, screen } from '@testing-library/react'
import Title from '../Title';

describe('Title', () => {
  test('Renders Title', () => {
    render(<Title> Title Test </Title>)
    const element = screen.getByTestId('title')
    expect(element).toBeInTheDocument()
  })

  test('Should render correcty text', () => {
    render(<Title> Title Test </Title>)
    const element = screen.getByTestId('title')
    expect(element).toHaveTextContent('Title Test')
  })
})
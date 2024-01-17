import { render, screen } from '@testing-library/react'
import Card from '../Card';

describe('Card', () => {
  test('Renders Card', () => {
    render(<Card> Card Content </Card>)
    const element = screen.getByTestId('card')
    expect(element).toBeInTheDocument()
  })
})
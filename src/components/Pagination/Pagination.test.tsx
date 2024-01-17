import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination';

describe('Pagination', () => {
  test('Renders Pagination', () => {
    render(<Pagination totalPages={10} currentPage={1} setCurrentPage={jest.fn()} />)
    const element = screen.getByTestId('pagination')
    expect(element).toBeInTheDocument()
  })

  test('Should be previous button is disabled', () => {
    render(<Pagination totalPages={10} currentPage={1} setCurrentPage={jest.fn()} />)
    const element = screen.getByTestId('prev-button')
    expect(element).toBeDisabled();
  })

  test('Should be next button is disabled', () => {
    render(<Pagination totalPages={10} currentPage={10} setCurrentPage={jest.fn()} />)
    const element = screen.getByTestId('next-button')
    expect(element).toBeDisabled();
  })

  test('Should be set the current ', () => {
    const onClickPage = jest.fn();
    render(<Pagination totalPages={10} currentPage={1} setCurrentPage={onClickPage} />)
    const element = screen.getByTestId('next-button');
    fireEvent.click(element);
    expect(onClickPage).toHaveBeenCalled()
  })
})
import { memo } from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  const isLastPage = totalPages === currentPage;

  const btnClass = 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
  const btnDisabledClass = 'opacity-50 cursor-not-allowed'

  return (
    <div data-testid='pagination' className='inline-flex space-x-2'>
      <button 
        data-testid='prev-button'
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)} 
        className={`${btnClass} ${currentPage === 1 ? btnDisabledClass : ''}`}
      >
        Anterior
      </button>
      <button 
        data-testid='next-button'
        disabled={isLastPage}
        onClick={() => setCurrentPage(currentPage + 1)} 
        className={`${btnClass} ${isLastPage ? btnDisabledClass : ''}`}
      >
        Proximo
      </button>
    </div>
  );
};

export default memo(Pagination);
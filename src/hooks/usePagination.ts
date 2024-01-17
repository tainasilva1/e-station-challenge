import { useEffect, useState } from "react";
import { IConsumptionData } from "../shared/types";

export const usePagination = (data: IConsumptionData[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentItens, setCurrentItens] = useState<IConsumptionData[]>();
  
  const totalItens = data?.length;
  const totalShowItens = itensPerPage * currentPage;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItens / itensPerPage); i++) pages.push(i);
  const totalPages = pages.length;

  useEffect(() => {
    
    if (!data.length) return;
    const lastItemIndex = currentPage * itensPerPage;
    const firstItemIndex = lastItemIndex - itensPerPage;
    const current = data.slice(firstItemIndex, lastItemIndex);
    setCurrentItens(current);
  }, [currentPage, data, itensPerPage, setCurrentPage])

  return {
    totalItens,
    totalShowItens,
    itensPerPage,
    currentPage,
    currentItens,
    totalPages,
    setItensPerPage,
    setCurrentPage
  }
}
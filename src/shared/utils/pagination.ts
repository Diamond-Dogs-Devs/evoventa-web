import { useState } from 'react';

export const usePagination = (size?: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(size || 15);

  const onPaginationChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };

  return {
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    onPaginationChange,
  };
};

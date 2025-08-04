import { useState } from "react";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface UsePaginationReturn {
  page: number;
  limit: number;
  offset: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  canGoToNextPage: boolean;
  canGoToPreviousPage: boolean;
}

export const usePagination = (options: UsePaginationOptions = {}): UsePaginationReturn => {
  const { initialPage = 1, initialLimit = 10 } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimitState] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  const goToPage = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const goToNextPage = (): void => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPreviousPage = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const setLimit = (newLimit: number): void => {
    setLimitState(newLimit);
    // Reset to first page when limit changes
    setPage(1);
  };

  const canGoToNextPage = page < totalPages;
  const canGoToPreviousPage = page > 1;

  return {
    page,
    limit,
    offset,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setLimit,
    setTotal,
    canGoToNextPage,
    canGoToPreviousPage,
  };
};

export default usePagination;

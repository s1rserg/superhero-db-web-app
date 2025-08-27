import { useSearchParams } from 'react-router-dom';

export function usePagination(totalItems: number, defaultPage = 1, defaultPerPage = 10) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || defaultPage;
  const perPage = Number(searchParams.get('perPage')) || defaultPerPage;

  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const setPage = (newPage: number) => {
    const clampedPage = Math.min(Math.max(newPage, 1), totalPages);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(clampedPage));
    setSearchParams(newParams);
  };

  const setPerPage = (newPerPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('perPage', String(newPerPage));
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const nextPage = () => setPage(currentPage + 1);
  const prevPage = () => setPage(currentPage - 1);

  const reset = () => {
    const newParams = new URLSearchParams();
    newParams.set('page', String(defaultPage));
    newParams.set('perPage', String(defaultPerPage));
    setSearchParams(newParams);
  };

  return { page: currentPage, perPage, totalPages, setPage, setPerPage, nextPage, prevPage, reset };
}

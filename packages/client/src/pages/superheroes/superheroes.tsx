import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { PageLayout } from '~/components/components';
import { useAppDispatch, useAppSelector, usePagination } from '~/hooks/hooks';
import { actions } from '~/store/superheroes/superheroes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './styles.module.css';
import { Pagination } from '~/components/pagination/pagination';

export const Superheroes: React.FC = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { superheroes, totalAmount, status, createStatus } = useAppSelector((state) => state.superheroesReducer);

  const { page, perPage, nextPage, prevPage, setPerPage, setPage, totalPages } = usePagination(totalAmount, 1, 10);

  useEffect(() => {
    void dispatch(
      actions.getAll({
        page,
        perPage,
      })
    );
  }, []);

  return (
    <PageLayout isLoading={status === DataStatus.PENDING}>
      <div>Superheroes</div>
      {superheroes.map((s) => (
        <div>{s.nickname}</div>
      ))}
      <Pagination
        page={page}
        perPage={perPage}
        nextPage={nextPage}
        prevPage={prevPage}
        setPage={setPage}
        setPerPage={setPerPage}
        totalPages={totalPages}
      />
    </PageLayout>
  );
};

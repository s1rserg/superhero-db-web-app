import { useCallback, useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { PageLayout } from '~/components/components';
import { useAppDispatch, useAppSelector, usePagination, useAppForm, useSearchParam } from '~/hooks/hooks';
import { actions } from '~/store/superheroes/superheroes';
import styles from './styles.module.css';
import { Pagination } from '~/components/pagination/pagination';
import { Search } from '~/components/search/search';

type SearchForm = {
  search: string;
};

export const Superheroes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { superheroes, totalAmount, status } = useAppSelector((state) => state.superheroesReducer);

  const { page, perPage, totalPages, setPage, setPerPage, nextPage, prevPage } = usePagination(totalAmount, 1, 10);
  const [searchParam, setSearchParam] = useSearchParam('search', '');

  const { control, errors } = useAppForm<SearchForm>({
    defaultValues: { search: searchParam },
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchParam(value);
    },
    [setSearchParam]
  );

  useEffect(() => {
    void dispatch(
      actions.getAll({
        page,
        perPage,
        name: searchParam,
      })
    );
  }, [dispatch, page, perPage, searchParam]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLoading = status === DataStatus.PENDING;

  return (
    <PageLayout>
      <div className={styles.header}>
        <Search<SearchForm>
          control={control}
          errors={errors}
          isLabelHidden
          label="Search"
          name="search"
          placeholder="Enter a nickname of a superhero..."
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.list}>
        {superheroes.map((s) => (
          <div key={s.id}>{s.nickname}</div>
        ))}
      </div>

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

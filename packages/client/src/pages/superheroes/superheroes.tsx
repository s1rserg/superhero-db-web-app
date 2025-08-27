import { useCallback, useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { Button, Loader, Modal, PageLayout } from '~/components/components';
import { useAppDispatch, useAppSelector, usePagination, useAppForm, useSearchParam, useModal } from '~/hooks/hooks';
import { actions } from '~/store/superheroes/superheroes';
import styles from './styles.module.css';
import { Pagination } from '~/components/pagination/pagination';
import { Search } from '~/components/search/search';
import SuperheroCard from './components/superhero-card/superhero-card';
import { SuperheroCreateRequestDTO } from '~/common/types/types';
import { SuperheroCreateForm } from './components/superhero-create-form/superhero-create-form';

type SearchForm = {
  search: string;
};

export const Superheroes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { superheroes, totalAmount, status, createStatus } = useAppSelector((state) => state.superheroesReducer);

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

  const isLoading = status === DataStatus.PENDING;

  const handleSuperheroCreateSubmit = useCallback(
    (payload: SuperheroCreateRequestDTO) => {
      void dispatch(actions.create(payload));
    },
    [dispatch]
  );

  const { isOpened: isCreateModalOpen, onClose: handleCreateModalClose, onOpen: handleCreateModalOpen } = useModal();

  useEffect(() => {
    if (createStatus === DataStatus.SUCCESS) {
      handleCreateModalClose();
    }
  }, [handleCreateModalClose, createStatus]);

  return (
    <PageLayout>
      <div className={styles.top}>
        <Search<SearchForm>
          control={control}
          errors={errors}
          isLabelHidden
          label="Search"
          name="search"
          placeholder="Enter a nickname of a superhero..."
          onChange={handleSearchChange}
        />
        <div>
          <Button label="Create New" onClick={handleCreateModalOpen} />
        </div>
      </div>

      <div className={styles.grid}>
        {superheroes.map((hero) => (
          <SuperheroCard key={hero.id} hero={hero} />
        ))}
      </div>

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <Pagination
          page={page}
          perPage={perPage}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
          setPerPage={setPerPage}
          totalPages={totalPages}
        />
      )}

      <Modal isOpened={isCreateModalOpen} onClose={handleCreateModalClose} title="Create new workout">
        <SuperheroCreateForm onSubmit={handleSuperheroCreateSubmit} />
      </Modal>
    </PageLayout>
  );
};

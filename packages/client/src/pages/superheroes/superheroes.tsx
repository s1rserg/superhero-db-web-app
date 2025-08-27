import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { PageLayout } from '~/components/components';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { actions } from '~/store/superheroes/superheroes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './styles.module.css';

export const Superheroes: React.FC = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { superheroes, status, createStatus } = useAppSelector((state) => state.superheroesReducer);

  useEffect(() => {
    void dispatch(actions.getAll({}));
  }, []);

  return (
    <PageLayout isLoading={status === DataStatus.PENDING}>
      <div>Superheroes</div>
      {superheroes.map((s) => (
        <div>{s.nickname}</div>
      ))}
    </PageLayout>
  );
};

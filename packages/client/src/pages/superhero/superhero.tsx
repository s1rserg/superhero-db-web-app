import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector, useModal } from '~/hooks/hooks';
import { actions } from '~/store/superheroes/superheroes';
import { DataStatus } from '~/common/enums/enums';
import { ConfirmationModal, IconButton, Loader, Modal, PageLayout } from '~/components/components';
import { useNavigate, useParams } from 'react-router-dom';
import { SuperheroUpdateRequestDTO } from '~/common/types/types';
import { SuperheroUpdateForm } from './components/superhero-update-form/superhero-update-form';

const Superhero: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    superhero: hero,
    superheroStatus,
    updateStatus,
    deleteStatus,
  } = useAppSelector((state) => state.superheroesReducer);

  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      void dispatch(actions.getById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (hero?.images?.length) {
      setMainImage(hero.images[0]);
    }
  }, [hero]);

  const { isOpened: isUpdateModalOpen, onClose: handleUpdateModalClose, onOpen: handleUpdateModalOpen } = useModal();

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleUpdateModalClose();
    }
  }, [handleUpdateModalClose, updateStatus]);

  const { isOpened, onClose, onOpen } = useModal();

  const handleDeleteClick = useCallback((): void => {
    onOpen();
  }, [onOpen]);

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteStatus === DataStatus.SUCCESS) {
      navigate('/');
    }
    dispatch(actions.resetDeleteStatus());
  }, [deleteStatus, navigate]);

  const handleSuperheroUpdateSubmit = useCallback(
    (payload: SuperheroUpdateRequestDTO) => {
      if (!hero?.id) return;
      void dispatch(actions.update({ id: hero.id, data: payload }));
    },
    [dispatch, hero]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (!hero?.id) return;
    void dispatch(actions.deleteById(hero.id));
  }, [dispatch, hero]);

  if (superheroStatus === DataStatus.PENDING || !hero) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles['superhero-page']}>
        <div className={styles['superhero-page__header']}>
          <div>
            <h1 className={styles['superhero-page__nickname']}>{hero.nickname}</h1>
            <p className={styles['superhero-page__real-name']}>{hero.realName}</p>
          </div>
          <div className={styles['superhero-page__icons']}>
            {hero.images[0] && (
              <img src={hero.images[0]} alt={hero.nickname} className={styles['superhero-page__small-image']} />
            )}
            <div>
              <IconButton iconName="pencil" label="Edit superhero" onClick={handleUpdateModalOpen} />
              <IconButton iconName="trashBin" label="Delete superhero" onClick={handleDeleteClick} />
            </div>
          </div>
        </div>

        <div className={styles['superhero-page__content']}>
          <div className={styles['superhero-page__gallery']}>
            {mainImage && (
              <div className={styles['superhero-page__main-image-wrapper']}>
                <img src={mainImage} alt="Main" className={styles['superhero-page__main-image']} />
              </div>
            )}

            <div className={styles['superhero-page__thumbnails']}>
              {hero.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`${styles['superhero-page__thumbnail']} ${
                    img === mainImage ? styles['superhero-page__thumbnail--active'] : ''
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className={styles['superhero-page__details']}>
            <h2 className={styles['superhero-page__section-title']}>Origin Story</h2>
            <p>{hero.originDescription}</p>

            <h2 className={styles['superhero-page__section-title']}>Superpowers</h2>
            <ul>
              {hero.superpowers.split(',').map((power, i) => (
                <li key={i}>{power.trim()}</li>
              ))}
            </ul>

            <h2 className={styles['superhero-page__section-title']}>Catchphrase</h2>
            <blockquote className={styles['superhero-page__catchphrase']}>"{hero.catchPhrase}"</blockquote>

            <div className={styles['superhero-page__meta']}>
              <p>
                <b>ID:</b> {hero.id}
              </p>
              <p>
                <b>Created at:</b> {new Date(hero.createdAt).toLocaleDateString()}
              </p>
              <p>
                <b>Last updated at:</b> {new Date(hero.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpened={isUpdateModalOpen} onClose={handleUpdateModalClose} title="Update superhero">
        <SuperheroUpdateForm superhero={hero} onSubmit={handleSuperheroUpdateSubmit} />
      </Modal>
      <ConfirmationModal
        content="This superhero will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
        isOpened={isOpened}
        onClose={onClose}
        onConfirm={handleDeleteConfirm}
      />
    </PageLayout>
  );
};

export { Superhero };

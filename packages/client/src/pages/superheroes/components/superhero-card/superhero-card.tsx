import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { SuperheroDTO } from '~/common/types/types';
import { AppPath } from '~/common/enums/enums';

type Props = {
  hero: SuperheroDTO;
};

const SuperheroCard: React.FC<Props> = ({ hero }) => {
  return (
    <Link to={`${AppPath.SUPERHEROES}/${hero.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={hero.images[0]} alt={hero.nickname} className={styles.image} />
      </div>
      <h3 className={styles.nickname}>{hero.nickname}</h3>
    </Link>
  );
};

export default SuperheroCard;

import styles from './styles.module.css';

type Properties = {
  page: number;
  perPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

const PER_PAGE_OPTIONS = [5, 10, 25, 50];

const Pagination = ({ page, perPage, totalPages, setPage, setPerPage, nextPage, prevPage }: Properties) => {
  return (
    <div className={styles['pagination']}>
      <div className={styles['pagination__controls']}>
        <button className={styles['pagination__button']} onClick={() => setPage(1)} disabled={page === 1}>
          {'<<'}
        </button>
        <button className={styles['pagination__button']} onClick={prevPage} disabled={page === 1}>
          {'<'}
        </button>
        <span className={styles['pagination__info']}>{`Page ${page} of ${totalPages}`}</span>
        <button className={styles['pagination__button']} onClick={nextPage} disabled={page === totalPages}>
          {'>'}
        </button>
        <button
          className={styles['pagination__button']}
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          {'>>'}
        </button>
      </div>

      <div className={styles['pagination__per-page']}>
        <label className={styles['pagination__label']}>
          <span className={styles['pagination__label-text']}>Items per page</span>
          <select
            className={styles['pagination__select']}
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            {PER_PAGE_OPTIONS.map((option) => (
              <option className={styles['pagination__option']} key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export { Pagination };

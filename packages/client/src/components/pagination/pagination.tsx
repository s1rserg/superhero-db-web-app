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

export const Pagination = ({ page, perPage, totalPages, setPage, setPerPage, nextPage, prevPage }: Properties) => {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <button className={styles.button} onClick={() => setPage(1)} disabled={page === 1}>
          {'<<'}
        </button>
        <button className={styles.button} onClick={prevPage} disabled={page === 1}>
          {'<'}
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button className={styles.button} onClick={nextPage} disabled={page === totalPages}>
          {'>'}
        </button>
        <button className={styles.button} onClick={() => setPage(totalPages)} disabled={page === totalPages}>
          {'>>'}
        </button>
      </div>
      <div className={styles.right}>
        <label className={styles.label}>
          <span className={styles['label-text']}>Items per page</span>
          <select className={styles.control} value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
            {PER_PAGE_OPTIONS.map((option) => (
              <option className={styles.option} key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

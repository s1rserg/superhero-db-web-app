import { getValidClassNames } from '~/helpers/helpers';
import styles from './styles.module.css';

type Properties = {
  label: string;
  onClick?: () => void;
  variant?: 'danger' | 'default';
};

const Button = ({ label, onClick, variant = 'default' }: Properties) => {
  const buttonClassName = getValidClassNames(styles['button'], styles[`button-${variant}`]);

  return (
    <button className={buttonClassName} onClick={onClick} type="submit">
      {label}
    </button>
  );
};

export { Button };

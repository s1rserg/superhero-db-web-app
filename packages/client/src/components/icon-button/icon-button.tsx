import { IconName } from '~/common/types/types.js';
import styles from './styles.module.css';
import { Icon } from '../components.js';

type Properties = {
  iconName: IconName;
  label: string;
  onClick: () => void;
};

const IconButton = ({ iconName, label, onClick }: Properties) => {
  return (
    <button aria-label={label} className={styles['icon-button']} onClick={onClick} type="button">
      <Icon height={20} name={iconName} width={20} />
    </button>
  );
};

export { IconButton };

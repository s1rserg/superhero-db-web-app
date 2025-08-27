import { IconName } from '~/common/types/types.js';
import { iconNameToSvg } from './libs/maps/maps.js';
import styles from './styles.module.css';

type Properties = {
  height: number;
  name: IconName;
  width: number;
};

const Icon = ({ height, name, width }: Properties) => {
  const SvgComponent = iconNameToSvg[name];

  return <SvgComponent className={styles['icon']} height={height} width={width} />;
};

export { Icon };

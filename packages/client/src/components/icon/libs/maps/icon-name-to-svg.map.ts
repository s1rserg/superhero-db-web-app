import { FC, SVGProps } from 'react';
import Cross from '~/assets/images/icons/cross.svg?react';
import Pencil from '~/assets/images/icons/pencil.svg?react';
import Search from '~/assets/images/icons/search.svg?react';
import TrashBin from '~/assets/images/icons/trash-bin.svg?react';
import { IconName } from '~/common/types/types';

const iconNameToSvg: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  cross: Cross,
  pencil: Pencil,
  search: Search,
  trashBin: TrashBin,
};

export { iconNameToSvg };

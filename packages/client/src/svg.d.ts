// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />

declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

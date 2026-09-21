import type { PropType } from 'vue';
import type { ArrowLevel } from './types';

export const arrowSvgProps = {
  level: { type: String as PropType<ArrowLevel | null>, required: true },
  size: { type: String as PropType<'sm' | 'base' | 'lg' | 'xl' | 'xxl' | 'xxxl'>, default: 'base' },
  customClass: { type: String, default: '' },
};

import type { PriceDiffDirection } from '../utils/priceDiff';

const STYLES = {
  below: {
    bg: 'bg-[#3a7bd5]/[0.12]',
    fill: '#3A7BD5',
  },
  above: {
    bg: 'bg-[#fb2c36]/[0.12]',
    fill: '#FB2C36',
  },
} as const;

type PriceDiffBadgeProps = {
  amount: string;
  direction: PriceDiffDirection;
  className?: string;
  as?: 'span' | 'div';
};

function PriceDiffIcon({ direction, fill }: { direction: PriceDiffDirection; fill: string }) {
  return (
    <svg
      width={12}
      height={11}
      viewBox="0 0 12 11"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M6.63067 9.75C6.24577 10.4167 5.28352 10.4167 4.89862 9.75L0.135483 1.5C-0.249417 0.833333 0.231708 0 1.00151 0L10.5278 0C11.2976 0 11.7787 0.833333 11.3938 1.5L6.63067 9.75Z"
        fill={fill}
        transform={direction === 'above' ? 'rotate(180 6 5.5)' : undefined}
      />
    </svg>
  );
}

export default function PriceDiffBadge({
  amount,
  direction,
  className = '',
  as: Component = 'div',
}: PriceDiffBadgeProps) {
  const styles = STYLES[direction];

  return (
    <Component
      className={`flex shrink-0 items-center gap-1 rounded px-1 ${styles.bg} ${className}`.trim()}
    >
      <PriceDiffIcon direction={direction} fill={styles.fill} />
      <span className="text-[13px] text-[#665a55]">{amount}</span>
    </Component>
  );
}

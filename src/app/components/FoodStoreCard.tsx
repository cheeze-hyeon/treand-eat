import PriceDiffBadge from './PriceDiffBadge';
import type { FoodStore } from '../data/foods';
import { STORES } from '../data/stores';
import {
  formatPriceDiffAmount,
  getPriceDiffFromAverage,
  parsePriceNumber,
  type PriceDiff,
} from '../utils/priceDiff';

function formatKrwPrice(price: string) {
  const num = Number.parseInt(price.replace(/\D/g, ''), 10);
  if (Number.isNaN(num)) return price;
  return `${num.toLocaleString('ko-KR')}원`;
}

function MetaDot() {
  return (
    <svg width={2} height={2} viewBox="0 0 2 2" fill="none" className="shrink-0" aria-hidden>
      <circle cx={1} cy={1} r={1} fill="#665A55" />
    </svg>
  );
}

function StoreLocationPin({ location, clipId }: { location: string; clipId: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <svg
        width={15}
        height={14}
        viewBox="0 0 15 14"
        fill="none"
        className="h-3.5 w-[15px] shrink-0"
        aria-hidden
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M12.5 5.83268C12.5 8.74527 9.03812 11.7786 7.87562 12.7154C7.76733 12.7914 7.6355 12.8325 7.5 12.8325C7.3645 12.8325 7.23267 12.7914 7.12438 12.7154C5.96188 11.7786 2.5 8.74527 2.5 5.83268C2.5 4.59501 3.02678 3.40802 3.96447 2.53285C4.90215 1.65768 6.17392 1.16602 7.5 1.16602C8.82608 1.16602 10.0979 1.65768 11.0355 2.53285C11.9732 3.40802 12.5 4.59501 12.5 5.83268Z"
            stroke="#FF8C42"
            strokeWidth={0.998958}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 7.58398C8.53553 7.58398 9.375 6.80048 9.375 5.83398C9.375 4.86749 8.53553 4.08398 7.5 4.08398C6.46447 4.08398 5.625 4.86749 5.625 5.83398C5.625 6.80048 6.46447 7.58398 7.5 7.58398Z"
            stroke="#FF8C42"
            strokeWidth={0.998958}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width={15} height={14} fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className="text-[13px] text-[#ff8c42]">{location}</p>
    </div>
  );
}

export function getStoreListing(store: FoodStore, avgPriceAmount: string) {
  const detail = STORES[store.storeId];
  const price = store.listPrice
    ? formatKrwPrice(store.listPrice)
    : detail
      ? formatKrwPrice(detail.price)
      : '1,500원';
  let priceDiff: { direction: PriceDiff['direction']; amount: string } | null = null;
  if (store.priceDiff) {
    priceDiff = {
      direction: 'below',
      amount: formatKrwPrice(store.priceDiff),
    };
  } else if (detail) {
    const avgNum = parsePriceNumber(avgPriceAmount);
    const diff = avgNum != null ? getPriceDiffFromAverage(detail.price, avgNum) : null;
    if (diff) {
      priceDiff = {
        direction: diff.direction,
        amount: formatPriceDiffAmount(diff.amount),
      };
    }
  }

  return {
    name: store.name,
    rank: store.rank,
    waitingTime: detail?.waitingTime ?? '15분',
    reviewCount: detail?.reviewCount ?? 404,
    price,
    priceDiff,
    location: detail?.location ?? '서울 마포구',
  };
}

type FoodStoreCardProps = {
  rank: number;
  name: string;
  waitingTime: string;
  reviewCount: number;
  price: string;
  priceDiff: { direction: PriceDiff['direction']; amount: string } | null;
  location: string;
  clipId: string;
  fullWidth?: boolean;
  onClick: () => void;
};

export default function FoodStoreCard({
  rank,
  name,
  waitingTime,
  reviewCount,
  price,
  priceDiff,
  location,
  clipId,
  fullWidth = false,
  onClick,
}: FoodStoreCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-[5px] rounded-2xl border-2 border-[#2e211c] bg-white p-[17.09px] text-left transition-colors hover:bg-[#f9f9f9] ${
        fullWidth ? 'w-full min-w-0' : 'w-[294px] shrink-0'
      }`}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center gap-[9px]">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[20px] bg-[#c06226] px-[7px] py-0.5">
            <p className="text-xl text-white">{rank}</p>
          </div>
          <p className="min-w-0 flex-1 text-xl text-[#2e211c]">{name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="shrink-0 text-[13px] text-[#665a55]">평균 웨이팅 {waitingTime}</p>
          <MetaDot />
          <p className="shrink-0 text-[13px] text-[#665a55]">
            리뷰 {reviewCount.toLocaleString('ko-KR')}
          </p>
          <MetaDot />
          <p className="shrink-0 text-[13px] text-[#665a55]">{price}</p>
          {priceDiff ? (
            <PriceDiffBadge direction={priceDiff.direction} amount={priceDiff.amount} />
          ) : null}
        </div>
        <StoreLocationPin location={location} clipId={clipId} />
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[130px] min-w-0 w-full rounded-[10px] border-2 border-[#2e211c] bg-[#f7f4f0]"
          />
        ))}
      </div>
    </button>
  );
}

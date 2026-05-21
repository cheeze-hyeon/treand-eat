import { useState } from 'react';
import type { MapMetricMode, MapStore } from '../../data/mapStores';

type MapStoreListItemProps = {
  store: MapStore;
  metricMode: MapMetricMode;
  isSelected?: boolean;
  onSelect: () => void;
};

function BookmarkIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width={18} height={22} viewBox="0 0 18 22" fill="none" aria-hidden>
      <path
        d="M15.9168 20.084L8.62516 15.9173L1.3335 20.084V3.41732C1.3335 2.86478 1.55299 2.33488 1.94369 1.94418C2.33439 1.55348 2.8643 1.33398 3.41683 1.33398H13.8335C14.386 1.33398 14.9159 1.55348 15.3066 1.94418C15.6973 2.33488 15.9168 2.86478 15.9168 3.41732V20.084Z"
        stroke="#2E211C"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? '#2E211C' : 'none'}
      />
    </svg>
  );
}

function PriceDropBadge({ amount }: { amount: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-[#3a7bd5]/[0.12] px-1">
      <svg width={12} height={11} viewBox="0 0 12 11" fill="none" aria-hidden>
        <path
          d="M6.63067 9.75C6.24577 10.4167 5.28352 10.4167 4.89862 9.75L0.135483 1.5C-0.249417 0.833333 0.231708 0 1.00151 0L10.5278 0C11.2976 0 11.7787 0.833333 11.3938 1.5L6.63067 9.75Z"
          fill="#3A7BD5"
        />
      </svg>
      <span className="text-[13px] text-[#665a55]">{amount.toLocaleString()}원</span>
    </span>
  );
}

export default function MapStoreListItem({
  store,
  metricMode,
  isSelected,
  onSelect,
}: MapStoreListItemProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const title = `${store.name} ${store.highlightMenu}`;
  const metricLabel =
    metricMode === 'preference'
      ? `취향 일치도 ${store.preferenceMatch}%`
      : `트렌딜리셔스 ${store.trendScore}점`;

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onSelect}
        className="w-full text-left"
        aria-label={`${store.name} 상세 보기`}
      >
        <div
          className={`flex items-stretch overflow-hidden rounded-[14px] bg-white border-2 ${
            isSelected ? 'border-[#2e211c]' : 'border-[#335352]'
          }`}
          style={{ boxShadow: '0px 4px 4px 0 #9cb8b7' }}
        >
          <div className="w-[84px] shrink-0 self-stretch bg-[#f7f4f0]" aria-hidden />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 px-[11px] py-2.5">
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex min-w-0 flex-col">
                <div className="flex justify-between items-center relative">

                <p className="truncate pr-1 text-base font-medium text-[#1c1c1e]">{title}</p>
                <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsBookmarked((prev) => !prev);
        }}
        aria-label={isBookmarked ? '북마크 해제' : '북마크 저장'}
        className="z-10 p-1"
      >
        <BookmarkIcon filled={isBookmarked} />
      </button>
      </div>

                <div className="flex items-center gap-2 text-[13px] text-[#665a55]">
                  <span className="whitespace-nowrap">평균 웨이팅 {store.waitingMinutes}분</span>
                  <span className="h-[2px] w-[2px] shrink-0 rounded-full bg-[#665A55]" aria-hidden />
                  <span className="whitespace-nowrap">리뷰 {store.reviewCount}</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#665a55]">
                  <span className="whitespace-nowrap">{store.price.toLocaleString()}원</span>
                  {store.priceDrop != null && <PriceDropBadge amount={store.priceDrop} />}
                </div>
              </div>
              <div className="flex justify-end pt-[3px]">
                <div className="flex h-6 items-center justify-center rounded-lg bg-[#9cb8b7] px-2.5">
                  <p className="whitespace-nowrap text-xs text-[#2e211c]">{metricLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>

    </div>
  );
}

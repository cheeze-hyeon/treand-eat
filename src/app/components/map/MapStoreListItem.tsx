import type { MapMetricMode, MapStore } from '../../data/mapStores';

type MapStoreListItemProps = {
  store: MapStore;
  metricMode: MapMetricMode;
  isSelected?: boolean;
  onSelect: () => void;
};

export default function MapStoreListItem({
  store,
  metricMode,
  isSelected,
  onSelect,
}: MapStoreListItemProps) {
  const title = `${store.name} ${store.highlightMenu}`;
  const metricLabel =
    metricMode === 'preference'
      ? `취향 일치도 ${store.preferenceMatch}%`
      : `트렌딜리셔스 ${store.trendScore}점`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left"
      aria-label={`${store.name} 상세 보기`}
    >
      <div
        className={`flex min-h-[107px] overflow-hidden rounded-[14px] bg-white border-2 ${
          isSelected ? 'border-[#2e211c]' : 'border-[#335352]'
        }`}
        style={{ boxShadow: '0px 4px 4px 0 #9cb8b7' }}
      >
        <div className="w-[84px] self-stretch bg-[#f7f4f0] flex-shrink-0" />
        <div className="flex flex-1 flex-col justify-between gap-2 min-w-0 px-[11px] py-2.5">
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-base text-[#1c1c1e] truncate">{title}</p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#665a55]">
              <span className="whitespace-nowrap">평균 웨이팅 {store.waitingMinutes}분</span>
              <span className="w-[2px] h-[2px] rounded-full bg-[#665A55]" aria-hidden />
              <span className="whitespace-nowrap">리뷰 {store.reviewCount}</span>
              <span className="w-[2px] h-[2px] rounded-full bg-[#665A55]" aria-hidden />
              <span className="whitespace-nowrap">{store.price.toLocaleString()}원</span>
              {store.priceDrop != null && (
                <span className="flex items-center gap-1 whitespace-nowrap rounded bg-[#3a7bd5]/[0.12] px-1">
                  <svg width={12} height={11} viewBox="0 0 12 11" fill="none" aria-hidden>
                    <path
                      d="M6.63067 9.75C6.24577 10.4167 5.28352 10.4167 4.89862 9.75L0.135483 1.5C-0.249417 0.833333 0.231708 0 1.00151 0L10.5278 0C11.2976 0 11.7787 0.833333 11.3938 1.5L6.63067 9.75Z"
                      fill="#3A7BD5"
                    />
                  </svg>
                  <span>{store.priceDrop.toLocaleString()}원</span>
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end shrink-0">
            <div className="h-6 max-w-full rounded-lg bg-[#9cb8b7] px-2 flex items-center justify-center">
              <p className="text-xs text-[#2e211c] whitespace-nowrap">{metricLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

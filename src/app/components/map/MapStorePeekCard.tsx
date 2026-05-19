import type { MapStore } from '../../data/mapStores';

type MapStorePeekCardProps = {
  store: MapStore;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onExpand: () => void;
};

export default function MapStorePeekCard({
  store,
  isBookmarked,
  onBookmarkToggle,
  onExpand,
}: MapStorePeekCardProps) {
  const title = `${store.name} ${store.highlightMenu}`;

  return (
    <div className="relative w-full px-[23px]">
      <button
        type="button"
        onClick={onExpand}
        className="w-full text-left"
        aria-label={`${store.name} 상세 보기`}
      >
        <div
          className="flex h-[107px] overflow-hidden rounded-[14px] bg-white border-2 border-[#335352]"
          style={{ boxShadow: '0px 4px 4px 0 #9cb8b7' }}
        >
          <div className="w-[84px] h-full bg-[#f7f4f0] flex-shrink-0" />
          <div className="flex flex-col flex-1 min-w-0 gap-0.5 px-[11px] py-2.5 pr-8">
            <div className="flex flex-col justify-between h-[85px]">
              <div className="flex flex-col gap-2 min-w-0">
                <p className="text-base text-[#1c1c1e] truncate">{title}</p>
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#665a55]">
                  <span>평균 웨이팅 {store.waitingMinutes}분</span>
                  <span className="w-[2px] h-[2px] rounded-full bg-[#665A55]" aria-hidden />
                  <span>리뷰 {store.reviewCount}</span>
                  <span>{store.price.toLocaleString()}원</span>
                  {store.priceDrop != null && (
                    <span className="flex items-center gap-1 rounded bg-[#3a7bd5]/[0.12] px-1">
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
              <div className="flex justify-end pt-[3px]">
                <div className="w-[100px] h-6 rounded-lg bg-[#9cb8b7] flex items-center justify-center">
                  <p className="text-xs text-[#2e211c]">취향 일치도 {store.preferenceMatch}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle();
        }}
        aria-label={isBookmarked ? '북마크 해제' : '북마크 저장'}
        className="absolute top-[18px] right-[41px] p-1 z-10"
      >
        <svg width={18} height={22} viewBox="0 0 18 22" fill="none" aria-hidden>
          <path
            d="M15.9168 20.083L8.62516 15.9163L1.3335 20.083V3.41634C1.3335 2.86381 1.55299 2.3339 1.94369 1.9432C2.33439 1.5525 2.8643 1.33301 3.41683 1.33301H13.8335C14.386 1.33301 14.9159 1.5525 15.3066 1.9432C15.6973 2.3339 15.9168 2.86381 15.9168 3.41634V20.083Z"
            stroke="#2E211C"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isBookmarked ? '#2E211C' : 'none'}
          />
        </svg>
      </button>
    </div>
  );
}

import { useNavigate } from 'react-router';
import svgPaths from '../../imports/매장별페이지-1/svg-rwqfjwbxb';
import { getFoodIdByMenuName } from '../data/foods';

type StoreSummaryHeaderProps = {
  name: string;
  price: string;
  priceUnit: string;
  waitingTime: string;
  reviewCount: number;
  location: string;
  menuName: string;
  priceChange?: string;
  showWriteReview?: boolean;
  storeId?: string;
  className?: string;
};

function PriceChangeBadge({ amount }: { amount: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded bg-[#3a7bd5]/[0.12] px-1">
      <svg width={12} height={11} viewBox="0 0 12 11" fill="none" className="shrink-0" aria-hidden>
        <path
          d="M6.63067 9.75C6.24577 10.4167 5.28352 10.4167 4.89862 9.75L0.135483 1.5C-0.249417 0.833333 0.231708 0 1.00151 0L10.5278 0C11.2976 0 11.7787 0.833333 11.3938 1.5L6.63067 9.75Z"
          fill="#3A7BD5"
        />
      </svg>
      <p className="text-[13px] text-[#665a55]">{amount}</p>
    </div>
  );
}

export default function StoreSummaryHeader({
  name,
  price,
  priceUnit,
  waitingTime,
  reviewCount,
  location,
  menuName,
  priceChange,
  showWriteReview = true,
  storeId,
  className = '',
}: StoreSummaryHeaderProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full border-b border-[#e5e5e5] px-6 pb-4 ${className}`.trim()}
    >
      <div className="mb-1 flex items-center justify-between">
        <p className="text-[20px] font-bold text-[#2e211c]">{name}</p>
        <div className="flex items-baseline gap-1">
          <p className="text-[20px] font-bold text-[#2e211c]">{price}</p>
          <p className="text-[13px] text-[#9e9794]">{priceUnit}</p>
        </div>
      </div>

      <div className="mb-2">
        <button
          type="button"
          onClick={() => {
            const foodId = getFoodIdByMenuName(menuName);
            if (foodId) navigate(`/food/${foodId}`);
          }}
          className="inline-block rounded-[8px] bg-[#2e211c] px-[10px] py-[3px] transition-opacity hover:opacity-80"
        >
          <p className="text-[13px] font-bold text-white">{menuName}</p>
        </button>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <p className="text-[13px] text-[#665a55]">평균 웨이팅 {waitingTime}</p>
        <div className="size-[2px] shrink-0 rounded-full bg-[#404040]" />
        <p className="text-[13px] text-[#665a55]">리뷰 {reviewCount}</p>
        {priceChange ? <PriceChangeBadge amount={priceChange} /> : null}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-[14px] w-[15px]">
            <svg className="size-full" fill="none" viewBox="0 0 15 14">
              <path
                d={svgPaths.p2c57a680}
                stroke="#C06226"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.998958"
              />
              <path
                d={svgPaths.p2082ac00}
                stroke="#C06226"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.998958"
              />
            </svg>
          </div>
          <p className="text-[13px] text-[#c06226]">{location}</p>
        </div>
        {showWriteReview && storeId ? (
          <button
            type="button"
            onClick={() =>
              navigate(`/write-review?storeId=${storeId}`, {
                state: { showBack: true },
              })
            }
            className="rounded-[16px] bg-[#c06226] px-[13px] py-1"
          >
            <p className="text-[12px] text-white">리뷰 쓰기</p>
          </button>
        ) : null}
      </div>
    </div>
  );
}

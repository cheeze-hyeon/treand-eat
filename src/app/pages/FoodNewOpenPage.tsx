import { useNavigate } from 'react-router';
import {
  getAllNewOpenStores,
  TREND_TAGS,
  type NewOpenStore,
} from './FoodsPage';
import { getPromoImageByIndex } from '../utils/images';

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

function NewOpenListItem({ store, storeIndex, onNavigate }: { store: NewOpenStore; storeIndex: number; onNavigate: () => void }) {
  const imgSrc = getPromoImageByIndex(store.tag, storeIndex);
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onNavigate}
        className="flex w-full overflow-hidden rounded-[14px] border-2 border-[#2e211c] bg-white text-left shadow-[0px_2px_10px_0_rgba(0,0,0,0.06)]"
      >
        <div className="h-[100px] w-[100px] shrink-0 overflow-hidden bg-[#f7f4f0]">
          <img src={imgSrc} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[3px] px-3 py-3">
          <p className="text-[15px] text-[#2e211c]">{store.name}</p>
          <p className="text-[12px] text-[#9e9794]">{store.location}</p>
          <p className="text-[12px] text-[#9e9794]">{store.price}</p>
          <span className="w-fit rounded-[20px] bg-[#f7f4f0] px-[7px] py-0.5 text-[10px] text-[#c06226]">{store.tag}</span>
        </div>
      </button>
      {store.bookmarked && (
        <div className="pointer-events-none absolute right-3 top-3">
          <BookmarkIcon filled />
        </div>
      )}
    </div>
  );
}

export default function FoodNewOpenPage() {
  const navigate = useNavigate();
  const stores = TREND_TAGS.flatMap((tag) => getAllNewOpenStores(tag.id));

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <div className="sticky top-0 z-10 flex h-[56px] shrink-0 items-center gap-3 border-b border-[#e5e5e5] bg-white px-[18px]">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로 가기" className="flex h-10 w-10 items-center justify-center">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309" stroke="#2E211C" strokeWidth="1.66541" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.8214 9.99219H4.16357" stroke="#2E211C" strokeWidth="1.66541" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-[#1c1c1e]">전체 추천</p>
          <p className="truncate text-xs text-[#9e9794]">전체 카테고리</p>
        </div>
        <p className="shrink-0 text-xs text-[#9e9794]">{stores.length}곳</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-[18px] py-4">
        <div className="flex flex-col gap-3">
          {stores.map((store, idx) => (
            <NewOpenListItem key={store.storeId} store={store} storeIndex={idx} onNavigate={() => navigate(`/store/${store.storeId}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}

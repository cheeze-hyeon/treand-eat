import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import StoreReviewCard from '../components/StoreReviewCard';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { getStoreById } from '../data/stores';

export default function StoreReviewsPage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { showPersonalizedMetrics } = usePersonalizedMetrics();
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const store = getStoreById(storeId);

  const toggleLike = (reviewIndex: number) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(reviewIndex)) {
        next.delete(reviewIndex);
      } else {
        next.add(reviewIndex);
      }
      return next;
    });
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <div className="sticky top-0 z-10 flex h-[56px] shrink-0 items-center gap-3 border-b border-[#e5e5e5] bg-white px-[24px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex h-10 w-10 items-center justify-center"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309" stroke="#2E211C" strokeWidth="1.66541" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.8214 9.99219H4.16357" stroke="#2E211C" strokeWidth="1.66541" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[18px] font-extrabold text-[#2e211c]">실시간 리뷰</p>
          <p className="truncate text-xs text-[#9e9794]">{store.name}</p>
        </div>
        <p className="shrink-0 text-xs text-[#9e9794]">{store.reviews.length}개</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[24px] py-4">
        <p className="mb-3 text-[12px] text-[#665a55]">다른 사람들이 남긴 생생한 후기를 확인해보세요.</p>
        <div className="flex flex-col gap-[10px]">
          {store.reviews.map((review, idx) => (
            <StoreReviewCard
              key={idx}
              review={review}
              reviewIndex={idx}
              menuName={store.menuName}
              liked={likedReviews.has(idx)}
              likeCount={(idx * 3 + 5) % 18 + 1}
              onToggleLike={() => toggleLike(idx)}
              showMatchRate={showPersonalizedMetrics}
              verified={idx === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TrendingReviewCard from '../components/TrendingReviewCard';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { getFoodById } from '../data/foods';
import { getTrendingReviewsForFood } from '../data/trendingReviews';

export default function FoodTrendingReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showPersonalizedMetrics } = usePersonalizedMetrics();
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  const food = getFoodById(id);
  const trendingReviews = getTrendingReviewsForFood(food.id);

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
      <div className="sticky top-0 z-10 flex h-[56px] shrink-0 items-center gap-3 border-b border-[#e5e5e5] bg-white px-[18px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex h-10 w-10 items-center justify-center"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309"
              stroke="#2E211C"
              strokeWidth="1.66541"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.8214 9.99219H4.16357"
              stroke="#2E211C"
              strokeWidth="1.66541"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-[#1c1c1e]">지금 뜨는 리뷰</p>
          <p className="truncate text-xs text-[#9e9794]">{food.name}</p>
        </div>
        <p className="shrink-0 text-xs text-[#9e9794]">{trendingReviews.length}개</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[18px] py-4">
        <div className="flex flex-col gap-3">
          {trendingReviews.map((review, idx) => (
            <TrendingReviewCard
              key={idx}
              review={review}
              liked={likedReviews.has(idx)}
              onToggleLike={() => toggleLike(idx)}
              showMatchRate={showPersonalizedMetrics}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

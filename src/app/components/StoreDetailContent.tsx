import { useNavigate } from 'react-router';
import { useState } from 'react';
import svgPaths from '../../imports/매장별페이지-1/svg-rwqfjwbxb';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { getFoodIdByMenuName } from '../data/foods';
import StoreReviewCard from './StoreReviewCard';
import { getStoreById } from '../data/stores';

type StoreDetailContentProps = {
  storeId: string;
};

export default function StoreDetailContent({ storeId }: StoreDetailContentProps) {
  const navigate = useNavigate();
  const { showPersonalizedMetrics } = usePersonalizedMetrics();
  const store = getStoreById(storeId);
  const [showTrenditInfo, setShowTrenditInfo] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  if (!store) return null;

  const previewReviews = store.reviews.slice(0, 2);

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
    <>
      <div className="border-b border-[#e5e5e5] px-[24px] pb-[16px]">
        <div className="mb-[4px] flex items-center justify-between">
          <p className="text-[20px] font-bold text-[#2e211c]">{store.name}</p>
          <div className="flex items-baseline gap-[4px]">
            <p className="text-[20px] font-bold text-[#2e211c]">{store.price}</p>
            <p className="text-[13px] text-[#9e9794]">{store.priceUnit}</p>
          </div>
        </div>

        <div className="mb-[8px]">
          <button
            type="button"
            onClick={() => {
              const foodId = getFoodIdByMenuName(store.menuName);
              if (foodId) navigate(`/food/${foodId}`);
            }}
            className="inline-block rounded-[8px] bg-[#2e211c] px-[10px] py-[3px] transition-opacity hover:opacity-80"
          >
            <p className="text-[13px] font-bold text-white">{store.menuName}</p>
          </button>
        </div>

        <div className="mb-[8px] flex items-center gap-[8px]">
          <p className="text-[13px] text-[#665a55]">평균 웨이팅 {store.waitingTime}</p>
          <div className="size-[2px] rounded-full bg-[#404040]" />
          <p className="text-[13px] text-[#665a55]">리뷰 {store.reviewCount}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[4px]">
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
            <p className="text-[13px] text-[#c06226]">{store.location}</p>
          </div>
          <button
            type="button"
            onClick={() =>
              navigate(`/write-review?storeId=${storeId}`, {
                state: { showBack: true },
              })
            }
            className="rounded-[16px] bg-[#c06226] px-[13px] py-[4px]"
          >
            <p className="text-[12px] text-white">리뷰 쓰기</p>
          </button>
        </div>
      </div>

      <div className="px-[24px] py-[16px]">
        <div className="flex gap-[8px] overflow-x-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex h-[130px] w-[104px] flex-shrink-0 items-center justify-center rounded-[10px] border-2 border-[#2e211c] bg-[#f7f4f0]"
            >
              <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" fill="none" />
                <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" fill="none" />
                <path
                  d="M3 16L8 11L13 16"
                  stroke="#A1A1A1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M13 13L16 10L21 15"
                  stroke="#A1A1A1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="border-y border-[#e5e5e5] px-[24px] py-[12px]">
        <button type="button" className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[8px]">
            <div className="flex size-[25px] items-center justify-center rounded-full bg-[#2e211c]">
              <svg className="h-[16px] w-[13px]" fill="none" viewBox="0 0 14.8337 17.3333">
                <path d={svgPaths.p3c51ee00} stroke="white" strokeWidth="1.5" />
                <path d={svgPaths.p14c46e00} stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-[13px] text-[#665a55]">
              이 {store.menuName}에 만족한 다른 유저들이 저장한 장소 보기
            </p>
          </div>
          <svg className="h-[13px] w-[8px]" fill="none" viewBox="0 0 17.3333 9.33333">
            <path
              d={svgPaths.p82eee00}
              stroke="#665A55"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.33333"
            />
          </svg>
        </button>
      </div>

      {showPersonalizedMetrics && (
      <div className="relative px-[24px] py-[24px]">
        <div className="relative mb-[17px] flex items-center gap-[8px]">
          <p className="text-[18px] font-extrabold text-[#2e211c]">트렌딧 지수</p>
          <button
            type="button"
            onClick={() => setShowTrenditInfo(!showTrenditInfo)}
            className="relative size-[19px]"
          >
            <svg className="size-full" fill="none" viewBox="0 0 19 19">
              <path
                d={svgPaths.p2125cb00}
                stroke="#9E9794"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d={svgPaths.p21ee5880}
                stroke="#9E9794"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M9.5 13.4583H9.50708"
                stroke="#9E9794"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          {showTrenditInfo && (
            <div className="absolute left-[140px] top-[-8px] z-20 w-[220px] rounded-[12px] border-2 border-[#2e211c] bg-white p-[14px] pr-[32px] shadow-lg">
              <p className="text-[12px] leading-[18px] text-[#2e211c]">
                이 음식을 경험한 후 만족한 사용자의 비율을 나타내는 지수입니다. 나와 취향이 비슷한
                사용자는 취향일치율이 70% 이상인 사용자입니다.
              </p>
              <button
                type="button"
                onClick={() => setShowTrenditInfo(false)}
                className="absolute right-[12px] top-[12px] flex size-[16px] items-center justify-center"
              >
                <svg className="size-[12px]" fill="none" viewBox="0 0 12.85 12.85">
                  <path clipRule="evenodd" d={svgPaths.p17b53000} fill="#2E211C" fillRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-[22px]">
          <div className="flex flex-1 flex-col items-center justify-center rounded-[16px] border-2 border-[#2e211c] bg-white p-[16px]">
            <p className="mb-[12px] text-center text-[12px] leading-[16px] text-[#665a55]">
              유저들의
              <br />
              전체 평균은
            </p>
            <p className="text-center text-[28px] font-extrabold leading-[1] text-[#4a90a4]">
              {store.avgScore}%
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center rounded-[16px] border-2 border-[#2e211c] bg-white p-[16px]">
            <p className="mb-[12px] text-center text-[12px] leading-[16px] text-[#665a55]">
              나와 취향이 비슷한
              <br />
              유저들의 평균은
            </p>
            <p className="text-center text-[28px] font-extrabold leading-[1] text-[#4a90a4]">
              {store.similarScore}%
            </p>
          </div>
        </div>
      </div>
      )}

      <div className="px-[24px] pb-[30px] pt-[16px]">
        <div className="mb-[12px] flex items-center justify-between">
          <p className="text-[18px] font-extrabold text-[#2e211c]">
            실시간 리뷰 ({store.reviewCount})
          </p>
          <button
            type="button"
            onClick={() => navigate(`/store/${storeId}/reviews`)}
            className="text-[13px] text-[#9e9794]"
          >
            더보기
          </button>
        </div>
        <p className="mb-[12px] text-[12px] text-[#665a55]">
          다른 사람들이 남긴 생생한 후기를 확인해보세요.
        </p>

        <div className="flex flex-col gap-[10px]">
          {previewReviews.map((review, idx) => (
            <StoreReviewCard
              key={idx}
              review={review}
              liked={likedReviews.has(idx)}
              onToggleLike={() => toggleLike(idx)}
              showMatchRate={showPersonalizedMetrics}
            />
          ))}
        </div>
      </div>
    </>
  );
}

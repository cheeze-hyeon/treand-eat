import { useNavigate } from 'react-router';
import { useState } from 'react';
import svgPaths from '../../imports/매장별페이지-1/svg-rwqfjwbxb';
import { getFoodIdByMenuName } from '../data/foods';
import { getStoreById } from '../data/stores';

type StoreDetailContentProps = {
  storeId: string;
};

export default function StoreDetailContent({ storeId }: StoreDetailContentProps) {
  const navigate = useNavigate();
  const store = getStoreById(storeId);
  const [showTrenditInfo, setShowTrenditInfo] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  if (!store) return null;

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

      <div className="px-[24px] pb-[30px] pt-[16px]">
        <div className="mb-[12px] flex items-center justify-between">
          <p className="text-[18px] font-extrabold text-[#2e211c]">
            실시간 리뷰 ({store.reviewCount})
          </p>
          <button type="button" className="text-[13px] text-[#9e9794]">
            더보기
          </button>
        </div>
        <p className="mb-[12px] text-[12px] text-[#665a55]">
          다른 사람들이 남긴 생생한 후기를 확인해보세요.
        </p>

        <div className="flex flex-col gap-[10px]">
          {store.reviews.map((review, idx) => (
            <div
              key={idx}
              className="relative rounded-[16px] border-2 border-[#404040] bg-white p-[14px] pb-[40px]"
            >
              <div className="mb-[6px] flex items-end justify-between">
                <div className="flex items-center gap-[8px]">
                  <div className="flex size-[32px] items-center justify-center rounded-full bg-[#2e211c]">
                    <p className="text-[12px] text-white">{review.authorInitial}</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-[#2e211c]">{review.author}</p>
                    <p className="text-[12px] text-[#9e9794]">{review.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-[4px]">
                  <div className="rounded-[8px] bg-[#9cb8b7] px-[8px] py-[3px]">
                    <p className="text-[11px] text-[#2e211c]">취향 일치율 {review.matchRate}%</p>
                  </div>
                  <div className="text-[28px]">{review.satisfied ? '🙂' : '🙁'}</div>
                </div>
              </div>

              <p className="mb-[6px] text-[12px] text-[#717171]">
                {review.visitTime} | {review.visitDay} | {review.waiting}
              </p>

              <p
                className={`mb-[6px] text-[14px] leading-[22.75px] ${review.satisfied ? 'text-[#2e211c]' : 'text-[#404040]'}`}
              >
                {review.text}
              </p>

              <div className="flex gap-[8px]">
                {Array.from({ length: review.imageCount }).map((_, i) => (
                  <div
                    key={i}
                    className="flex size-[64px] items-center justify-center rounded-[10px] bg-[#f7f4f0]"
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

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(idx);
                }}
                className="absolute bottom-[14px] right-[14px] flex items-center gap-[4px] transition-colors"
              >
                <div className="size-[16px]">
                  <svg className="size-full" fill="none" viewBox="0 0 25 25">
                    <path
                      d="M7.69227 21.0403C7.42516 21.0403 7.16944 20.9345 6.98466 20.7467C6.79987 20.5589 6.69727 20.3039 6.69727 20.0409V10.3763C6.69727 10.1133 6.79987 9.85828 6.98466 9.67048C7.16944 9.48268 7.42516 9.37695 7.69227 9.37695H10.1781L13.5858 3.55749C13.7103 3.34188 13.8952 3.16541 14.1188 3.0509C14.3424 2.9364 14.5953 2.88892 14.8457 2.91448C15.0961 2.94003 15.3336 3.03741 15.5302 3.19522C15.7267 3.35304 15.8739 3.56464 15.9544 3.80386L17.7498 9.37695H20.7331C21.0002 9.37695 21.2559 9.48268 21.4407 9.67048C21.6255 9.85828 21.7281 10.1133 21.7281 10.3763V12.3709C21.7281 12.5177 21.7006 12.6632 21.6471 12.7997L18.4894 20.2908C18.393 20.5275 18.2245 20.7292 18.0062 20.8689C17.7879 21.0087 17.5303 21.0801 17.2675 21.0739H7.69227V21.0403ZM4.21227 10.3763V21.0403H2.22227V10.3763H4.21227Z"
                      fill={likedReviews.has(idx) ? '#4a90a4' : 'none'}
                      stroke={likedReviews.has(idx) ? '#4a90a4' : '#9CB8B7'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className={`text-[12px] ${likedReviews.has(idx) ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>
                  공감
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

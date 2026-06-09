import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import ExploreReviewCard from '../components/ExploreReviewCard';
import FoodStoreCard, { getStoreListing } from '../components/FoodStoreCard';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { FOOD_STORES, getFoodById, parseFoodPrice } from '../data/foods';
import { getExploreReviewsForFood } from '../data/trendingReviews';
import { getFoodPromoImage } from '../utils/images';

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function ReviewTrendChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 100;
  const h = 60;
  const isRising = data[data.length - 1] > data[0];
  const color = isRising ? '#4a90a4' : '#c06226';
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * (w - 6) + 3,
    h - 4 - ((v - min) / (max - min || 1)) * (h - 10),
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

  return (
    <div className="flex w-full flex-col gap-1">
      <svg width={100} height={60} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
        <path d={d} stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3} fill={color} />
        ))}
      </svg>
      <div className="flex justify-between px-0.5">
        {DAY_LABELS.map((label) => (
          <span key={label} className="text-[8px] text-[#c8b8b0]">{label}</span>
        ))}
      </div>
    </div>
  );
}

export default function FoodDetailPage() {
 const { id } = useParams();
 const navigate = useNavigate();
 const { showPersonalizedMetrics } = usePersonalizedMetrics();
 const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());
 const food = getFoodById(id);

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
 const stores = FOOD_STORES[food.id] ?? FOOD_STORES['1'];
 const exploreReviews = getExploreReviewsForFood(food.id);
 const previewReviews = exploreReviews.slice(0, 2);
 const { amount: priceAmount, unit: priceUnit } = parseFoodPrice(food.price);

 return (
 <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
 <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
 <div className="relative w-full bg-white">
 <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2.5 bg-white/80 backdrop-blur-sm">
 <button
 type="button"
 onClick={() => navigate(-1)}
 aria-label="뒤로 가기"
 className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[39.99px] h-[39.99px] relative pr-[10.0094633102417px] rounded-[36618800px] bg-white/50"
 >
 <svg
 width={20}
 height={20}
 viewBox="0 0 20 20"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0 w-[19.98px] h-[19.98px] relative"
 preserveAspectRatio="none"
 >
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
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
 <svg
 width={20}
 height={20}
 viewBox="0 0 20 20"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0 w-[19.98px] h-[19.98px] relative"
 preserveAspectRatio="none"
 >
 <path
 d="M15.8214 17.4867L9.9925 14.1559L4.16357 17.4867V4.16346C4.16357 3.72176 4.33904 3.29816 4.65136 2.98583C4.96369 2.67351 5.38729 2.49805 5.82898 2.49805H14.156C14.5977 2.49805 15.0213 2.67351 15.3336 2.98583C15.646 3.29816 15.8214 3.72176 15.8214 4.16346V17.4867Z"
 stroke="#2E211C"
 strokeWidth="1.66541"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </div>
 </div>
 <div className="flex w-full flex-col">
 <div className="relative w-full min-h-[280px] flex flex-col justify-end bg-[#c8b89a]">
 <img src={getFoodPromoImage(food.id)} alt={food.name} className="absolute inset-0 w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/65 pointer-events-none" />
 <div className="absolute right-5 top-[30px] flex h-[110px] w-[165.5px] flex-col items-center justify-center gap-1.5 rounded-lg border border-white/30 bg-black/40 px-1.5 py-[9.5px]">
 <p className="text-[10px] text-white/80">최근 리뷰량 추이</p>
 <ReviewTrendChart data={food.dailyReviews} />
 </div>
 <div className="relative z-10 flex flex-col gap-[5px] px-5 pt-[160px] pb-[18px]">
 <p className="text-[26px] font-bold text-white drop-shadow-sm">{food.name}</p>
 <p className="text-xs text-white/80">{food.description}</p>
 </div>
 </div>
 <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 px-5 py-3.5 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#ebebeb]">
 <div className="flex justify-start items-center flex-grow gap-[19px]">
 {showPersonalizedMetrics && (
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-[5px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2.5">
 <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[31px] w-[95px] relative px-[7px] py-0.5 rounded-lg bg-[#9cb8b7]">
 <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#2e211c]">
 만족할 확률
 </p>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 text-[22px] font-black text-left text-[#335352]">
 {food.matchRate}
 </p>
 <p className="text-[10px] text-[#9e9794]">{food.sampleCount}명 기준</p>
 </div>
 </div>
 )}
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-[5px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2.5">
 <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[31px] w-[81px] relative px-[7px] py-0.5 rounded-lg bg-[#9cb8b7]">
 <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#2e211c]">
 평균가격
 </p>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 font-black text-left">
 <span className="flex-grow-0 flex-shrink-0 text-[22px] font-black text-left text-[#335352]">
 {priceAmount}
 </span>
 <span className="flex-grow-0 flex-shrink-0 text-[10px] font-black text-left text-[#9cb8b7]">
 {priceUnit}
 </span>
 </p>
 </div>
 </div>
 <div className="flex justify-end items-center flex-grow w-px h-[19px] gap-2" />
 </div>
 </div>
 </div>
 <div className="flex w-full flex-col gap-3 px-[18px] pt-5">
 <div className="flex items-center self-stretch">
 <p className="text-base text-[#1c1c1e]">판매하는 곳</p>
 </div>
 <div
 className={
 stores.length > 1
 ? 'flex items-start gap-2 self-stretch overflow-x-auto pb-1'
 : 'w-full pb-1'
 }
 >
 {stores.map((store) => {
 const listing = getStoreListing(store, priceAmount);
 const isSingle = stores.length === 1;
 return (
 <div
 key={store.storeId}
 className={isSingle ? 'w-full min-w-0' : 'flex shrink-0 items-start gap-2'}
 >
 <FoodStoreCard
 rank={listing.rank}
 name={listing.name}
 waitingTime={listing.waitingTime}
 reviewCount={listing.reviewCount}
 price={listing.price}
 priceDiff={listing.priceDiff}
 location={listing.location}
 clipId={`foodStorePin-${store.storeId}`}
 fullWidth={isSingle}
 onClick={() => navigate(`/store/${store.storeId}`)}
 />
 </div>
 );
 })}
 </div>
 <button
 type="button"
 onClick={() => navigate(`/food/${food.id}/stores`)}
 className="mx-[18px] mt-1 mb-2 w-[calc(100%-36px)] rounded-[10px] border-2 border-[#e5e2de] py-3 text-[14px] font-medium text-[#665a55] transition-colors hover:bg-[#f7f4f0]"
 >
 판매 매장 전체 보기
 </button>
 </div>
 <div className="flex w-full flex-col gap-3 px-[18px] pt-3 pb-6">
 <div className="flex items-center self-stretch">
 <p className="text-base text-[#1c1c1e]">지금 뜨는 리뷰</p>
 </div>
 <div className="flex flex-col gap-3">
 {previewReviews.map((review, idx) => (
 <ExploreReviewCard
 key={`${review.storeId}-${review.author}-${idx}`}
 storeName={review.storeName}
 menuName={review.menuName}
 authorInitial={review.authorInitial}
 author={review.author}
 time={review.time}
 matchRate={review.matchRate}
 satisfied={review.satisfied}
 visitInfo={review.visitInfo}
 text={review.text}
 imageCount={review.imageCount}
 reviewIndex={idx}
 verified={review.verified}
 liked={likedReviews.has(idx)}
 likeCount={(idx * 4 + 6) % 20 + 3}
 onToggleLike={() => toggleLike(idx)}
 onNavigate={() => navigate(`/store/${review.storeId}`)}
 showMatchRate={showPersonalizedMetrics}
 />
 ))}
 </div>
 <button
 type="button"
 onClick={() => navigate(`/food/${food.id}/reviews`)}
 className="mt-1 w-full rounded-[10px] border-2 border-[#e5e2de] py-3 text-[14px] font-medium text-[#665a55] transition-colors hover:bg-[#f7f4f0]"
 >
 리뷰 전체 보기
 </button>
 </div>
 </div>
 </div>
 <BottomNavigation activeTab="home" />
 </div>
 );
}

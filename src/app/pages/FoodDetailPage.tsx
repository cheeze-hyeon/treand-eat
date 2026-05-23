import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import PriceDiffBadge from '../components/PriceDiffBadge';
import TrendingReviewCard from '../components/TrendingReviewCard';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { FOOD_STORES, getFoodById, parseFoodPrice, type FoodStore } from '../data/foods';
import { getTrendingReviewsForFood } from '../data/trendingReviews';
import { STORES } from '../data/stores';
import {
  formatPriceDiffAmount,
  getPriceDiffFromAverage,
  parsePriceNumber,
  type PriceDiff,
} from '../utils/priceDiff';

function formatKrwPrice(price: string) {
  const num = Number.parseInt(price.replace(/\D/g, ''), 10);
  if (Number.isNaN(num)) return price;
  return `${num.toLocaleString('ko-KR')}원`;
}

function MetaDot() {
  return (
    <svg width={2} height={2} viewBox="0 0 2 2" fill="none" className="shrink-0" aria-hidden>
      <circle cx={1} cy={1} r={1} fill="#665A55" />
    </svg>
  );
}

function StoreLocationPin({ location, clipId }: { location: string; clipId: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <svg
        width={15}
        height={14}
        viewBox="0 0 15 14"
        fill="none"
        className="h-3.5 w-[15px] shrink-0"
        aria-hidden
      >
        <g clipPath={`url(#${clipId})`}>
          <path
            d="M12.5 5.83268C12.5 8.74527 9.03812 11.7786 7.87562 12.7154C7.76733 12.7914 7.6355 12.8325 7.5 12.8325C7.3645 12.8325 7.23267 12.7914 7.12438 12.7154C5.96188 11.7786 2.5 8.74527 2.5 5.83268C2.5 4.59501 3.02678 3.40802 3.96447 2.53285C4.90215 1.65768 6.17392 1.16602 7.5 1.16602C8.82608 1.16602 10.0979 1.65768 11.0355 2.53285C11.9732 3.40802 12.5 4.59501 12.5 5.83268Z"
            stroke="#FF8C42"
            strokeWidth={0.998958}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 7.58398C8.53553 7.58398 9.375 6.80048 9.375 5.83398C9.375 4.86749 8.53553 4.08398 7.5 4.08398C6.46447 4.08398 5.625 4.86749 5.625 5.83398C5.625 6.80048 6.46447 7.58398 7.5 7.58398Z"
            stroke="#FF8C42"
            strokeWidth={0.998958}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width={15} height={14} fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className="text-[13px] text-[#ff8c42]">{location}</p>
    </div>
  );
}

function FoodStoreCard({
  rank,
  name,
  waitingTime,
  reviewCount,
  price,
  priceDiff,
  location,
  clipId,
  fullWidth = false,
  onClick,
}: {
  rank: number;
  name: string;
  waitingTime: string;
  reviewCount: number;
  price: string;
  priceDiff: { direction: PriceDiff['direction']; amount: string } | null;
  location: string;
  clipId: string;
  fullWidth?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-[5px] rounded-2xl border-2 border-[#2e211c] bg-white p-[17.09px] text-left transition-colors hover:bg-[#f9f9f9] ${
        fullWidth ? 'w-full min-w-0' : 'w-[294px] shrink-0'
      }`}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center gap-[9px]">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[20px] bg-[#c06226] px-[7px] py-0.5">
            <p className="text-xl text-white">{rank}</p>
          </div>
          <p className="min-w-0 flex-1 text-xl text-[#2e211c]">{name}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="shrink-0 text-[13px] text-[#665a55]">평균 웨이팅 {waitingTime}</p>
          <MetaDot />
          <p className="shrink-0 text-[13px] text-[#665a55]">
            리뷰 {reviewCount.toLocaleString('ko-KR')}
          </p>
          <MetaDot />
          <p className="shrink-0 text-[13px] text-[#665a55]">{price}</p>
          {priceDiff ? (
            <PriceDiffBadge direction={priceDiff.direction} amount={priceDiff.amount} />
          ) : null}
        </div>
        <StoreLocationPin location={location} clipId={clipId} />
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[130px] min-w-0 w-full rounded-[10px] border-2 border-[#2e211c] bg-[#f7f4f0]"
          />
        ))}
      </div>
    </button>
  );
}

function getStoreListing(store: FoodStore, avgPriceAmount: string) {
  const detail = STORES[store.storeId];
  const price = store.listPrice
    ? formatKrwPrice(store.listPrice)
    : detail
      ? formatKrwPrice(detail.price)
      : '1,500원';
  let priceDiff: { direction: PriceDiff['direction']; amount: string } | null = null;
  if (store.priceDiff) {
    priceDiff = {
      direction: 'below',
      amount: formatKrwPrice(store.priceDiff),
    };
  } else if (detail) {
    const avgNum = parsePriceNumber(avgPriceAmount);
    const diff = avgNum != null ? getPriceDiffFromAverage(detail.price, avgNum) : null;
    if (diff) {
      priceDiff = {
        direction: diff.direction,
        amount: formatPriceDiffAmount(diff.amount),
      };
    }
  }

  return {
    name: store.name,
    rank: store.rank,
    waitingTime: detail?.waitingTime ?? '15분',
    reviewCount: detail?.reviewCount ?? 404,
    price,
    priceDiff,
    location: detail?.location ?? '서울 마포구',
  };
}

function ReviewTrendChart() {
  return (
    <svg
      width={100}
      height={68}
      viewBox="0 0 100 68"
      fill="none"
      className="h-[68px] w-[100px]"
      aria-hidden
    >
      <g clipPath="url(#foodDetailTrendClip)">
        <path
          d="M0 48L24 42L48 32L72 24L96 16"
          stroke="#9CB8B7"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[
          [0, 48],
          [24, 42],
          [48, 32],
          [72, 24],
          [96, 16],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} fill="#9CB8B7" />
        ))}
      </g>
      <defs>
        <clipPath id="foodDetailTrendClip">
          <rect width={100} height={68} fill="white" />
        </clipPath>
      </defs>
    </svg>
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
 const stores = FOOD_STORES[food.id] ?? FOOD_STORES['2'];
 const trendingReviews = getTrendingReviewsForFood(food.id);
 const previewReviews = trendingReviews.slice(0, 2);
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
 <div className="self-stretch flex-grow-0 flex-shrink-0 h-[280px] relative bg-[#c8b89a]">
 <div className="w-full h-[280px] absolute left-0 top-0 bg-[#f7f4f0]" />
 <div className="absolute right-5 top-[30px] flex h-[110px] w-[165.5px] flex-col items-center justify-center gap-1.5 rounded-lg border border-[#2e211c]/20 bg-white/60 px-1.5 py-[9.5px]">
 <p className="text-[10px] text-[#9e9794]">최근 리뷰량 추이</p>
 <ReviewTrendChart />
 </div>
 <div className="flex flex-col justify-start items-start w-full absolute left-0 top-[180px] gap-[5px] px-5 pb-[18px]">
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative pt-[3px]">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[362px] text-[26px] text-left text-[#2e211c]">
 {food.name}
 </p>
 </div>
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[362px] text-xs text-left text-[#2e211c]">
 {food.description}
 </p>
 </div>
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
 <div className="flex items-center justify-between self-stretch">
 <p className="text-base text-[#1c1c1e]">판매하는 곳</p>
 <p className="text-xs text-[#9e9794]">더보기 ›</p>
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
 </div>
 <div className="flex w-full flex-col gap-3 px-[18px] pt-5 pb-6">
 <div className="flex justify-between items-center self-stretch">
 <p className="text-base text-[#1c1c1e]">지금 뜨는 리뷰</p>
 <button
 type="button"
 onClick={() => navigate(`/food/${food.id}/reviews`)}
 className="text-xs text-[#9e9794]"
 >
 더보기 ›
 </button>
 </div>
 <div className="flex flex-col gap-3">
 {previewReviews.map((review, idx) => (
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
 </div>
 <BottomNavigation activeTab="home" />
 </div>
 );
}

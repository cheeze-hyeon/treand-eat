import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import { FOOD_STORES, getFoodById, parseFoodPrice, type FoodStore } from '../data/foods';
import { STORES } from '../data/stores';

type TrendingReview = {
  authorInitial: string;
  author: string;
  time: string;
  matchRate: number;
  satisfied: boolean;
  visitInfo: string;
  text: string;
  imageCount: number;
};

const TRENDING_REVIEWS: TrendingReview[] = [
  {
    authorInitial: '쫀',
    author: '쫀득파',
    time: '방금 전',
    matchRate: 68,
    satisfied: true,
    visitInfo: '저녁에 방문 | 평일에 방문 | 웨이팅 15분',
    text: '진짜 쫀득하고 버터향이 강해서 멀리서 와도 먹을 만해요. 겉은 쫀득하고 안은 바삭해서 식감이 독특해요.',
    imageCount: 4,
  },
  {
    authorInitial: '단',
    author: '단짠러버',
    time: '24분 전',
    matchRate: 91,
    satisfied: true,
    visitInfo: '점심에 방문 | 주말에 방문 | 웨이팅 5분',
    text: '버터 풍미가 정말 진해요. 포장 상태도 좋고 선물용으로 샀는데 반응이 좋았어요. 달기만 한 게 아니라 고소함이 살아 있어요.',
    imageCount: 3,
  },
  {
    authorInitial: '떡',
    author: '떡순이',
    time: '2시간 전',
    matchRate: 54,
    satisfied: false,
    visitInfo: '오후에 방문 | 주말에 방문 | 웨이팅 40분',
    text: '맛은 괜찮은데 가격 대비 양이 아쉬워요. 웨이팅이 길어서 기대가 컸는데 그 정도까진 아니었어요.',
    imageCount: 2,
  },
  {
    authorInitial: '버',
    author: '버터덕후',
    time: '어제',
    matchRate: 82,
    satisfied: true,
    visitInfo: '아침에 방문 | 평일에 방문 | 웨이팅 없음',
    text: '오픈런으로 가니 바로 샀어요. 갓 나온 떡이라 따뜻하고 촉촉했고, 냉장고에 하루 넣었다가 먹어도 맛이 유지됐어요.',
    imageCount: 4,
  },
];

function formatKrwPrice(price: string) {
  const num = Number.parseInt(price.replace(/\D/g, ''), 10);
  if (Number.isNaN(num)) return price;
  return `${num.toLocaleString('ko-KR')}원`;
}

function getCheaperByAmount(storePrice: string, avgPriceAmount: string) {
  const storeNum = Number.parseInt(storePrice.replace(/\D/g, ''), 10);
  const avgNum = Number.parseInt(avgPriceAmount.replace(/\D/g, ''), 10);
  if (Number.isNaN(storeNum) || Number.isNaN(avgNum) || storeNum >= avgNum) return null;
  return `${(avgNum - storeNum).toLocaleString('ko-KR')}원`;
}

function MetaDot() {
  return (
    <svg width={2} height={2} viewBox="0 0 2 2" fill="none" className="shrink-0" aria-hidden>
      <circle cx={1} cy={1} r={1} fill="#665A55" />
    </svg>
  );
}

function PriceCheaperBadge({ amount }: { amount: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded bg-[#3a7bd5]/[0.12]">
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
  priceDiff: string | null;
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
          {priceDiff ? <PriceCheaperBadge amount={priceDiff} /> : null}
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
  const priceDiff = store.priceDiff
    ? formatKrwPrice(store.priceDiff)
    : detail
      ? getCheaperByAmount(detail.price, avgPriceAmount)
      : null;

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

function ReviewPhotoPlaceholder() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" />
      <path
        d="M3 16L8 11L13 16"
        stroke="#A1A1A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 13L16 10L21 15"
        stroke="#A1A1A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendingReviewCard({
  review,
  liked,
  onToggleLike,
}: {
  review: TrendingReview;
  liked: boolean;
  onToggleLike: () => void;
}) {
  return (
    <div className="self-stretch flex-grow-0 flex-shrink-0 h-[245.5px] relative">
      <div className="w-full h-[245.5px] absolute left-0 top-0 rounded-2xl bg-white border-2 border-neutral-700">
        <div className="flex justify-between items-end absolute left-4 top-4 right-4">
          <div className="flex justify-start items-center gap-2">
            <div className="flex justify-center items-center w-8 h-8 rounded-full bg-[#2e211c]">
              <p className="text-xs text-white">{review.authorInitial}</p>
            </div>
            <div className="flex flex-col justify-start items-start">
              <p className="text-sm text-[#2e211c]">{review.author}</p>
              <p className="text-xs text-[#9e9794]">{review.time}</p>
            </div>
          </div>
          <div className="flex justify-start items-center gap-1">
            <div className="rounded-lg bg-[#9cb8b7] px-2 pt-[3px]">
              <p className="text-[11px] text-[#2e211c]">취향 일치율 {review.matchRate}%</p>
            </div>
            <p className="text-[28px] leading-none">{review.satisfied ? '🙂' : '🙁'}</p>
          </div>
        </div>
        <p className="absolute left-4 right-4 top-16 text-xs text-[#717171]">{review.visitInfo}</p>
        <p
          className={`absolute left-4 right-4 top-[88px] text-sm line-clamp-2 ${
            review.satisfied ? 'text-[#2e211c]' : 'text-[#404040]'
          }`}
        >
          {review.text}
        </p>
        <div className="flex justify-start items-start absolute left-4 top-[139.5px] gap-2">
          {Array.from({ length: review.imageCount }).map((_, i) => (
            <div
              key={i}
              className="flex justify-center items-center w-16 h-16 rounded-[10px] bg-[#f7f4f0]"
            >
              <ReviewPhotoPlaceholder />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggleLike}
          className="flex justify-start items-center absolute right-4 bottom-4 gap-1"
        >
          <div className="w-4 h-4">
            <svg className="size-full" fill="none" viewBox="0 0 25 25">
              <path
                d="M7.69227 21.0403C7.42516 21.0403 7.16944 20.9345 6.98466 20.7467C6.79987 20.5589 6.69727 20.3039 6.69727 20.0409V10.3763C6.69727 10.1133 6.79987 9.85828 6.98466 9.67048C7.16944 9.48268 7.42516 9.37695 7.69227 9.37695H10.1781L13.5858 3.55749C13.7103 3.34188 13.8952 3.16541 14.1188 3.0509C14.3424 2.9364 14.5953 2.88892 14.8457 2.91448C15.0961 2.94003 15.3336 3.03741 15.5302 3.19522C15.7267 3.35304 15.8739 3.56464 15.9544 3.80386L17.7498 9.37695H20.7331C21.0002 9.37695 21.2559 9.48268 21.4407 9.67048C21.6255 9.85828 21.7281 10.1133 21.7281 10.3763V12.3709C21.7281 12.5177 21.7006 12.6632 21.6471 12.7997L18.4894 20.2908C18.393 20.5275 18.2245 20.7292 18.0062 20.8689C17.7879 21.0087 17.5303 21.0801 17.2675 21.0739H7.69227V21.0403ZM4.21227 10.3763V21.0403H2.22227V10.3763H4.21227Z"
                fill={liked ? '#4a90a4' : 'none'}
                stroke={liked ? '#4a90a4' : '#9CB8B7'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <p className={`text-xs ${liked ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>공감</p>
        </button>
      </div>
    </div>
  );
}

export default function FoodDetailPage() {
 const { id } = useParams();
 const navigate = useNavigate();
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
 <p className="text-xs text-[#9e9794]">더보기 ›</p>
 </div>
 <div className="flex flex-col gap-3">
 {TRENDING_REVIEWS.map((review, idx) => (
 <TrendingReviewCard
 key={idx}
 review={review}
 liked={likedReviews.has(idx)}
 onToggleLike={() => toggleLike(idx)}
 />
 ))}
 </div>
 </div>
 </div>
 </div>
 <BottomNavigation activeTab="explore" />
 </div>
 );
}

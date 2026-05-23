import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import {
  MACAO_CRACK_COOKIE_FOOD_STORES,
  MACAO_CRACK_COOKIE_STORES,
  MACAO_CRACK_COOKIE_TRENDING_REVIEWS,
} from '../data/macaoCrackCookie.generated';

const TREND_TAGS = [
  { id: 'macao', label: '마카오 크랙쿠키' },
  { id: 'dubai', label: '두바이쫀득쿠키' },
  { id: 'butter-rice', label: '버터떡' },
  { id: 'chewy-bread', label: '쫀득빵' },
  { id: 'pumpkin', label: '호박인절미' },
  { id: 'mala', label: '마라떡볶이' },
] as const;

type TrendTagId = (typeof TREND_TAGS)[number]['id'];

const TREND_TAG_TO_FOOD_ID: Record<TrendTagId, string> = {
  macao: '7',
  dubai: '1',
  'butter-rice': '2',
  'chewy-bread': '5',
  pumpkin: '3',
  mala: '4',
};

type NewOpenStore = {
  storeId: string;
  name: string;
  location: string;
  price: string;
  tag: string;
  bookmarked: boolean;
};

type ExploreReview = {
  storeId: string;
  storeName: string;
  menuName: string;
  authorInitial: string;
  author: string;
  time: string;
  matchRate: number;
  satisfied: boolean;
  visitInfo: string;
  text: string;
  imageCount: number;
  verified: boolean;
  liked: boolean;
};

type TrendContent = {
  newOpenStores: NewOpenStore[];
  reviews: ExploreReview[];
};

const MACAO_NEW_OPEN: NewOpenStore[] = MACAO_CRACK_COOKIE_FOOD_STORES.slice(0, 3).map(
  ({ storeId, name }) => {
    const store = MACAO_CRACK_COOKIE_STORES[storeId];
    return {
      storeId,
      name,
      location: `${store.location} · 도보 8분`,
      price: `${store.price} ${store.priceUnit}`,
      tag: '마카오크랙',
      bookmarked: false,
    };
  },
);

const MACAO_EXPLORE_STORE_IDS = ['macao_cookie_01', 'macao_cookie_04', 'macao_cookie_05'] as const;

const MACAO_EXPLORE_REVIEWS: ExploreReview[] = MACAO_CRACK_COOKIE_TRENDING_REVIEWS.slice(0, 3).map(
  (review, index) => {
    const store = MACAO_CRACK_COOKIE_STORES[MACAO_EXPLORE_STORE_IDS[index]];
    return {
      storeId: store.id,
      storeName: store.name,
      menuName: '마카오 크랙쿠키',
      authorInitial: review.authorInitial,
      author: review.author,
      time: review.time,
      matchRate: review.matchRate,
      satisfied: review.satisfied,
      visitInfo: review.visitInfo,
      text: review.text,
      imageCount: review.imageCount,
      verified: index === 0,
      liked: false,
    };
  },
);

const TREND_CONTENT: Record<TrendTagId, TrendContent> = {
  macao: {
    newOpenStores: MACAO_NEW_OPEN,
    reviews: MACAO_EXPLORE_REVIEWS,
  },
  dubai: {
    newOpenStores: [
      {
        storeId: '7',
        name: '달콤제과',
        location: '성수1가 · 도보 8분',
        price: '6,000원 (1박스)',
        tag: '두쫀쿠',
        bookmarked: false,
      },
      {
        storeId: '8',
        name: '무드케이크',
        location: '성수1가 · 도보 12분',
        price: '5,000원 (2개)',
        tag: '두쫀쿠',
        bookmarked: false,
      },
      {
        storeId: '1',
        name: '미엘 케이커리',
        location: '성수2가 · 도보 6분',
        price: '5,000원 / 2개',
        tag: '두쫀쿠',
        bookmarked: true,
      },
    ],
    reviews: [
      {
        storeId: '1',
        storeName: '미엘 케이커리',
        menuName: '두쫀쿠',
        authorInitial: '디',
        author: '디저트러버',
        time: '1시간 전',
        matchRate: 72,
        satisfied: true,
        visitInfo: '저녁에 방문 | 평일에 방문 | 웨이팅 15분',
        text: '겉은 쫀득하고 속은 바삭해서 독특한 식감이 정말 좋았어요. 두쫀쿠 특유의 반전 식감이 매력적입니다!',
        imageCount: 4,
        verified: false,
        liked: false,
      },
      {
        storeId: '7',
        storeName: '달콤제과',
        menuName: '두바이 쫀득 쿠키',
        authorInitial: '쫀',
        author: '쫀득파',
        time: '3시간 전',
        matchRate: 88,
        satisfied: true,
        visitInfo: '오후에 방문 | 주말에 방문 | 웨이팅 25분',
        text: '피스타치오 스프레드가 고소하고 카다이프 바삭함이 살아 있어요. 한입 크기라 나눠 먹기도 좋아요.',
        imageCount: 3,
        verified: true,
        liked: true,
      },
      {
        storeId: '8',
        storeName: '무드케이크',
        menuName: '두쫀쿠',
        authorInitial: '단',
        author: '단짠러버',
        time: '5시간 전',
        matchRate: 65,
        satisfied: true,
        visitInfo: '점심에 방문 | 평일에 방문 | 웨이팅 10분',
        text: '달기만 한 게 아니라 고소함이 확실해서 커피랑 같이 먹으면 딱이에요.',
        imageCount: 2,
        verified: false,
        liked: false,
      },
    ],
  },
  'butter-rice': {
    newOpenStores: [
      {
        storeId: '1',
        name: '미엘 케이커리',
        location: '마포 · 도보 5분',
        price: '2,000원 (개당)',
        tag: '버터떡',
        bookmarked: false,
      },
      {
        storeId: '2',
        name: '떡앤카페',
        location: '관악 · 도보 10분',
        price: '3,000원 (개당)',
        tag: '버터떡',
        bookmarked: false,
      },
      {
        storeId: '8',
        name: '무드케이크',
        location: '성수1가 · 도보 12분',
        price: '5,000원 (2개)',
        tag: '버터떡',
        bookmarked: false,
      },
    ],
    reviews: [
      {
        storeId: '1',
        storeName: '미엘 케이커리',
        menuName: '버터떡',
        authorInitial: '쫀',
        author: '쫀득파',
        time: '방금 전',
        matchRate: 68,
        satisfied: true,
        visitInfo: '저녁에 방문 | 평일에 방문 | 웨이팅 15분',
        text: '진짜 쫀득하고 버터향이 강해서 멀리서 와도 먹을 만해요. 겉은 쫀득하고 안은 바삭해서 식감이 독특해요.',
        imageCount: 4,
        verified: true,
        liked: false,
      },
      {
        storeId: '2',
        storeName: '떡앤카페',
        menuName: '버터떡',
        authorInitial: '떡',
        author: '떡러버',
        time: '1시간 전',
        matchRate: 75,
        satisfied: true,
        visitInfo: '점심에 방문 | 주말에 방문 | 웨이팅 10분',
        text: '버터 향이 진하고 떡이 쫀득해요. 고소한 맛이 일품입니다. 커피랑 환상 조합!',
        imageCount: 3,
        verified: false,
        liked: true,
      },
      {
        storeId: '1',
        storeName: '미엘 케이커리',
        menuName: '버터떡',
        authorInitial: '버',
        author: '버터덕후',
        time: '어제',
        matchRate: 82,
        satisfied: true,
        visitInfo: '아침에 방문 | 평일에 방문 | 웨이팅 없음',
        text: '오픈런으로 가니 바로 샀어요. 갓 나온 떡이라 따뜻하고 촉촉했고, 냉장고에 하루 넣었다가 먹어도 맛이 유지됐어요.',
        imageCount: 4,
        verified: true,
        liked: false,
      },
    ],
  },
  'chewy-bread': {
    newOpenStores: [
      {
        storeId: '5',
        name: '쫀득베이커리',
        location: '마포 · 도보 7분',
        price: '3,500원 (개당)',
        tag: '쫀득빵',
        bookmarked: true,
      },
      {
        storeId: '6',
        name: '베이글 스토리',
        location: '용산 · 도보 9분',
        price: '4,200원 (개당)',
        tag: '쫀득빵',
        bookmarked: false,
      },
      {
        storeId: '1',
        name: '버터하우스',
        location: '성수2가 · 도보 6분',
        price: '4,800원 (개당)',
        tag: '쫀득빵',
        bookmarked: false,
      },
    ],
    reviews: [
      {
        storeId: '5',
        storeName: '쫀득베이커리',
        menuName: '쫀득빵',
        authorInitial: '빵',
        author: '빵순이',
        time: '2시간 전',
        matchRate: 88,
        satisfied: true,
        visitInfo: '아침에 방문 | 주말에 방문 | 웨이팅 12분',
        text: '쫀득빵 이름 그대로 진짜 쫀득해요! 한 입 베어물면 쫄깃한 식감이 최고예요.',
        imageCount: 3,
        verified: true,
        liked: false,
      },
      {
        storeId: '5',
        storeName: '쫀득베이커리',
        menuName: '쫀득빵',
        authorInitial: '우',
        author: '우유향',
        time: '4시간 전',
        matchRate: 79,
        satisfied: true,
        visitInfo: '오전에 방문 | 평일에 방문 | 웨이팅 5분',
        text: '버터와 우유 향이 진하고 겉바속쫀 식감이 확실해요. 따뜻할 때 먹는 게 제일 맛있습니다.',
        imageCount: 2,
        verified: false,
        liked: false,
      },
      {
        storeId: '6',
        storeName: '베이글 스토리',
        menuName: '쫀득빵',
        authorInitial: '브',
        author: '브런치족',
        time: '어제',
        matchRate: 71,
        satisfied: false,
        visitInfo: '점심에 방문 | 주말에 방문 | 웨이팅 20분',
        text: '쫀득함은 있는데 버터 향이 조금 약했어요. 그래도 식감은 만족스러웠습니다.',
        imageCount: 3,
        verified: false,
        liked: true,
      },
    ],
  },
  pumpkin: {
    newOpenStores: [
      {
        storeId: '3',
        name: '한떡',
        location: '서초 · 도보 4분',
        price: '2,500원 (개당)',
        tag: '호박인절미',
        bookmarked: false,
      },
      {
        storeId: '7',
        name: '달콤제과',
        location: '성수1가 · 도보 8분',
        price: '6,000원 (1박스)',
        tag: '호박인절미',
        bookmarked: false,
      },
      {
        storeId: '8',
        name: '무드케이크',
        location: '성수1가 · 도보 12분',
        price: '5,500원 (팩당)',
        tag: '호박인절미',
        bookmarked: false,
      },
    ],
    reviews: [
      {
        storeId: '3',
        storeName: '한떡',
        menuName: '호박인절미',
        authorInitial: '전',
        author: '전통맛',
        time: '30분 전',
        matchRate: 82,
        satisfied: true,
        visitInfo: '오후에 방문 | 평일에 방문 | 웨이팅 5분',
        text: '호박인절미가 정말 고소하고 쫀득해요. 전통 맛이 살아있어서 좋았습니다.',
        imageCount: 2,
        verified: true,
        liked: false,
      },
      {
        storeId: '3',
        storeName: '한떡',
        menuName: '호박인절미',
        authorInitial: '호',
        author: '호박사랑',
        time: '2시간 전',
        matchRate: 90,
        satisfied: true,
        visitInfo: '아침에 방문 | 주말에 방문 | 웨이팅 없음',
        text: '호박 향이 은은하고 콩가루 고소함이 잘 어울려요. 달지 않아서 부담 없이 먹기 좋아요.',
        imageCount: 3,
        verified: false,
        liked: true,
      },
      {
        storeId: '7',
        storeName: '달콤제과',
        menuName: '호박인절미',
        authorInitial: '떡',
        author: '떡순이',
        time: '5시간 전',
        matchRate: 58,
        satisfied: false,
        visitInfo: '오후에 방문 | 주말에 방문 | 웨이팅 15분',
        text: '맛은 괜찮은데 가격 대비 양이 아쉬워요. 호박 향은 좋았습니다.',
        imageCount: 1,
        verified: false,
        liked: false,
      },
    ],
  },
  mala: {
    newOpenStores: [
      {
        storeId: '4',
        name: '매운맛집',
        location: '강남 · 도보 6분',
        price: '5,000원 (1인분)',
        tag: '마라떡볶이',
        bookmarked: false,
      },
      {
        storeId: '8',
        name: '무드케이크',
        location: '성수1가 · 도보 12분',
        price: '6,500원 (1인분)',
        tag: '마라떡볶이',
        bookmarked: false,
      },
      {
        storeId: '7',
        name: '달콤제과',
        location: '성수1가 · 도보 8분',
        price: '5,500원 (1인분)',
        tag: '마라떡볶이',
        bookmarked: true,
      },
    ],
    reviews: [
      {
        storeId: '4',
        storeName: '매운맛집',
        menuName: '마라떡볶이',
        authorInitial: '멥',
        author: '맵찔이',
        time: '1시간 전',
        matchRate: 30,
        satisfied: true,
        visitInfo: '저녁에 방문 | 주말에 방문 | 웨이팅 20분',
        text: '마라 향이 진하면서도 떡이 쫄깃해서 정말 맛있어요! 매운 걸 좋아하신다면 꼭 드세요 🌶️',
        imageCount: 3,
        verified: true,
        liked: true,
      },
      {
        storeId: '4',
        storeName: '매운맛집',
        menuName: '마라떡볶이',
        authorInitial: '마',
        author: '마라킹',
        time: '10분 전',
        matchRate: 71,
        satisfied: true,
        visitInfo: '저녁에 방문 | 평일에 방문 | 웨이팅 20분',
        text: '마라 향이 진하면서도 떡이 쫄깃해요. 매운 걸 좋아한다면 강추합니다!',
        imageCount: 5,
        verified: true,
        liked: false,
      },
      {
        storeId: '4',
        storeName: '매운맛집',
        menuName: '마라떡볶이',
        authorInitial: '불',
        author: '불닭러버',
        time: '3시간 전',
        matchRate: 85,
        satisfied: false,
        visitInfo: '점심에 방문 | 평일에 방문 | 웨이팅 10분',
        text: '향은 좋은데 저한테는 너무 매웠어요. 마라 입문자는 1단계부터 추천해요.',
        imageCount: 2,
        verified: false,
        liked: false,
      },
    ],
  },
};

function reviewKey(tagId: TrendTagId, review: ExploreReview) {
  return `${tagId}:${review.storeId}:${review.author}`;
}

function SearchIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5Z"
        stroke="#9E9794"
        strokeWidth="1.6"
      />
      <path
        d="M10.5 10.5L14 14"
        stroke="#9E9794"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReviewPhotoPlaceholder() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden>
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

function NewOpenCard({
  store,
  onNavigate,
}: {
  store: NewOpenStore;
  onNavigate: () => void;
}) {
  return (
    <div className="relative shrink-0 w-[146px]">
      <button
        type="button"
        onClick={onNavigate}
        className="flex w-full flex-col-reverse overflow-hidden rounded-[14px] border-2 border-[#2e211c] bg-white text-left shadow-[0px_2px_10px_0_rgba(0,0,0,0.06)]"
      >
        <div className="flex flex-col gap-[3px] px-2.5 pt-2.5 pb-3">
          <p className="text-[13px] text-[#2e211c]">{store.name}</p>
          <p className="text-[11px] text-[#9e9794]">{store.location}</p>
          <p className="text-[11px] text-[#9e9794]">{store.price}</p>
          <span className="w-fit rounded-[20px] bg-[#f7f4f0] px-[7px] py-0.5 text-[10px] text-[#c06226]">
            {store.tag}
          </span>
        </div>
        <div className="flex h-[100px] items-start bg-[#f7f4f0] p-2">
          <span className="rounded-[20px] bg-[#c06226] px-[7px] py-0.5 text-[10px] font-bold text-white">
            NEW
          </span>
        </div>
      </button>
      {store.bookmarked && (
        <div className="pointer-events-none absolute right-2 top-2">
          <BookmarkIcon filled />
        </div>
      )}
    </div>
  );
}

function ExploreReviewCard({
  review,
  liked,
  onToggleLike,
  onNavigate,
  showMatchRate = true,
}: {
  review: ExploreReview;
  liked: boolean;
  onToggleLike: () => void;
  onNavigate: () => void;
  showMatchRate?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onNavigate}
      className="relative w-full rounded-2xl border-2 border-neutral-700 bg-white p-4 text-left"
    >
      <div className="mb-3 flex items-center gap-1.5">
        <p className="text-base text-[#2e211c]">{review.storeName}</p>
        <span className="rounded-md bg-[#2e211c] px-1.5 pt-0.5 text-[11px] text-white">
          {review.menuName}
        </span>
      </div>

      <div className="mb-3 flex items-end justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e211c]">
            <span className="text-xs text-white">{review.authorInitial}</span>
          </div>
          <div>
            <p className="text-sm text-[#2e211c]">{review.author}</p>
            <p className="text-xs text-[#9e9794]">{review.time}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {showMatchRate && (
            <span className="rounded-lg bg-[#9cb8b7] px-2 pt-[3px] text-[11px] text-[#2e211c]">
              취향 일치율 {review.matchRate}%
            </span>
          )}
          <span className="text-[28px] leading-none">{review.satisfied ? '🙂' : '🙁'}</span>
        </div>
      </div>

      <p className="mb-3 text-xs text-[#717171]">{review.visitInfo}</p>
      <p className="mb-3 line-clamp-2 text-sm text-[#2e211c]">{review.text}</p>

      <div className="mb-3 flex gap-2">
        {Array.from({ length: review.imageCount }).map((_, i) => (
          <div
            key={i}
            className="flex h-16 w-16 items-center justify-center rounded-[10px] bg-[#f7f4f0]"
          >
            <ReviewPhotoPlaceholder />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onToggleLike();
            }
          }}
          className="flex items-center gap-1"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" aria-hidden>
            <path
              d="M4.92316 13.4662C4.75221 13.4662 4.58855 13.3985 4.47029 13.2783C4.35203 13.1581 4.28636 12.9949 4.28636 12.8266V6.64121C4.28636 6.47289 4.35203 6.30967 4.47029 6.18948C4.58855 6.06929 4.75221 6.00162 4.92316 6.00162H6.51409L8.69502 2.27717C8.7747 2.13918 8.89304 2.02624 9.03614 1.95295C9.17925 1.87967 9.3411 1.84928 9.50136 1.86564C9.66161 1.88199 9.81361 1.94432 9.93944 2.04532C10.0652 2.14632 10.1594 2.28174 10.2109 2.43485L11.36 6.00162H13.2693C13.4402 6.00162 13.6039 6.06929 13.7222 6.18948C13.8404 6.30967 13.9061 6.47289 13.9061 6.64121V7.91775C13.9061 8.0117 13.8885 8.10482 13.8543 8.19218L11.8333 12.9865C11.7716 13.138 11.6638 13.2671 11.5241 13.3565C11.3844 13.4459 11.2195 13.4916 11.0513 13.4877H4.92316V13.4662ZM2.69596 6.64121V13.4662H1.42236V6.64121H2.69596Z"
              fill={liked ? '#4A90A4' : 'none'}
              stroke={liked ? '#4A90A4' : '#9CB8B7'}
              strokeWidth="1.28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`text-xs ${liked ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>공감</span>
        </span>
      </div>

      {review.verified && (
        <svg
          className="absolute right-4 top-[90px] h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          aria-label="영수증 인증"
        >
          <path
            d="M23 11.9991L20.56 9.21906L20.9 5.53906L17.29 4.71906L15.4 1.53906L12 2.99906L8.6 1.53906L6.71 4.71906L3.1 5.52906L3.44 9.20906L1 11.9991L3.44 14.7791L3.1 18.4691L6.71 19.2891L8.6 22.4691L12 20.9991L15.4 22.4591L17.29 19.2791L20.9 18.4591L20.56 14.7791L23 11.9991ZM10 16.9991L6 12.9991L7.41 11.5891L10 14.1691L16.59 7.57906L18 8.99906L10 16.9991Z"
            fill="#335352"
          />
        </svg>
      )}
    </button>
  );
}

export default function FoodsPage() {
  const navigate = useNavigate();
  const { showPersonalizedMetrics } = usePersonalizedMetrics();
  const [activeTag, setActiveTag] = useState<TrendTagId>('macao');
  const [likedReviews, setLikedReviews] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const review of TREND_CONTENT.macao.reviews) {
      if (review.liked) {
        initial.add(reviewKey('macao', review));
      }
    }
    return initial;
  });

  const { newOpenStores, reviews } = useMemo(
    () => TREND_CONTENT[activeTag],
    [activeTag],
  );

  const toggleLike = (key: string) => {
    setLikedReviews((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <div className="shrink-0 border-b border-[#ebebeb] px-[18px] pb-3 pt-3.5">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-lg border-2 border-[#2e211c] bg-white px-3.5 py-2.5"
          aria-label="매장, 메뉴, 동네 검색"
        >
          <span className="text-[13px] text-[#9e9794]">매장, 메뉴, 동네 검색</span>
          <SearchIcon />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pb-24">
        <div className="flex gap-[7px] overflow-x-auto px-[18px] py-3">
          {TREND_TAGS.map((tag) => {
            const isActive = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`shrink-0 rounded-[20px] border-2 px-[13px] py-1.5 text-[13px] transition-colors ${
                  isActive
                    ? 'border-[#2e211c] bg-[#335352] text-white'
                    : 'border-[#9e9794] bg-white text-[#9e9794]'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        <section className="flex flex-col gap-3.5 px-[18px] pt-2">
          <div className="flex items-center justify-between">
            <p className="text-[15px] text-[#1c1c1e]">신규 오픈</p>
            <button type="button" className="text-xs text-[#8a8a8e]">
              더보기 ›
            </button>
          </div>
          <div className="-mx-[18px] overflow-x-auto px-[18px] pb-1">
            <div className="flex gap-[11px]">
              {newOpenStores.map((store) => (
                <NewOpenCard
                  key={`${activeTag}-${store.storeId}`}
                  store={store}
                  onNavigate={() => navigate(`/store/${store.storeId}`)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2.5 px-[18px] pt-6 pb-5">
          <div className="flex items-center justify-between">
            <p className="text-[15px] text-[#1c1c1e]">지금 올라온 리뷰</p>
            <button
              type="button"
              onClick={() => navigate(`/food/${TREND_TAG_TO_FOOD_ID[activeTag]}/reviews`)}
              className="text-xs text-[#8a8a8e]"
            >
              더보기 ›
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {reviews.map((review) => {
              const key = reviewKey(activeTag, review);
              return (
                <ExploreReviewCard
                  key={key}
                  review={review}
                  liked={likedReviews.has(key)}
                  onToggleLike={() => toggleLike(key)}
                  onNavigate={() => navigate(`/store/${review.storeId}`)}
                  showMatchRate={showPersonalizedMetrics}
                />
              );
            })}
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => navigate('/liked-reviews')}
        className="fixed bottom-[88px] right-6 z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white shadow-[0px_2px_12px_rgba(0,0,0,0.12)]"
        aria-label="공감한 리뷰"
      >
        <svg className="h-[22px] w-[22px]" viewBox="0 0 22 22" fill="none" aria-hidden>
          <path
            d="M12.5866 2.97852C12.1806 2.98086 11.7859 3.11209 11.4594 3.35329C11.1328 3.59449 10.8913 3.93319 10.7698 4.32052L10.0346 6.60393C9.95288 6.86333 9.81448 7.1013 9.62942 7.3006C9.06834 7.90836 8.59671 8.59296 8.22875 9.33377H7.63109C7.35295 8.94883 6.95049 8.67167 6.49167 8.5491C6.22675 8.4776 5.92609 8.47852 5.57684 8.47852H5.42284C5.0745 8.47852 4.772 8.47852 4.508 8.5491C4.1584 8.64272 3.83959 8.82669 3.5836 9.08253C3.3276 9.33836 3.14343 9.65706 3.04959 10.0066C2.97809 10.2724 2.979 10.5731 2.979 10.9233V16.5763C2.979 16.9247 2.979 17.2272 3.04959 17.4912C3.14321 17.8408 3.32718 18.1596 3.58302 18.4156C3.83885 18.6716 4.15755 18.8558 4.50709 18.9496C4.77292 19.0211 5.07359 19.0211 5.42375 19.0202H5.57684C5.92517 19.0202 6.22767 19.0202 6.49167 18.9496C6.97514 18.8203 7.39509 18.5196 7.67325 18.1035H13.7498C14.9791 18.1035 15.8178 18.0503 16.4852 17.7671C17.0596 17.5223 17.5592 17.1302 17.9335 16.6304C18.3598 16.0639 18.5568 15.3233 18.8493 14.2269L18.8859 14.0913L19.5193 11.9215L19.5285 11.894C19.6752 11.4045 19.7971 10.9957 19.8677 10.6565C19.9392 10.3091 19.974 9.95618 19.8814 9.60235C19.7472 9.08133 19.4228 8.62941 18.9721 8.33552C18.6613 8.13477 18.3148 8.06418 17.9656 8.0321C17.6292 8.00093 17.2112 8.00093 16.7153 8.00093H14.6051C15.0937 6.44718 14.9333 5.19043 14.6693 4.35535C14.364 3.38552 13.4391 2.97852 12.6333 2.97852H12.5866ZM8.02159 16.7285V10.9223L8.02067 10.7088H9.10417L9.37367 10.1258C9.69431 9.43311 10.1211 8.79476 10.6387 8.23377C10.9595 7.88818 11.1988 7.47477 11.3445 7.02468L12.0778 4.74218C12.1102 4.63168 12.177 4.53439 12.2685 4.46448C12.36 4.39458 12.4715 4.3557 12.5866 4.35352H12.6333C13.0458 4.35352 13.2878 4.54602 13.3584 4.76968C13.5839 5.48377 13.7471 6.74052 12.9771 8.39877C12.9284 8.50352 12.9069 8.61884 12.9146 8.73409C12.9223 8.84933 12.9589 8.96079 13.021 9.05817C13.0831 9.15554 13.1687 9.2357 13.27 9.29124C13.3713 9.34678 13.4849 9.3759 13.6004 9.37593H16.6841C17.2194 9.37593 17.5733 9.37593 17.8391 9.40068C18.1003 9.42543 18.1874 9.46668 18.225 9.49052C18.3818 9.59135 18.5 9.7536 18.5513 9.94885C18.5651 10.002 18.5761 10.1111 18.5202 10.3797C18.4652 10.651 18.3598 11.003 18.2021 11.5292L18.2003 11.5338L17.5604 13.7209L17.5586 13.7283C17.213 15.0235 17.0792 15.4791 16.8344 15.8045C16.6054 16.1107 16.2996 16.351 15.948 16.5012C15.5731 16.6598 15.0075 16.7285 13.7498 16.7285H8.02159ZM4.86367 9.87643C4.92875 9.85902 5.02867 9.85352 5.49984 9.85352C5.97009 9.85352 6.07092 9.85902 6.136 9.87643C6.25248 9.90769 6.35869 9.96903 6.44396 10.0543C6.52924 10.1396 6.59058 10.2458 6.62184 10.3623C6.64017 10.4283 6.64567 10.5291 6.64567 10.9993V16.4993C6.64567 16.9696 6.64017 17.0704 6.62275 17.1355C6.5915 17.252 6.53016 17.3582 6.44488 17.4435C6.3596 17.5288 6.2534 17.5901 6.13692 17.6214C6.07092 17.6397 5.97009 17.6452 5.49984 17.6452C5.02959 17.6452 4.92875 17.6397 4.86367 17.6214C4.74719 17.5901 4.64099 17.5288 4.55571 17.4435C4.47044 17.3582 4.40909 17.252 4.37784 17.1355C4.3595 17.0704 4.354 16.9705 4.354 16.4993V10.9993C4.354 10.5291 4.36042 10.4283 4.37784 10.3632C4.40909 10.2467 4.47044 10.1405 4.55571 10.0552C4.64099 9.96995 4.74719 9.9086 4.86367 9.87735"
            fill="#2E211C"
          />
        </svg>
      </button>

      <BottomNavigation activeTab="explore" />
    </div>
  );
}

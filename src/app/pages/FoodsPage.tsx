import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import ExploreReviewCard from '../components/ExploreReviewCard';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import {
  BANGKOK_ROTI_FRY_FOOD_STORES,
  BANGKOK_ROTI_FRY_STORES,
  BANGKOK_ROTI_FRY_TRENDING_REVIEWS,
} from '../data/bangkokRotiFry.generated';
import {
  LA_CROTACO_FOOD_STORES,
  LA_CROTACO_STORES,
  LA_CROTACO_TRENDING_REVIEWS,
} from '../data/laCrotaco.generated';
import {
  MACAO_CRACK_COOKIE_FOOD_STORES,
  MACAO_CRACK_COOKIE_STORES,
  MACAO_CRACK_COOKIE_TRENDING_REVIEWS,
} from '../data/macaoCrackCookie.generated';
import type { Store } from '../data/stores';

const TREND_TAGS = [
  { id: 'macao', label: '마카오 크랙쿠키' },
  { id: 'bangkok', label: '방콕 로띠튀김' },
  { id: 'crotaco', label: 'LA 크로타코' },
] as const;

type TrendTagId = (typeof TREND_TAGS)[number]['id'];

const TREND_TAG_TO_FOOD_ID: Record<TrendTagId, string> = {
  macao: '1',
  bangkok: '2',
  crotaco: '3',
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

type TrendFoodConfig = {
  foodStores: readonly { storeId: string; name: string }[];
  stores: Record<string, Store>;
  trendingReviews: readonly {
    authorInitial: string;
    author: string;
    time: string;
    matchRate: number;
    satisfied: boolean;
    visitInfo: string;
    text: string;
    imageCount: number;
  }[];
  menuName: string;
  shortTag: string;
  exploreStoreIds: readonly string[];
};

function buildNewOpenStores(
  foodStores: TrendFoodConfig['foodStores'],
  stores: TrendFoodConfig['stores'],
  shortTag: string,
  limit?: number,
): NewOpenStore[] {
  const list = limit != null ? foodStores.slice(0, limit) : foodStores;
  return list.map(({ storeId, name }) => {
    const store = stores[storeId];
    return {
      storeId,
      name,
      location: `${store.location} · 도보 8분`,
      price: `${store.price} ${store.priceUnit}`,
      tag: shortTag,
      bookmarked: false,
    };
  });
}

function buildExploreReviews(config: TrendFoodConfig): ExploreReview[] {
  return config.trendingReviews.slice(0, 3).map((review, index) => {
    const storeId = config.exploreStoreIds[index] ?? config.foodStores[0]?.storeId;
    const store = config.stores[storeId];
    return {
      storeId: store.id,
      storeName: store.name,
      menuName: config.menuName,
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
  });
}

function buildTrendContent(config: TrendFoodConfig): TrendContent {
  return {
    newOpenStores: buildNewOpenStores(config.foodStores, config.stores, config.shortTag, 3),
    reviews: buildExploreReviews(config),
  };
}

const TREND_FOOD_CONFIGS: Record<TrendTagId, TrendFoodConfig> = {
  macao: {
    foodStores: MACAO_CRACK_COOKIE_FOOD_STORES,
    stores: MACAO_CRACK_COOKIE_STORES,
    trendingReviews: MACAO_CRACK_COOKIE_TRENDING_REVIEWS,
    menuName: '마카오 크랙쿠키',
    shortTag: '마카오크랙',
    exploreStoreIds: ['macao_cookie_01', 'macao_cookie_04', 'macao_cookie_05'],
  },
  bangkok: {
    foodStores: BANGKOK_ROTI_FRY_FOOD_STORES,
    stores: BANGKOK_ROTI_FRY_STORES,
    trendingReviews: BANGKOK_ROTI_FRY_TRENDING_REVIEWS,
    menuName: '방콕 로띠튀김',
    shortTag: '로띠튀김',
    exploreStoreIds: ['bangkok_roti_01', 'bangkok_roti_04', 'bangkok_roti_05'],
  },
  crotaco: {
    foodStores: LA_CROTACO_FOOD_STORES,
    stores: LA_CROTACO_STORES,
    trendingReviews: LA_CROTACO_TRENDING_REVIEWS,
    menuName: 'LA 크로타코',
    shortTag: '크로타코',
    exploreStoreIds: ['la_crotaco_01', 'la_crotaco_04', 'la_crotaco_05'],
  },
};

const TREND_CONTENT: Record<TrendTagId, TrendContent> = {
  macao: buildTrendContent(TREND_FOOD_CONFIGS.macao),
  bangkok: buildTrendContent(TREND_FOOD_CONFIGS.bangkok),
  crotaco: buildTrendContent(TREND_FOOD_CONFIGS.crotaco),
};

function reviewKey(tagId: TrendTagId, review: ExploreReview) {
  return `${tagId}:${review.storeId}:${review.author}`;
}

export { TREND_TAGS, type TrendTagId, type NewOpenStore };

export function getAllNewOpenStores(tagId: TrendTagId): NewOpenStore[] {
  const config = TREND_FOOD_CONFIGS[tagId];
  return buildNewOpenStores(config.foodStores, config.stores, config.shortTag);
}

export function getTrendTagLabel(tagId: TrendTagId): string {
  return TREND_TAGS.find((tag) => tag.id === tagId)?.label ?? '';
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


export default function FoodsPage() {
  const navigate = useNavigate();
  const { showPersonalizedMetrics } = usePersonalizedMetrics();
  const [activeTag, setActiveTag] = useState<TrendTagId>('macao');
  const [likedReviews, setLikedReviews] = useState<Set<string>>(() => new Set());

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
            <button
              type="button"
              onClick={() => navigate(`/foods/new-open/${activeTag}`)}
              className="text-xs text-[#8a8a8e]"
            >
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
                  verified={review.verified}
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

import { BANGKOK_ROTI_FRY_TRENDING_REVIEWS } from './bangkokRotiFry.generated';
import { LA_CROTACO_TRENDING_REVIEWS } from './laCrotaco.generated';
import { MACAO_CRACK_COOKIE_TRENDING_REVIEWS } from './macaoCrackCookie.generated';
import { FOOD_STORES, getFoodById } from './foods';

export type TrendingReview = {
  authorInitial: string;
  author: string;
  time: string;
  matchRate: number;
  satisfied: boolean;
  visitInfo: string;
  text: string;
  imageCount: number;
};

export type ExploreReview = TrendingReview & {
  storeId: string;
  storeName: string;
  menuName: string;
  verified: boolean;
};

const FOOD_MENU_SHORT_NAMES: Record<string, string> = {
  '1': '마카오 크랙쿠키',
  '2': '방콕 로띠튀김',
  '3': 'LA 크로타코',
};

const TRENDING_REVIEWS_BY_FOOD: Record<string, TrendingReview[]> = {
  '1': [...MACAO_CRACK_COOKIE_TRENDING_REVIEWS],
  '2': [...BANGKOK_ROTI_FRY_TRENDING_REVIEWS],
  '3': [...LA_CROTACO_TRENDING_REVIEWS],
};

export function getTrendingReviewsForFood(foodId: string): TrendingReview[] {
  return TRENDING_REVIEWS_BY_FOOD[foodId] ?? TRENDING_REVIEWS_BY_FOOD['1'];
}

export function getExploreReviewsForFood(foodId: string): ExploreReview[] {
  const food = getFoodById(foodId);
  const stores = FOOD_STORES[foodId] ?? [];
  const menuName = FOOD_MENU_SHORT_NAMES[foodId] ?? food.name;
  const reviews = getTrendingReviewsForFood(foodId);

  return reviews.map((review, index) => {
    const store = stores[index % Math.max(stores.length, 1)];
    return {
      storeId: store?.storeId ?? foodId,
      storeName: store?.name ?? food.name,
      menuName,
      authorInitial: review.authorInitial,
      author: review.author,
      time: review.time,
      matchRate: review.matchRate,
      satisfied: review.satisfied,
      visitInfo: review.visitInfo,
      text: review.text,
      imageCount: review.imageCount,
      verified: index === 0 && review.satisfied,
    };
  });
}

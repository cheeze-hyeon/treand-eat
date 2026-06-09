import { BANGKOK_ROTI_FRY_FOOD_STORES } from './bangkokRotiFry.generated';
import { LA_CROTACO_FOOD_STORES } from './laCrotaco.generated';
import { MACAO_CRACK_COOKIE_FOOD_STORES } from './macaoCrackCookie.generated';

export type Food = {
  id: string;
  name: string;
  category: string;
  price: string;
  matchRate: string;
  trendScore: number;
  similarUserTrendScore: number;
  reviewCount: number;
  storeCount: number;
  description: string;
  sampleCount: number;
  dailyReviews: number[];
};

export const FOODS: Food[] = [
  {
    id: '1',
    name: '마카오 크랙쿠키',
    category: '디저트',
    price: '평균 4,660원 (개당)',
    matchRate: '92%',
    trendScore: 79,
    similarUserTrendScore: 96,
    reviewCount: 180,
    storeCount: 5,
    sampleCount: 87,
    dailyReviews: [54, 51, 47, 38, 29, 19, 11],
    description:
      '마카오 에그타르트를 쿠키로 재해석한 바이럴 디저트. 겉은 바삭한 크랙 코팅, 속은 진한 커스터드가 들어 있어 반갈샷·크랙 소리가 SNS에서 화제가 된 메뉴입니다.',
  },
  {
    id: '2',
    name: '방콕 로띠튀김',
    category: '디저트',
    price: '평균 4,440원 (개당)',
    matchRate: '88%',
    trendScore: 79,
    similarUserTrendScore: 92,
    reviewCount: 176,
    storeCount: 5,
    sampleCount: 73,
    dailyReviews: [9, 15, 22, 31, 41, 52, 61],
    description:
      '태국 전통 길거리 음식인 로띠를 튀김 형태로 재해석한 바이럴 디저트. 겉은 얇고 바삭한 튀김 반죽, 속은 달콤한 과일, 연유, 누텔라 등의 다양한 필링으로 채워져 있어 SNS에서 화제가 된 메뉴입니다.',
  },
  {
    id: '3',
    name: 'LA 크로타코',
    category: '디저트',
    price: '평균 6,440원 (개당)',
    matchRate: '90%',
    trendScore: 79,
    similarUserTrendScore: 93,
    reviewCount: 188,
    storeCount: 5,
    sampleCount: 94,
    dailyReviews: [18, 31, 47, 55, 48, 36, 22],
    description:
      'LA 멕시칸 음식점에서 시작된 타코+크로와상 조합의 바이럴 메뉴. 바삭한 크로와상 안에 매콤한 타코 필링과 치즈, 살사, 사워크림이 들어 있어 단면 비주얼과 짭짤한 풍미로 SNS에서 화제가 된 메뉴입니다.',
  },
];

export const TRENDING_FOOD_IDS = ['1', '2', '3'] as const;

const MENU_TO_FOOD_ID: Record<string, string> = {
  '마카오 크랙쿠키': '1',
  '마카오크랙쿠키': '1',
  '방콕 로띠튀김': '2',
  '방콕로띠튀김': '2',
  'LA 크로타코': '3',
  'LA크로타코': '3',
  '크로타코': '3',
};

export function getFoodById(id: string | undefined): Food {
  return FOODS.find((food) => food.id === id) ?? FOODS[0];
}

export function getFoodIdByMenuName(menuName: string): string | undefined {
  return MENU_TO_FOOD_ID[menuName];
}

export function parseFoodPrice(price: string) {
  const match = price.match(/^평균 (.+?) (\(.+\))$/);

  return {
    amount: match?.[1] ?? price,
    unit: match?.[2] ?? '',
  };
}

export type FoodStore = {
  storeId: string;
  rank: number;
  name: string;
  listPrice?: string;
  priceDiff?: string;
};

export const FOOD_STORES: Record<string, FoodStore[]> = {
  '1': [...MACAO_CRACK_COOKIE_FOOD_STORES],
  '2': [...BANGKOK_ROTI_FRY_FOOD_STORES],
  '3': [...LA_CROTACO_FOOD_STORES],
};

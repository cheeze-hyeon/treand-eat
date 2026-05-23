import { MACAO_CRACK_COOKIE_FOOD_STORES } from './macaoCrackCookie.generated';

export type Food = {
  id: string;
  name: string;
  category: string;
  price: string;
  matchRate: string;
  trendScore: number;
  reviewCount: number;
  storeCount: number;
  description: string;
};

export const FOODS: Food[] = [
  {
    id: '1',
    name: '두바이 쫀득 쿠키',
    category: '디저트',
    price: '평균 6,000원 (개당)',
    matchRate: '90%',
    trendScore: 94,
    reviewCount: 1250,
    storeCount: 24,
    description:
      '피스타치오 스프레드와 카다이프의 고소하고 바삭한 속을 마시멜로의 쫀득한 겉부분으로 감싼 한국식 두바이 초콜릿 변주 디저트',
  },
  {
    id: '2',
    name: '버터떡',
    category: '간식',
    price: '평균 2,000원 (개당)',
    matchRate: '89%',
    trendScore: 88,
    reviewCount: 890,
    storeCount: 18,
    description:
      '중국 상하이식 ‘녠가오’에서 유래한 디저트로, 찹쌀가루와 타피오카 전분 반죽에 우유와 버터를 넣어 구워 겉은 바삭하고 속은 쫀득한 구움과자 느낌의 디저트',
  },
  {
    id: '3',
    name: '호박인절미',
    category: '한식',
    price: '평균 6,000원 (팩당)',
    matchRate: '62%',
    trendScore: 91,
    reviewCount: 2100,
    storeCount: 12,
    description:
      '호박을 넣어 만든 쫀득한 인절미로, 고소한 콩가루와 달콤한 호박 향이 어우러진 전통 간식',
  },
  {
    id: '4',
    name: '마라떡볶이',
    category: '한식',
    price: '평균 5,000원 (1인분)',
    matchRate: '78%',
    trendScore: 86,
    reviewCount: 1560,
    storeCount: 31,
    description:
      '마라 소스의 알싸한 매운맛과 쫀득한 떡볶이가 어우러진 요즘 핫한 길거리 간식',
  },
  {
    id: '5',
    name: '쫀득빵',
    category: '카페',
    price: '평균 3,500원 (개당)',
    matchRate: '85%',
    trendScore: 82,
    reviewCount: 720,
    storeCount: 15,
    description:
      '겉은 바삭하고 속은 쫀득한 식감의 베이커리 빵으로, 버터와 우유 향이 진한 디저트',
  },
  {
    id: '6',
    name: '베이글샌드',
    category: '카페',
    price: '평균 6,500원 (개당)',
    matchRate: '82%',
    trendScore: 79,
    reviewCount: 540,
    storeCount: 9,
    description:
      '쫀득한 베이글에 크림치즈와 신선한 재료를 넣어 만든 브런치 인기 메뉴',
  },
  {
    id: '7',
    name: '마카오 크랙쿠키',
    category: '디저트',
    price: '평균 4,660원 (개당)',
    matchRate: '77%',
    trendScore: 79,
    reviewCount: 180,
    storeCount: 5,
    description:
      '마카오 에그타르트를 쿠키로 재해석한 바이럴 디저트. 겉은 바삭한 크랙 코팅, 속은 진한 커스터드가 들어 있어 반갈샷·크랙 소리가 SNS에서 화제가 된 메뉴입니다.',
  },
];

export const TRENDING_FOOD_IDS = ['7', '1', '2', '3'] as const;

const MENU_TO_FOOD_ID: Record<string, string> = {
  '두바이 쫀득 쿠키': '1',
  '두쫀쿠': '1',
  '버터떡': '2',
  '호박인절미': '3',
  '창억떡': '3',
  '마라떡볶이': '4',
  '쫀득빵': '5',
  '베이글샌드': '6',
  '마카오 크랙쿠키': '7',
  '마카오크랙쿠키': '7',
};

export function getFoodById(id: string | undefined): Food {
  return FOODS.find((food) => food.id === id) ?? FOODS[1];
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
  '1': [{ storeId: '1', rank: 1, name: '미엘 케이커리' }],
  '2': [
    { storeId: '1', rank: 1, name: '미엘 케이커리', listPrice: '1500', priceDiff: '500' },
    { storeId: '2', rank: 2, name: '떡앤카페' },
  ],
  '3': [{ storeId: '3', rank: 1, name: '한떡' }],
  '4': [{ storeId: '4', rank: 1, name: '매운맛집' }],
  '5': [{ storeId: '5', rank: 1, name: '쫀득베이커리' }],
  '6': [{ storeId: '6', rank: 1, name: '베이글 스토리' }],
  '7': [...MACAO_CRACK_COOKIE_FOOD_STORES],
};

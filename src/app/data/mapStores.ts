import {
  getFoodAveragePriceAmount,
  getPriceDiffFromAverage,
} from '../utils/priceDiff';
import { MACAO_CRACK_COOKIE_MAP_STORES } from './macaoCrackCookie.generated';

export type MapMetricMode = 'preference' | 'trend';

export type MapStore = {
  id: string;
  name: string;
  highlightMenu: string;
  categories: string[];
  position: { xPercent: number; yPercent: number };
  preferenceMatch: number;
  trendScore: number;
  price: number;
  priceDrop?: number;
  waitingMinutes: number;
  reviewCount: number;
  district: string;
};

export const MAP_CATEGORIES = [
  '전체',
  '두바이쫀득쿠키',
  '버터떡',
  '크로플',
  '호박인절미',
  '소금빵',
  '티라미수',
  '마카오크랙쿠키',
] as const;

export type MapCategory = (typeof MAP_CATEGORIES)[number];

export const MAP_STORES: MapStore[] = [
  {
    id: '1',
    name: '미엘 케이커리',
    highlightMenu: '버터떡',
    categories: ['버터떡', '두바이쫀득쿠키'],
    position: { xPercent: 27.5, yPercent: 62 },
    preferenceMatch: 93,
    trendScore: 94,
    price: 1500,
    priceDrop: 500,
    waitingMinutes: 15,
    reviewCount: 404,
    district: '서울 마포구',
  },
  {
    id: '7',
    name: '달콤제과',
    highlightMenu: '쑥인절미',
    categories: ['호박인절미'],
    position: { xPercent: 89, yPercent: 40 },
    preferenceMatch: 81,
    trendScore: 85,
    price: 2500,
    waitingMinutes: 10,
    reviewCount: 102,
    district: '서울 성수동',
  },
  {
    id: '8',
    name: '무드케이크',
    highlightMenu: '크로플',
    categories: ['크로플'],
    position: { xPercent: 41, yPercent: 58 },
    preferenceMatch: 74,
    trendScore: 78,
    price: 4500,
    waitingMinutes: 12,
    reviewCount: 198,
    district: '서울 성수동',
  },
  ...MACAO_CRACK_COOKIE_MAP_STORES,
];

export function getMapStorePriceDiff(store: MapStore) {
  const avgPrice = getFoodAveragePriceAmount(store.highlightMenu);
  if (avgPrice != null) {
    return getPriceDiffFromAverage(store.price, avgPrice);
  }
  if (store.priceDrop != null) {
    return { direction: 'below' as const, amount: store.priceDrop };
  }
  return null;
}

export function formatMarkerLabel(store: MapStore, mode: MapMetricMode): string {
  return mode === 'preference'
    ? `${store.preferenceMatch}% 일치`
    : `${store.trendScore}점`;
}

export function filterMapStores(
  stores: MapStore[],
  category: string,
  searchQuery: string,
): MapStore[] {
  const query = searchQuery.trim().toLowerCase();

  return stores.filter((store) => {
    const matchesCategory =
      category === '전체' || store.categories.includes(category);
    const matchesSearch =
      query.length === 0 ||
      store.name.toLowerCase().includes(query) ||
      store.highlightMenu.toLowerCase().includes(query) ||
      store.categories.some((c) => c.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

export function getMapStoreById(id: string | null): MapStore | undefined {
  if (!id) return undefined;
  return MAP_STORES.find((s) => s.id === id);
}

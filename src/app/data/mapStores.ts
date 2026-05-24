import {
  getFoodAveragePriceAmount,
  getPriceDiffFromAverage,
} from '../utils/priceDiff';
import { BANGKOK_ROTI_FRY_MAP_STORES } from './bangkokRotiFry.generated';
import { LA_CROTACO_MAP_STORES } from './laCrotaco.generated';
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
  '마카오크랙쿠키',
  '방콕로띠튀김',
  'LA크로타코',
] as const;

export type MapCategory = (typeof MAP_CATEGORIES)[number];

export const MAP_STORES: MapStore[] = [
  ...MACAO_CRACK_COOKIE_MAP_STORES,
  ...BANGKOK_ROTI_FRY_MAP_STORES,
  ...LA_CROTACO_MAP_STORES,
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

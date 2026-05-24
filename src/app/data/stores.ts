import { BANGKOK_ROTI_FRY_STORES } from './bangkokRotiFry.generated';
import { LA_CROTACO_STORES } from './laCrotaco.generated';
import { MACAO_CRACK_COOKIE_STORES } from './macaoCrackCookie.generated';

export type StoreReview = {
  author: string;
  authorInitial: string;
  time: string;
  satisfied: boolean;
  matchRate: number;
  visitTime: string;
  visitDay: string;
  waiting: string;
  text: string;
  imageCount: number;
};

export type Store = {
  id: string;
  name: string;
  menuName: string;
  location: string;
  price: string;
  priceUnit: string;
  waitingTime: string;
  reviewCount: number;
  avgScore: number;
  similarScore: number;
  reviews: StoreReview[];
};

export const STORES: Record<string, Store> = {
  ...MACAO_CRACK_COOKIE_STORES,
  ...BANGKOK_ROTI_FRY_STORES,
  ...LA_CROTACO_STORES,
};

export function getStoreById(id: string | undefined): Store {
  return STORES[id ?? 'macao_cookie_01'] ?? STORES['macao_cookie_01'];
}

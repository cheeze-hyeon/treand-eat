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
  '1': {
    id: '1',
    name: '미엘 케이커리',
    menuName: '버터떡',
    location: '서울 마포구',
    price: '2000원',
    priceUnit: '(개당)',
    waitingTime: '15분',
    reviewCount: 404,
    avgScore: 92,
    similarScore: 95,
    reviews: [
      {
        author: '쫀득파',
        authorInitial: '쫀',
        time: '방금 전',
        satisfied: true,
        matchRate: 68,
        visitTime: '저녁에 방문',
        visitDay: '평일에 방문',
        waiting: '웨이팅 15분',
        text: '진짜 쫀득하고 버터향이 강해서 멀리서 와도 먹을 만해요. 겉은 쫀득하고 안은 바삭해서 식감이 독특해요.',
        imageCount: 4,
      },
    ],
  },
  '2': {
    id: '2',
    name: '떡앤카페',
    menuName: '버터떡',
    location: '서울 관악구',
    price: '3000원',
    priceUnit: '(개당)',
    waitingTime: '10분',
    reviewCount: 289,
    avgScore: 88,
    similarScore: 91,
    reviews: [
      {
        author: '떡러버',
        authorInitial: '떡',
        time: '1시간 전',
        satisfied: true,
        matchRate: 75,
        visitTime: '점심에 방문',
        visitDay: '주말에 방문',
        waiting: '웨이팅 10분',
        text: '버터 향이 진하고 떡이 쫀득해요. 고소한 맛이 일품입니다. 커피랑 환상 조합!',
        imageCount: 3,
      },
    ],
  },
  '3': {
    id: '3',
    name: '한떡',
    menuName: '호박인절미',
    location: '서울 서초구',
    price: '2500원',
    priceUnit: '(개당)',
    waitingTime: '5분',
    reviewCount: 312,
    avgScore: 85,
    similarScore: 89,
    reviews: [
      {
        author: '전통맛',
        authorInitial: '전',
        time: '30분 전',
        satisfied: true,
        matchRate: 82,
        visitTime: '오후에 방문',
        visitDay: '평일에 방문',
        waiting: '웨이팅 5분',
        text: '호박인절미가 정말 고소하고 쫀득해요. 전통 맛이 살아있어서 좋았습니다.',
        imageCount: 2,
      },
    ],
  },
  '4': {
    id: '4',
    name: '매운맛집',
    menuName: '마라떡볶이',
    location: '서울 강남구',
    price: '5000원',
    priceUnit: '(1인분)',
    waitingTime: '20분',
    reviewCount: 567,
    avgScore: 78,
    similarScore: 84,
    reviews: [
      {
        author: '마라킹',
        authorInitial: '마',
        time: '10분 전',
        satisfied: true,
        matchRate: 71,
        visitTime: '저녁에 방문',
        visitDay: '평일에 방문',
        waiting: '웨이팅 20분',
        text: '마라 향이 진하면서도 떡이 쫄깃해요. 매운 걸 좋아한다면 강추합니다!',
        imageCount: 5,
      },
    ],
  },
  '5': {
    id: '5',
    name: '쫀득베이커리',
    menuName: '쫀득빵',
    location: '서울 마포구',
    price: '3500원',
    priceUnit: '(개당)',
    waitingTime: '12분',
    reviewCount: 423,
    avgScore: 90,
    similarScore: 93,
    reviews: [
      {
        author: '빵순이',
        authorInitial: '빵',
        time: '2시간 전',
        satisfied: true,
        matchRate: 88,
        visitTime: '아침에 방문',
        visitDay: '주말에 방문',
        waiting: '웨이팅 12분',
        text: '쫀득빵 이름 그대로 진짜 쫀득해요! 한 입 베어물면 쫄깃한 식감이 최고예요.',
        imageCount: 3,
      },
    ],
  },
  '6': {
    id: '6',
    name: '베이글 스토리',
    menuName: '베이글샌드',
    location: '서울 용산구',
    price: '6500원',
    priceUnit: '(개당)',
    waitingTime: '8분',
    reviewCount: 256,
    avgScore: 82,
    similarScore: 86,
    reviews: [
      {
        author: '샌드위치',
        authorInitial: '샌',
        time: '5시간 전',
        satisfied: true,
        matchRate: 79,
        visitTime: '점심에 방문',
        visitDay: '평일에 방문',
        waiting: '웨이팅 8분',
        text: '베이글이 쫄깃하고 속 재료들이 신선해요. 든든한 한 끼로 최고입니다!',
        imageCount: 4,
      },
    ],
  },
  '7': {
    id: '7',
    name: '달콤제과',
    menuName: '쑥인절미',
    location: '서울 성수동',
    price: '2500원',
    priceUnit: '(개당)',
    waitingTime: '10분',
    reviewCount: 102,
    avgScore: 86,
    similarScore: 88,
    reviews: [
      {
        author: '디저트러버',
        authorInitial: '디',
        time: '2시간 전',
        satisfied: true,
        matchRate: 72,
        visitTime: '오후에 방문',
        visitDay: '주말에 방문',
        waiting: '웨이팅 10분',
        text: '쑥인절미가 고소하고 달지 않아서 좋아요.',
        imageCount: 2,
      },
    ],
  },
  '8': {
    id: '8',
    name: '무드케이크',
    menuName: '크로플',
    location: '서울 성수동',
    price: '4500원',
    priceUnit: '(개당)',
    waitingTime: '12분',
    reviewCount: 198,
    avgScore: 84,
    similarScore: 87,
    reviews: [
      {
        author: '카페인',
        authorInitial: '카',
        time: '3시간 전',
        satisfied: true,
        matchRate: 70,
        visitTime: '점심에 방문',
        visitDay: '평일에 방문',
        waiting: '웨이팅 12분',
        text: '크로플이 바삭하고 시원한 아이스크림과 잘 어울려요.',
        imageCount: 3,
      },
    ],
  },
  ...MACAO_CRACK_COOKIE_STORES,
};

export function getStoreById(id: string | undefined): Store {
  return STORES[id ?? '1'] ?? STORES['1'];
}

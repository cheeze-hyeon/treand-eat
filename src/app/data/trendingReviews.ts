import { MACAO_CRACK_COOKIE_TRENDING_REVIEWS } from './macaoCrackCookie.generated';

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

export function getTrendingReviewsForFood(foodId: string): TrendingReview[] {
  if (foodId === '7') {
    return [...MACAO_CRACK_COOKIE_TRENDING_REVIEWS];
  }
  return TRENDING_REVIEWS;
}

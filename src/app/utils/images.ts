const MACAO_PROMO = [
  '/images/macao/promo_01_macao_crack_cookie_diverse_panel_01.jpg',
  '/images/macao/promo_02_macao_crack_cookie_diverse_panel_03.jpg',
  '/images/macao/promo_03_macao_crack_cookie_diverse_panel_05.jpg',
  '/images/macao/promo_04_macao_crack_cookie_diverse_panel_13.jpg',
  '/images/macao/promo_05_macao_crack_cookie_diverse_panel_15.jpg',
  '/images/macao/promo_06_macao_crack_cookie_diverse_panel_29.jpg',
];

const BANGKOK_PROMO = [
  '/images/bangkok/promo_01_bangkok_roti_fried_panel_01.jpg',
  '/images/bangkok/promo_02_bangkok_roti_fried_panel_02.jpg',
  '/images/bangkok/promo_03_bangkok_roti_fried_panel_03.jpg',
  '/images/bangkok/promo_04_bangkok_roti_fried_panel_04.jpg',
  '/images/bangkok/promo_05_bangkok_roti_fried_panel_05.jpg',
  '/images/bangkok/promo_06_bangkok_roti_fried_panel_06.jpg',
];

const CROTACO_PROMO = [
  '/images/crotaco/promo_01_la_crotaco_diverse_panel_01.jpg',
  '/images/crotaco/promo_02_la_crotaco_diverse_panel_03.jpg',
  '/images/crotaco/promo_03_la_crotaco_diverse_panel_06.jpg',
  '/images/crotaco/promo_04_la_crotaco_diverse_panel_07.jpg',
  '/images/crotaco/promo_05_la_crotaco_diverse_panel_15.jpg',
  '/images/crotaco/promo_06_la_crotaco_diverse_panel_30.jpg',
];

const MACAO_REVIEWS = Array.from({ length: 24 }, (_, i) => {
  const panels = [2,4,6,7,8,9,10,11,12,14,16,17,18,19,20,21,22,23,24,25,26,27,28,30];
  return `/images/macao/review_${String(i + 1).padStart(2, '0')}_macao_crack_cookie_diverse_panel_${String(panels[i]).padStart(2, '0')}.jpg`;
});

const BANGKOK_REVIEWS = Array.from({ length: 24 }, (_, i) => {
  const panels = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  return `/images/bangkok/review_${String(i + 1).padStart(2, '0')}_bangkok_roti_fried_panel_${String(panels[i]).padStart(2, '0')}.jpg`;
});

const CROTACO_REVIEWS = Array.from({ length: 24 }, (_, i) => {
  const panels = [2,4,5,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
  return `/images/crotaco/review_${String(i + 1).padStart(2, '0')}_la_crotaco_diverse_panel_${String(panels[i]).padStart(2, '0')}.jpg`;
});

function getPoolByMenuName(menuName: string): { promo: string[]; reviews: string[] } {
  if (menuName.includes('마카오') || menuName.includes('크랙')) {
    return { promo: MACAO_PROMO, reviews: MACAO_REVIEWS };
  }
  if (menuName.includes('방콕') || menuName.includes('로띠')) {
    return { promo: BANGKOK_PROMO, reviews: BANGKOK_REVIEWS };
  }
  return { promo: CROTACO_PROMO, reviews: CROTACO_REVIEWS };
}

function getPoolByFoodId(foodId: string): { promo: string[]; reviews: string[] } {
  if (foodId === '1') return { promo: MACAO_PROMO, reviews: MACAO_REVIEWS };
  if (foodId === '2') return { promo: BANGKOK_PROMO, reviews: BANGKOK_REVIEWS };
  return { promo: CROTACO_PROMO, reviews: CROTACO_REVIEWS };
}

export function getFoodPromoImage(foodId: string): string {
  return getPoolByFoodId(foodId).promo[0];
}

export function getStorePromoImages(menuName: string, count = 4): string[] {
  const { promo } = getPoolByMenuName(menuName);
  return Array.from({ length: count }, (_, i) => promo[i % promo.length]);
}

export function getReviewImages(menuName: string, reviewIndex: number, count: number): string[] {
  const { reviews } = getPoolByMenuName(menuName);
  return Array.from({ length: count }, (_, i) => reviews[(reviewIndex * 4 + i) % reviews.length]);
}

export function getPromoImageByIndex(menuName: string, index: number): string {
  const { promo } = getPoolByMenuName(menuName);
  return promo[index % promo.length];
}

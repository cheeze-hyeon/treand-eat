/** 트렌드 단위 가상 디저트 — 여러 매장에서 판매되는 메뉴 묶음 */
export type VirtualDessert = {
  id: string;
  name: string;
  foodId: string;
  description: string;
  storeItemIds: string[];
};

export const VIRTUAL_DESSERTS: VirtualDessert[] = [
  {
    id: 'dessert_macao_crack_cookie',
    name: '마카오 크랙쿠키',
    foodId: '7',
    description:
      '마카오 에그타르트를 쿠키로 재해석한 바이럴 디저트. 겉은 바삭한 크랙 코팅, 속은 진한 커스터드가 들어 있어 반갈샷·크랙 소리가 SNS에서 화제가 된 메뉴입니다.',
    storeItemIds: [
      'macao_cookie_01',
      'macao_cookie_02',
      'macao_cookie_03',
      'macao_cookie_04',
      'macao_cookie_05',
    ],
  },
];

export function getVirtualDessertByFoodId(foodId: string): VirtualDessert | undefined {
  return VIRTUAL_DESSERTS.find((dessert) => dessert.foodId === foodId);
}

export function getVirtualDessertById(id: string): VirtualDessert | undefined {
  return VIRTUAL_DESSERTS.find((dessert) => dessert.id === id);
}

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
    foodId: '1',
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
  {
    id: 'dessert_bangkok_roti_fry',
    name: '방콕 로띠튀김',
    foodId: '2',
    description:
      '태국 전통 길거리 음식인 로띠를 튀김 형태로 재해석한 바이럴 디저트. 겉은 얇고 바삭한 튀김 반죽, 속은 달콤한 과일, 연유, 누텔라 등의 다양한 필링으로 채워져 있어 SNS에서 화제가 된 메뉴입니다.',
    storeItemIds: [
      'bangkok_roti_01',
      'bangkok_roti_02',
      'bangkok_roti_03',
      'bangkok_roti_04',
      'bangkok_roti_05',
    ],
  },
  {
    id: 'dish_la_crotaco',
    name: 'LA 크로타코',
    foodId: '3',
    description:
      'LA 멕시칸 음식점에서 시작된 타코+크로와상 조합의 바이럴 메뉴. 바삭한 크로와상 안에 매콤한 타코 필링과 치즈, 살사, 사워크림이 들어 있어 단면 비주얼과 짭짤한 풍미로 SNS에서 화제가 된 메뉴입니다.',
    storeItemIds: [
      'la_crotaco_01',
      'la_crotaco_02',
      'la_crotaco_03',
      'la_crotaco_04',
      'la_crotaco_05',
    ],
  },
];

export function getVirtualDessertByFoodId(foodId: string): VirtualDessert | undefined {
  return VIRTUAL_DESSERTS.find((dessert) => dessert.foodId === foodId);
}

export function getVirtualDessertById(id: string): VirtualDessert | undefined {
  return VIRTUAL_DESSERTS.find((dessert) => dessert.id === id);
}

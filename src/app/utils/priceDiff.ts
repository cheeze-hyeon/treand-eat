import { getFoodById, getFoodIdByMenuName, parseFoodPrice } from '../data/foods';

export type PriceDiffDirection = 'below' | 'above';

export type PriceDiff = {
  direction: PriceDiffDirection;
  amount: number;
};

export function parsePriceNumber(price: string | number): number | null {
  const num =
    typeof price === 'number'
      ? price
      : Number.parseInt(price.replace(/\D/g, ''), 10);
  return Number.isNaN(num) ? null : num;
}

export function formatPriceDiffAmount(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

export function getPriceDiffFromAverage(
  storePrice: string | number,
  avgPrice: string | number,
): PriceDiff | null {
  const storeNum = parsePriceNumber(storePrice);
  const avgNum = parsePriceNumber(avgPrice);
  if (storeNum == null || avgNum == null || storeNum === avgNum) return null;

  if (storeNum < avgNum) {
    return { direction: 'below', amount: avgNum - storeNum };
  }

  return { direction: 'above', amount: storeNum - avgNum };
}

export function getFoodAveragePriceAmount(menuName: string): number | null {
  const foodId = getFoodIdByMenuName(menuName);
  if (!foodId) return null;

  const { amount } = parseFoodPrice(getFoodById(foodId).price);
  return parsePriceNumber(amount);
}

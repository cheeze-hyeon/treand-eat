import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import svgPaths from '../../imports/마이페이지본인이보는/svg-efmvaixmp8';
import { FOODS, TRENDING_FOOD_IDS } from '../data/foods';

type ChartSortMode = 'match' | 'trend' | 'reviews';

const SORT_OPTIONS: { value: ChartSortMode; label: string }[] = [
  { value: 'match', label: '취향 일치순' },
  { value: 'trend', label: '전체 유저 트렌딜리셔스 지수순' },
  { value: 'reviews', label: '리뷰 많은순' },
];

function parseMatchRate(matchRate: string) {
  return Number.parseInt(matchRate, 10);
}

function sortTrendingFoodIds(mode: ChartSortMode) {
  return [...TRENDING_FOOD_IDS].sort((a, b) => {
    const foodA = FOODS.find((item) => item.id === a)!;
    const foodB = FOODS.find((item) => item.id === b)!;

    if (mode === 'match') {
      return parseMatchRate(foodB.matchRate) - parseMatchRate(foodA.matchRate);
    }
    if (mode === 'trend') {
      return foodB.trendScore - foodA.trendScore;
    }
    return foodB.reviewCount - foodA.reviewCount;
  });
}

export default function HomePage() {
  const navigate = useNavigate();
  const [sortMode, setSortMode] = useState<ChartSortMode>('match');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const chartItems = useMemo(() => {
    return sortTrendingFoodIds(sortMode).map((foodId, index) => {
      const food = FOODS.find((item) => item.id === foodId)!;

      return {
        rank: index + 1,
        foodId,
        name: food.name,
        price: food.price,
        matchRate: food.matchRate,
        description: food.description,
      };
    });
  }, [sortMode]);

  const currentSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortMode)?.label ?? '취향 일치순';

  return (
    <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
      <div className="flex h-[79px] shrink-0 items-center justify-between px-4 py-[17px] bg-white">
        <p className="font-bold text-[30px] leading-[36px] whitespace-nowrap">
          <span className="text-[#2e211c]">Trend</span>
          <span className="text-[#9cb8b7]">EAT</span>
        </p>
        <div className="h-[20px] w-[18px]">
          <svg className="block size-full" fill="none" viewBox="0 0 20.0002 21.9965">
            <path
              d={svgPaths.p76feb0}
              stroke="#2e211c"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d={svgPaths.p9601900}
              stroke="#2e211c"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] pt-[22px] pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[#2e211c] text-base">트렌딧 차트</p>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen((open) => !open)}
                className="flex items-center gap-1"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <p className="font-bold text-[#8a8a8e] text-xs">{currentSortLabel}</p>
                <svg
                  className={`w-3 h-3 transition-transform ${isSortOpen ? '-rotate-90' : 'rotate-90'}`}
                  fill="none"
                  viewBox="0 0 7.071 12.728"
                >
                  <path
                    d={svgPaths.p1ad99240}
                    stroke="#8a8a8e"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              {isSortOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full z-10 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-[#e5e2de] bg-white py-1 shadow-[0px_4px_12px_#00000014]"
                >
                  {SORT_OPTIONS.map((option) => (
                    <li key={option.value} role="option" aria-selected={sortMode === option.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setSortMode(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs font-bold transition-colors hover:bg-[#f7f4f0] ${
                          sortMode === option.value ? 'text-[#2e211c]' : 'text-[#8a8a8e]'
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {chartItems.map((item) => (
            <button
              key={item.foodId}
              type="button"
              onClick={() => navigate(`/food/${item.foodId}`)}
              className="flex flex-col bg-white rounded-[14px] overflow-hidden border-2 border-solid border-[#2e211c] shadow-[0px_2px_10px_#0000000f] text-left transition-colors hover:bg-[#f9f9f9]"
            >
              <div className="flex h-[63px] items-center gap-[9px] px-[13px] py-2">
                <div className="flex w-[34px] h-8 items-center justify-center bg-[#c06226] rounded-[20px]">
                  <span className="font-bold text-white text-xl">{item.rank}</span>
                </div>
                <div className="flex flex-col flex-1 gap-[5px]">
                  <p className="font-bold text-[#2e211c] text-base">{item.name}</p>
                  <p className="font-extrabold text-[#9d9693] text-[10px]">{item.price}</p>
                </div>
                <div className="flex w-[100px] h-[31px] items-center justify-center bg-[#9cb8b7] rounded-lg">
                  <p className="font-extrabold text-[#2e211c] text-[13px] whitespace-nowrap">
                    취향일치도 {item.matchRate}
                  </p>
                </div>
              </div>
              <div className="h-[170px] bg-[#f7f4f0]" />
              <div className="flex flex-col gap-[9px] pt-2.5 pb-[13px] px-[13px]">
                <p className=" text-[#2e211c] text-xs leading-[19.2px]">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { FOODS, TRENDING_FOOD_IDS } from '../data/foods';
import { getFoodPromoImage } from '../utils/images';

type ChartSortMode = 'match' | 'trend' | 'reviews' | 'satisfied' | 'unsatisfied';

type RankingChange =
  | { type: 'up'; value: number }
  | { type: 'down'; value: number }
  | { type: 'new' };

type ReviewRankingItem = {
  rank: number;
  label: string;
  change: RankingChange;
  reviewCount: number;
  foodId?: string;
};

const USER_NAME = '김트민';

const SORT_OPTIONS: { value: ChartSortMode; label: string }[] = [
  { value: 'match', label: '나와 비슷한 유저 트렌딧 지수순' },
  { value: 'trend', label: '전체 유저 트렌딧 지수순' },
  { value: 'reviews', label: '리뷰 많은 순' },
  { value: 'satisfied', label: '만족도 높은 순' },
  { value: 'unsatisfied', label: '만족도 낮은 순' },
];

const REVIEW_RANKING: ReviewRankingItem[] = [
  { rank: 1, label: '오븐스테이 성수 마카오 크랙쿠키', change: { type: 'new' }, reviewCount: 52, foodId: '1' },
  { rank: 2, label: '로띠스팟 성수 방콕 로띠튀김', change: { type: 'up', value: 2 }, reviewCount: 49, foodId: '2' },
  { rank: 3, label: '타코무드 성수 LA 크로타코', change: { type: 'up', value: 1 }, reviewCount: 54, foodId: '3' },
  { rank: 4, label: '버터문 연무장 방콕 로띠튀김', change: { type: 'new' }, reviewCount: 18, foodId: '2' },
  { rank: 5, label: '칠리브라운 연무장 LA 크로타코', change: { type: 'new' }, reviewCount: 19, foodId: '3' },
];

const FIRST_INTRODUCED: Record<string, string> = {
  '1': '2026.05.20',
  '2': '2026.05.18',
  '3': '2026.05.15',
};

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function sortTrendingFoodIds(mode: ChartSortMode) {
  return [...TRENDING_FOOD_IDS].sort((a, b) => {
    const foodA = FOODS.find((item) => item.id === a)!;
    const foodB = FOODS.find((item) => item.id === b)!;

    if (mode === 'match') {
      return foodB.similarUserTrendScore - foodA.similarUserTrendScore;
    }
    if (mode === 'trend') {
      return foodB.trendScore - foodA.trendScore;
    }
    if (mode === 'satisfied') {
      return parseFloat(foodB.matchRate) - parseFloat(foodA.matchRate);
    }
    if (mode === 'unsatisfied') {
      return parseFloat(foodA.matchRate) - parseFloat(foodB.matchRate);
    }
    return foodB.reviewCount - foodA.reviewCount;
  });
}

function RankingChangeBadge({ change }: { change: RankingChange }) {
  if (change.type === 'new') {
    return <span className="text-[10px] text-[#6a7282]">NEW</span>;
  }
  if (change.type === 'up') {
    return (
      <span className="text-[10px] text-[#fb2c36]">
        ▲ {change.value}
      </span>
    );
  }
  return (
    <span className="text-[10px] text-[#2b7fff]">
      ▼ {change.value}
    </span>
  );
}

function SearchIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.35 21.0004L17 16.6504"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width={20} height={22} viewBox="0 0 20 22" fill="none" aria-hidden>
      <path
        d="M15.9999 6.99457C15.9999 5.40471 15.3677 3.87997 14.2425 2.75577C13.1173 1.63157 11.5912 1 9.99993 1C8.40863 1 6.88252 1.63157 5.75731 2.75577C4.6321 3.87997 3.99997 5.40471 3.99997 6.99457C3.99997 13.9882 1 15.9864 1 15.9864H18.9998C18.9998 15.9864 15.9999 13.9882 15.9999 6.99457Z"
        stroke="black"
        strokeWidth={1.99909}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.73 19.9824C11.5542 20.2855 11.3018 20.5371 10.9982 20.7119C10.6946 20.8868 10.3504 20.9789 10 20.9789C9.64964 20.9789 9.30541 20.8868 9.00179 20.7119C8.69818 20.5371 8.44583 20.2855 8.27002 19.9824"
        stroke="black"
        strokeWidth={1.99909}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DailyReviewChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 100;
  const h = 60;
  const isRising = data[data.length - 1] > data[0];
  const color = isRising ? '#4a90a4' : '#c06226';
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * (w - 6) + 3,
    h - 4 - ((v - min) / (max - min || 1)) * (h - 10),
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

  return (
    <div className="flex w-full flex-col gap-1">
      <svg width={100} height={60} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
        <path d={d} stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3} fill={color} />
        ))}
      </svg>
      <div className="flex justify-between px-0.5">
        {DAY_LABELS.map((label) => (
          <span key={label} className="text-[8px] text-[#c8b8b0]">{label}</span>
        ))}
      </div>
    </div>
  );
}

function ReviewRankingSection({ onMore }: { onMore: () => void }) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-3 px-4 pt-[18px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-base text-[#2e211c]">실시간 리뷰 랭킹</p>
          <p className="text-[11px] text-[#9e9794]">오늘 가장 많이 리뷰된 유행 디저트</p>
        </div>
        <button type="button" onClick={onMore} className="text-xs text-[#a1a1a1] pt-0.5">
          더보기
        </button>
      </div>

      <div
        className="overflow-hidden rounded-[14px] border-2 border-[#2e211c] bg-white p-0.5"
        style={{ boxShadow: '0px 2px 10px 0 rgba(0,0,0,0.06)' }}
      >
        {REVIEW_RANKING.map((item, index) => (
          <button
            key={item.rank}
            type="button"
            onClick={() => item.foodId && navigate(`/food/${item.foodId}`)}
            className={`flex w-full items-center justify-between px-[13px] py-[9px] text-left ${
              index < REVIEW_RANKING.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="shrink-0 text-sm text-[#c06226]">{item.rank}위</span>
              <p className="truncate text-[13px] text-[#2e211c]">
                {item.label}
                <span className="ml-1">
                  <RankingChangeBadge change={item.change} />
                </span>
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-[#9e9794]">리뷰 {item.reviewCount}개</span>
          </button>
        ))}
      </div>
    </section>
  );
}

type TrendChartCardProps = {
  rank: number;
  foodId: string;
  name: string;
  price: string;
  matchRate: string;
  sampleCount: number;
  firstIntroduced: string;
  description: string;
  dailyReviews: number[];
  showMatchRate?: boolean;
};

function TrendChartCard({
  rank,
  foodId,
  name,
  price,
  matchRate,
  sampleCount,
  firstIntroduced,
  description,
  dailyReviews,
  showMatchRate = true,
}: TrendChartCardProps) {
  const navigate = useNavigate();
  const imgSrc = getFoodPromoImage(foodId);

  return (
    <button
      type="button"
      onClick={() => navigate(`/food/${foodId}`)}
      className="flex w-full flex-col overflow-hidden rounded-[14px] border-2 border-[#2e211c] bg-white p-0.5 text-left"
      style={{ boxShadow: '0px 2px 10px 0 rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-[9px] px-[13px] py-2.5">
        <div className="flex h-8 w-[34px] shrink-0 items-center justify-center rounded-[20px] bg-[#c06226]">
          <span className="text-xl text-white">{rank}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <p className="truncate text-base text-[#2e211c]">{name}</p>
          <p className="text-[10px] text-[#9e9794]">{price}</p>
        </div>
        {showMatchRate && (
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <div className="flex h-[31px] items-center justify-center rounded-lg bg-[#9cb8b7] px-[7px] py-0.5">
              <p className="whitespace-nowrap text-[13px] text-[#2e211c]">만족할 확률 {matchRate}</p>
            </div>
            <p className="text-[10px] text-[#9e9794]">{sampleCount}명 기준</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 bg-[#f7f4f0] px-[13px] py-3">
        <div className="h-[110px] flex-1 overflow-hidden rounded-lg border border-[#2e211c]/20 bg-white/60">
          <img src={imgSrc} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="flex h-[110px] flex-1 flex-col items-center justify-center gap-1.5 rounded-lg border border-[#2e211c]/20 bg-white/60 px-1.5 py-[9.5px]">
          <p className="text-[10px] text-[#9e9794]">최근 리뷰량 추이</p>
          <DailyReviewChart data={dailyReviews} />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-[13px] pt-3 pb-3">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-[#9e9794]">첫 소개일</p>
          <p className="text-xs text-[#2e211c]">{firstIntroduced}</p>
        </div>
        <p className="text-[11.5px] leading-[1.45] text-[#2e211c]">{description}</p>
      </div>
    </button>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { showPersonalizedMetrics } = usePersonalizedMetrics();
  const [sortMode, setSortMode] = useState<ChartSortMode>('match');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = useMemo(
    () =>
      showPersonalizedMetrics
        ? SORT_OPTIONS
        : SORT_OPTIONS.filter((option) => option.value !== 'match'),
    [showPersonalizedMetrics],
  );

  useEffect(() => {
    if (!showPersonalizedMetrics && sortMode === 'match') {
      setSortMode('reviews');
    }
  }, [showPersonalizedMetrics, sortMode]);

  const chartItems = useMemo(() => {
    return sortTrendingFoodIds(sortMode).map((foodId, index) => {
      const food = FOODS.find((item) => item.id === foodId)!;

      return {
        rank: index + 1,
        foodId,
        name: food.name,
        price: food.price,
        matchRate: food.matchRate,
        sampleCount: food.sampleCount,
        firstIntroduced: FIRST_INTRODUCED[foodId] ?? '2026.05.01',
        description: food.description,
        dailyReviews: food.dailyReviews,
      };
    });
  }, [sortMode]);

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortMode)?.label ?? '리뷰 많은 순';

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <header className="flex h-[71px] shrink-0 items-center justify-between border-b border-gray-100 px-4 py-[17px]">
        <p className="text-3xl leading-9">
          <span className="text-[#2e211c]">Trend</span>
          <span className="text-[#9cb8b7]">EAT</span>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/foods')}
            aria-label="검색"
            className="flex items-center justify-center"
          >
            <SearchIcon />
          </button>
          <button type="button" aria-label="알림" className="flex items-center justify-center">
            <BellIcon />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <ReviewRankingSection onMore={() => navigate('/foods')} />

        <section className="flex flex-col gap-3 px-4 pb-4 pt-3">
          <div className="flex flex-col gap-1.5">
            <p className="text-md text-[#2e211c]">
              {showPersonalizedMetrics
                ? `${USER_NAME} 님을 위한 트렌딧 차트`
                : '트렌딧 차트'}
            </p>
            <div className="relative flex justify-end">
              <button
                type="button"
                onClick={() => setIsSortOpen((open) => !open)}
                className="flex items-center gap-1.5 rounded-lg border-2 border-[#e5e2de] bg-white px-3 py-1.5 shadow-sm"
                aria-expanded={isSortOpen}
                aria-haspopup="listbox"
              >
                <span className="text-sm font-medium text-[#2e211c]">{currentSortLabel}</span>
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="#2e211c"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isSortOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full z-10 mt-1 min-w-[200px] overflow-hidden rounded-lg border border-[#e5e2de] bg-white py-1 shadow-[0px_4px_12px_#00000014]"
                >
                  {sortOptions.map((option) => (
                    <li key={option.value} role="option" aria-selected={sortMode === option.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setSortMode(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[#f7f4f0] ${
                          sortMode === option.value ? 'font-medium text-[#2e211c]' : 'text-[#8a8a8e]'
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

          <div className="flex flex-col gap-3">
            {chartItems.map((item) => (
              <TrendChartCard
                key={item.foodId}
                rank={item.rank}
                foodId={item.foodId}
                name={item.name}
                price={item.price}
                matchRate={item.matchRate}
                sampleCount={item.sampleCount}
                firstIntroduced={item.firstIntroduced}
                description={item.description}
                dailyReviews={item.dailyReviews}
                showMatchRate={showPersonalizedMetrics}
              />
            ))}
          </div>
        </section>
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
}

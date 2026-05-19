import type { Food } from '../data/foods';

export type ReviewTarget = {
  storeId: string;
  storeName: string;
  menuName: string;
  location: string;
  foodId: string;
  foodName: string;
};

type ReviewTargetSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  results: ReviewTarget[];
  selected: ReviewTarget | null;
  onSelect: (target: ReviewTarget) => void;
  onClearSelection: () => void;
};

export function buildReviewTargets(
  stores: Record<
    string,
    { name: string; menuName: string; location: string }
  >,
  getFood: (foodId: string) => Food,
  getFoodId: (menuName: string) => string | undefined,
): ReviewTarget[] {
  return Object.entries(stores).map(([storeId, store]) => {
    const foodId = getFoodId(store.menuName) ?? '2';
    const food = getFood(foodId);
    return {
      storeId,
      storeName: store.name,
      menuName: store.menuName,
      location: store.location,
      foodId,
      foodName: food.name,
    };
  });
}

export function filterReviewTargets(
  targets: ReviewTarget[],
  query: string,
): ReviewTarget[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return targets.filter((target) =>
    [target.storeName, target.menuName, target.foodName, target.location].some(
      (value) => value.toLowerCase().includes(q),
    ),
  );
}

export default function ReviewTargetSearch({
  query,
  onQueryChange,
  results,
  selected,
  onSelect,
  onClearSelection,
}: ReviewTargetSearchProps) {
  const showResults = query.trim().length > 0 && !selected;

  return (
    <section className="px-6 py-4 border-b border-[#ebebeb]">
      <p className="font-bold text-[#2e211c] text-base mb-1">
        리뷰할 가게 · 상품
      </p>
      <p className="text-[#9e9794] text-[13px] mb-3">
        가게명이나 메뉴명으로 검색해 선택해주세요.
      </p>

      {selected ? (
        <div className="flex items-start justify-between gap-3 rounded-2xl border-2 border-[#335352] bg-[#f7f4f0] p-3">
          <div className="min-w-0">
            <p className="font-bold text-[#2e211c] text-base truncate">
              {selected.storeName}
            </p>
            <p className="text-[#665a55] text-[13px] mt-0.5">
              {selected.foodName} · {selected.menuName}
            </p>
            <p className="text-[#c06226] text-[12px] mt-1">{selected.location}</p>
          </div>
          <button
            type="button"
            onClick={onClearSelection}
            className="shrink-0 rounded-lg border-2 border-[#2e211c] bg-white px-2.5 py-1.5 text-[12px] font-bold text-[#2e211c]"
          >
            변경
          </button>
        </div>
      ) : (
        <>
          <label className="sr-only" htmlFor="review-target-search">
            가게 · 상품 검색
          </label>
          <div className="flex items-center h-11 gap-2 px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#2e211c]">
            <input
              id="review-target-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="가게명, 메뉴명으로 검색"
              className="flex-1 text-[13px] text-[#2e211c] placeholder:text-[#9e9794] bg-transparent outline-none min-w-0"
            />
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              className="shrink-0"
              aria-hidden
            >
              <path
                d="M6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5Z"
                stroke="#9E9794"
                strokeWidth="1.6"
              />
              <path
                d="M10.5 10.5L14 14"
                stroke="#9E9794"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {showResults && results.length > 0 && (
            <ul className="mt-2 flex flex-col gap-2 max-h-48 overflow-y-auto">
              {results.map((target) => (
                <li key={target.storeId}>
                  <button
                    type="button"
                    onClick={() => onSelect(target)}
                    className="w-full text-left rounded-xl border-2 border-[#2e211c] bg-white px-3 py-2.5 hover:bg-[#f7f4f0] transition-colors"
                  >
                    <p className="font-bold text-[#2e211c] text-[14px]">
                      {target.storeName}
                    </p>
                    <p className="text-[#665a55] text-[12px] mt-0.5">
                      {target.foodName} · {target.menuName}
                    </p>
                    <p className="text-[#9e9794] text-[12px] mt-0.5">
                      {target.location}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showResults && results.length === 0 && (
            <p className="mt-3 text-center text-[#9e9794] text-[13px]">
              검색 결과가 없어요. 다른 키워드로 검색해보세요.
            </p>
          )}

          {!query.trim() && (
            <p className="mt-3 text-center text-[#9e9794] text-[13px]">
              예: 미엘, 버터떡, 마포구
            </p>
          )}
        </>
      )}
    </section>
  );
}

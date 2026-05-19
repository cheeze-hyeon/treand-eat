import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import ReviewTargetSearch, {
  buildReviewTargets,
  filterReviewTargets,
  type ReviewTarget,
} from '../components/ReviewTargetSearch';
import { getFoodById, getFoodIdByMenuName } from '../data/foods';

type StoreInfo = {
  name: string;
  menuName: string;
  location: string;
  price: string;
  priceUnit: string;
  waitingTime: string;
  reviewCount: number;
};

const STORES: Record<string, StoreInfo> = {
  '1': {
    name: '미엘 케이커리',
    menuName: '두쫀쿠',
    location: '서울 마포구',
    price: '2000원',
    priceUnit: '(개당)',
    waitingTime: '15분',
    reviewCount: 404,
  },
  '2': {
    name: '떡앤카페',
    menuName: '버터떡',
    location: '서울 관악구',
    price: '3000원',
    priceUnit: '(개당)',
    waitingTime: '10분',
    reviewCount: 289,
  },
  '3': {
    name: '한떡',
    menuName: '호박인절미',
    location: '서울 서초구',
    price: '2500원',
    priceUnit: '(개당)',
    waitingTime: '5분',
    reviewCount: 312,
  },
  '4': {
    name: '매운맛집',
    menuName: '마라떡볶이',
    location: '서울 강남구',
    price: '5000원',
    priceUnit: '(1인분)',
    waitingTime: '20분',
    reviewCount: 567,
  },
  '5': {
    name: '쫀득베이커리',
    menuName: '쫀득빵',
    location: '서울 마포구',
    price: '3500원',
    priceUnit: '(개당)',
    waitingTime: '12분',
    reviewCount: 423,
  },
  '6': {
    name: '베이글 스토리',
    menuName: '베이글샌드',
    location: '서울 용산구',
    price: '6500원',
    priceUnit: '(개당)',
    waitingTime: '8분',
    reviewCount: 256,
  },
};

const REVIEW_TARGETS = buildReviewTargets(
  STORES,
  getFoodById,
  getFoodIdByMenuName,
);

const WAIT_OPTIONS = ['대기 안함', '10분 이내', '30분 이내', '1시간 이상'] as const;
const TIME_OPTIONS = ['아침', '오전', '점심', '오후', '저녁'] as const;

type ChipProps = {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

function Chip({ selected, onClick, children, className = '' }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[10px] border-2 px-3 py-2.5 text-sm text-center transition-colors ${
        selected
          ? 'border-[#335352] bg-[#335352] text-white'
          : 'border-[#2e211c] bg-white text-neutral-700'
      } ${className}`}
    >
      {children}
    </button>
  );
}

function targetFromParams(
  storeId: string | null,
  foodId: string | null,
): ReviewTarget | null {
  if (storeId && STORES[storeId]) {
    return (
      REVIEW_TARGETS.find((target) => target.storeId === storeId) ?? null
    );
  }

  if (foodId) {
    const food = getFoodById(foodId);
    const match = REVIEW_TARGETS.find((target) => target.foodId === foodId);
    if (match) return match;

    const store = STORES['1'];
    return {
      storeId: '1',
      storeName: store.name,
      menuName: store.menuName,
      location: store.location,
      foodId,
      foodName: food.name,
    };
  }

  return null;
}

export default function WriteReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showBack = (location.state as { showBack?: boolean } | null)?.showBack === true;

  const initialTarget = targetFromParams(
    searchParams.get('storeId'),
    searchParams.get('foodId'),
  );

  const [selectedTarget, setSelectedTarget] = useState<ReviewTarget | null>(
    initialTarget,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(
    () => filterReviewTargets(REVIEW_TARGETS, searchQuery),
    [searchQuery],
  );

  const store = selectedTarget ? STORES[selectedTarget.storeId] : null;
  const food = selectedTarget ? getFoodById(selectedTarget.foodId) : null;

  const [satisfied, setSatisfied] = useState<boolean | null>(null);
  const [waitTime, setWaitTime] = useState<string | null>(null);
  const [visitDay, setVisitDay] = useState<'weekday' | 'weekend' | null>(null);
  const [visitTime, setVisitTime] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const canSubmit =
    selectedTarget !== null &&
    satisfied !== null &&
    waitTime !== null &&
    visitDay !== null &&
    visitTime !== null;

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const nextUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...nextUrls].slice(0, 4));
    event.target.value = '';
  };

  const handleSelectTarget = (target: ReviewTarget) => {
    setSelectedTarget(target);
    setSearchQuery('');
  };

  const handleClearTarget = () => {
    setSelectedTarget(null);
    setSearchQuery('');
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    navigate('/my-reviews');
  };

  return (
    <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
      <header className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-[#ebebeb]">
        {showBack ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
            className="flex size-10 items-center justify-center rounded-full bg-[#f7f4f0]"
          >
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309"
                stroke="#2E211C"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.8214 9.99219H4.16357"
                stroke="#2E211C"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className="size-10" aria-hidden />
        )}
        <p className="font-bold text-[#2e211c] text-base">리뷰 작성</p>
        <div className="size-10" aria-hidden />
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <ReviewTargetSearch
          query={searchQuery}
          onQueryChange={setSearchQuery}
          results={searchResults}
          selected={selectedTarget}
          onSelect={handleSelectTarget}
          onClearSelection={handleClearTarget}
        />

        {store && food ? (
          <>
            <section className="px-6 py-4 border-b border-[#ebebeb]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-bold text-[#2e211c] text-xl">{store.name}</p>
                <div className="flex items-baseline gap-1 shrink-0">
                  <p className="font-bold text-[#2e211c] text-xl">{store.price}</p>
                  <p className=" text-[#9e9794] text-[13px]">{store.priceUnit}</p>
                </div>
              </div>

              <div className="inline-block bg-[#2e211c] rounded-lg px-2.5 py-1 mb-2">
                <p className="font-bold text-white text-[13px]">{food.name}</p>
              </div>

              <div className="flex items-center gap-2 text-[#665a55] text-[13px] mb-2">
                <span>평균 웨이팅 {store.waitingTime}</span>
                <span className="size-0.5 rounded-full bg-[#404040]" />
                <span>리뷰 {store.reviewCount}</span>
              </div>

              <div className="flex items-center gap-1">
                <svg width={15} height={14} viewBox="0 0 15 14" fill="none" aria-hidden>
                  <path
                    d="M12.5 5.83366C12.5 8.74624 9.03812 11.7796 7.87562 12.7164C7.76733 12.7924 7.6355 12.8335 7.5 12.8335C7.3645 12.8335 7.23267 12.7924 7.12438 12.7164C5.96188 11.7796 2.5 8.74624 2.5 5.83366C2.5 4.59598 3.02678 3.409 3.96447 2.53383C4.90215 1.65866 6.17392 1.16699 7.5 1.16699C8.82608 1.16699 10.0979 1.65866 11.0355 2.53383C11.9732 3.409 12.5 4.59598 12.5 5.83366Z"
                    stroke="#C06226"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 7.58301C8.53553 7.58301 9.375 6.79951 9.375 5.83301C9.375 4.86651 8.53553 4.08301 7.5 4.08301C6.46447 4.08301 5.625 4.86651 5.625 5.83301C5.625 6.79951 6.46447 7.58301 7.5 7.58301Z"
                    stroke="#C06226"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className=" text-[#c06226] text-[13px]">{store.location}</p>
              </div>
            </section>

            <div className="px-6 py-5 flex flex-col gap-5 pb-28">
              <div>
                <p className="font-bold text-[#2e211c] text-xl mb-1">
                  이 {food.name}, 어땠나요?
                </p>
                <p className=" text-[#9e9794] text-[13px]">
                  만족 여부를 선택하면 다른 유저들의 선택에도 도움이 돼요.
                </p>
              </div>

              <section className="rounded-2xl border-2 border-[#2e211c] p-4 flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-lg text-[#2e211c]">트렌딜리셔스</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSatisfied(true)}
                      className={`min-w-[60px] rounded-[14px] px-2 py-1.5 text-[13px] text-center transition-colors ${
                        satisfied === true
                          ? 'bg-[#335352] text-white'
                          : 'bg-neutral-200 text-black'
                      }`}
                    >
                      만족
                    </button>
                    <button
                      type="button"
                      onClick={() => setSatisfied(false)}
                      className={`min-w-[60px] rounded-[14px] px-2 py-1.5 text-[13px] text-center transition-colors ${
                        satisfied === false
                          ? 'bg-[#335352] text-white'
                          : 'bg-neutral-200 text-black'
                      }`}
                    >
                      불만족
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-base text-[#2e211c] mb-3">
                    대기 시간은 어땠나요?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {WAIT_OPTIONS.map((option) => (
                      <Chip
                        key={option}
                        selected={waitTime === option}
                        onClick={() => setWaitTime(option)}
                        className={option === '1시간 이상' ? 'col-span-2' : ''}
                      >
                        {option}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-bold text-base text-[#2e211c] mb-3">
                    방문하신 요일을 알려주세요
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Chip
                      selected={visitDay === 'weekday'}
                      onClick={() => setVisitDay('weekday')}
                    >
                      평일
                    </Chip>
                    <Chip
                      selected={visitDay === 'weekend'}
                      onClick={() => setVisitDay('weekend')}
                    >
                      주말
                    </Chip>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-base text-[#2e211c] mb-3">
                    어느 시간대에 방문하셨나요?
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_OPTIONS.map((option) => (
                      <Chip
                        key={option}
                        selected={visitTime === option}
                        onClick={() => setVisitTime(option)}
                        className="px-2"
                      >
                        {option}
                      </Chip>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border-2 border-[#2e211c] p-4">
                <p className="font-bold text-lg text-[#2e211c] mb-3">텍스트 리뷰</p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 500))}
                  placeholder="맛, 식감, 웨이팅, 재구매 의사 등을 자유롭게 적어주세요."
                  className="w-full h-32 resize-none rounded-[14px] border-2 border-[#2e211c] p-3 text-[13px] text-[#2e211c] placeholder:text-[#9e9794] focus:outline-none"
                />
                <p className="mt-2 text-xs text-right text-[#665a55]">
                  {text.length}/500
                </p>
              </section>

              <section className="rounded-2xl border-2 border-[#2e211c] p-4">
                <p className="font-bold text-lg text-[#2e211c] mb-1">사진 업로드</p>
                <p className=" text-[#9e9794] text-[13px] mb-3">
                  상품 사진이나 매장 사진을 함께 남겨보세요.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <div className="flex flex-wrap gap-2">
                  {photos.map((url, index) => (
                    <div
                      key={url}
                      className="relative size-20 rounded-[14px] overflow-hidden border border-[#9e9794]"
                    >
                      <img src={url} alt="" className="size-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setPhotos((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="absolute top-1 right-1 size-5 rounded-full bg-black/60 text-white text-xs"
                        aria-label="사진 삭제"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {photos.length < 4 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex size-20 flex-col items-center justify-center gap-1 rounded-[14px] border-2 border-dashed border-[#9e9794] text-[#9e9794]"
                    >
                      <span className="text-xl leading-none">+</span>
                      <span className="text-xs font-medium">추가</span>
                    </button>
                  )}
                </div>
              </section>
            </div>
          </>
        ) : (
          <p className="px-6 py-10 text-center text-[#9e9794] text-[14px]">
            검색해서 리뷰할 가게와 상품을 먼저 선택해주세요.
          </p>
        )}
      </div>

      <div className="shrink-0 px-6 pt-2 pb-3 bg-gradient-to-t from-white via-white/95 to-transparent">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-[46px] rounded-2xl bg-[#2e211c] text-white text-base font-bold shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          리뷰 등록하기
        </button>
      </div>

      <BottomNavigation activeTab="write" />
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import OnboardingSkipReviewDialog from '../components/onboarding/OnboardingSkipReviewDialog';
import OnboardingStepHeader from '../components/OnboardingStepHeader';
import { useUserPreferences } from '../contexts/UserPreferencesContext';
import ReviewTargetSearch, {
  buildReviewTargets,
  filterReviewTargets,
  type ReviewTarget,
} from '../components/ReviewTargetSearch';
import StoreSummaryHeader from '../components/StoreSummaryHeader';
import { FOODS, getFoodById, getFoodIdByMenuName } from '../data/foods';
import { BANGKOK_ROTI_FRY_STORES } from '../data/bangkokRotiFry.generated';
import { LA_CROTACO_STORES } from '../data/laCrotaco.generated';
import { MACAO_CRACK_COOKIE_STORES } from '../data/macaoCrackCookie.generated';
import {
  formatPriceDiffAmount,
  getFoodAveragePriceAmount,
  getPriceDiffFromAverage,
} from '../utils/priceDiff';

type StoreInfo = {
  name: string;
  menuName: string;
  location: string;
  price: string;
  priceUnit: string;
  waitingTime: string;
  reviewCount: number;
};

const STORES: Record<string, StoreInfo> = Object.fromEntries(
  Object.entries({
    ...MACAO_CRACK_COOKIE_STORES,
    ...BANGKOK_ROTI_FRY_STORES,
    ...LA_CROTACO_STORES,
  }).map(([id, store]) => [
    id,
    {
      name: store.name,
      menuName: store.menuName,
      location: store.location,
      price: store.price,
      priceUnit: store.priceUnit,
      waitingTime: store.waitingTime,
      reviewCount: store.reviewCount,
    },
  ]),
);

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

const TOOLTIP_SHADOW =
  '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)';

function SatisfactionHelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="만족도 안내"
        aria-expanded={open}
        className="flex items-center justify-center"
      >
        <svg
          width={19}
          height={19}
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-[19px]"
          aria-hidden
        >
          <path
            d="M9.49992 17.4174C13.8722 17.4174 17.4166 13.873 17.4166 9.50065C17.4166 5.1284 13.8722 1.58398 9.49992 1.58398C5.12767 1.58398 1.58325 5.1284 1.58325 9.50065C1.58325 13.873 5.12767 17.4174 9.49992 17.4174Z"
            stroke="#9E9794"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.19629 7.12594C7.38241 6.59684 7.74979 6.15069 8.23334 5.8665C8.71689 5.58232 9.28542 5.47843 9.83822 5.57325C10.391 5.66807 10.8924 5.95548 11.2536 6.38457C11.6148 6.81365 11.8125 7.35673 11.8117 7.91761C11.8117 9.50094 9.43671 10.2926 9.43671 10.2926"
            stroke="#9E9794"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 13.459H9.50708"
            stroke="#9E9794"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-20 mt-2 flex h-10 w-[200px] items-center rounded-xl border-2 border-[#2e211c] bg-white pl-[9px] pr-2"
          style={{ boxShadow: TOOLTIP_SHADOW }}
          role="tooltip"
        >
          <p className="flex-1 text-xs text-[#2e211c]">
            앱에서 트렌딧 지수를 계산하는 데 사용됩니다.
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="안내 닫기"
            className="flex size-4 shrink-0 items-center justify-center"
          >
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-3"
              aria-hidden
            >
              <g clipPath="url(#satisfaction-help-close)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.10505L10.895 0L6 4.90272L1.10505 0L0 1.10505L4.90272 6L0 10.895L1.10505 12L6 7.09728L10.895 12L12 10.895L7.09728 6L12 1.10505Z"
                  fill="#2E211C"
                />
              </g>
              <defs>
                <clipPath id="satisfaction-help-close">
                  <rect width={12} height={12} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function CameraIcon() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-6"
      aria-hidden
    >
      <path
        d="M14.4953 3.99805H9.49692L6.99774 6.99706H3.99873C3.46847 6.99706 2.95993 7.2077 2.58498 7.58265C2.21003 7.9576 1.99939 8.46614 1.99939 8.9964V17.9934C1.99939 18.5237 2.21003 19.0322 2.58498 19.4072C2.95993 19.7821 3.46847 19.9928 3.99873 19.9928H19.9935C20.5237 19.9928 21.0323 19.7821 21.4072 19.4072C21.7822 19.0322 21.9928 18.5237 21.9928 17.9934V8.9964C21.9928 8.46614 21.7822 7.9576 21.4072 7.58265C21.0323 7.2077 20.5237 6.99706 19.9935 6.99706H16.9945L14.4953 3.99805Z"
        stroke="#9E9794"
        strokeWidth={1.99934}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9961 15.9941C13.6524 15.9941 14.9951 14.6514 14.9951 12.9951C14.9951 11.3388 13.6524 9.99609 11.9961 9.99609C10.3398 9.99609 8.99707 11.3388 8.99707 12.9951C8.99707 14.6514 10.3398 15.9941 11.9961 15.9941Z"
        stroke="#9E9794"
        strokeWidth={1.99934}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewStoreSummary({
  store,
  foodName,
}: {
  store: StoreInfo;
  foodName: string;
}) {
  const avgPrice =
    getFoodAveragePriceAmount(foodName) ?? getFoodAveragePriceAmount(store.menuName);
  const diff =
    avgPrice != null ? getPriceDiffFromAverage(store.price, avgPrice) : null;
  const priceDiff = diff
    ? {
        direction: diff.direction,
        amount: formatPriceDiffAmount(diff.amount),
      }
    : undefined;

  return (
    <StoreSummaryHeader
      name={store.name}
      price={store.price}
      priceUnit={store.priceUnit}
      waitingTime={store.waitingTime}
      reviewCount={store.reviewCount}
      location={store.location}
      menuName={foodName}
      priceDiff={priceDiff}
      showWriteReview={false}
      className="py-4"
    />
  );
}

function WriteReviewPickerHeader({
  onBack,
  onBookmark,
  onClose,
}: {
  onBack: () => void;
  onBookmark: () => void;
  onClose: () => void;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between px-6 py-[18px]">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로 가기"
        className="flex size-10 items-center justify-center rounded-full bg-white/50 pr-2.5"
      >
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M9.9925 15.8219L4.16357 9.99299L9.9925 4.16406"
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
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBookmark}
          aria-label="저장 목록"
          className="flex size-10 items-center justify-center"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M15.8214 17.4867L9.9925 14.1559L4.16357 17.4867V4.16346C4.16357 3.72176 4.33904 3.29816 4.65136 2.98583C4.96369 2.67351 5.38729 2.49805 5.82898 2.49805H14.156C14.5977 2.49805 15.0213 2.67351 15.3336 2.98583C15.646 3.29816 15.8214 3.72176 15.8214 4.16346V17.4867Z"
              stroke="#2E211C"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="flex size-10 items-center justify-center"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.425 4.75754L15.2416 3.57422L9.99995 8.82422L4.75827 3.57422L3.57495 4.75754L8.82495 9.99922L3.57495 15.2409L4.75827 16.4242L9.99995 11.1742L15.2416 16.4242L16.425 15.2409L11.175 9.99922L16.425 4.75754Z"
              fill="#2E211C"
            />
          </svg>
        </button>
      </div>
    </header>
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

    const store = STORES['macao_cookie_01'];
    return {
      storeId: 'macao_cookie_01',
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
  const receiptInputRef = useRef<HTMLInputElement>(null);
  const { skipOnboardingReview, unlockTasteProfile } = useUserPreferences();
  const [skipDialogOpen, setSkipDialogOpen] = useState(false);

  const locationState = location.state as {
    showBack?: boolean;
    fromOnboarding?: boolean;
  } | null;
  const showBack = locationState?.showBack === true;
  const fromOnboarding = locationState?.fromOnboarding === true;

  const initialTarget = targetFromParams(
    searchParams.get('storeId'),
    searchParams.get('foodId'),
  );

  const [selectedTarget, setSelectedTarget] = useState<ReviewTarget | null>(
    initialTarget,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingCustomName, setPendingCustomName] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = targetFromParams(
      searchParams.get('storeId'),
      searchParams.get('foodId'),
    );
    if (fromUrl) {
      setSelectedTarget(fromUrl);
    }
  }, [searchParams]);

  const searchResults = useMemo(
    () =>
      filterReviewTargets(REVIEW_TARGETS, searchQuery, {
        storeNameOnly: !selectedTarget,
      }),
    [searchQuery, selectedTarget],
  );

  const store = selectedTarget
    ? (STORES[selectedTarget.storeId] ?? {
        name: selectedTarget.storeName,
        menuName: selectedTarget.menuName,
        location: selectedTarget.location,
        price: '-',
        priceUnit: '',
        waitingTime: '-',
        reviewCount: 0,
      })
    : null;
  const food = selectedTarget ? getFoodById(selectedTarget.foodId) : null;

  const [receiptVerified, setReceiptVerified] = useState(false);
  const [satisfied, setSatisfied] = useState<boolean | null>(null);
  const [willRevisit, setWillRevisit] = useState<boolean | null>(null);
  const [waitTime, setWaitTime] = useState<string | null>(null);
  const [visitDay, setVisitDay] = useState<'weekday' | 'weekend' | null>(null);
  const [visitTime, setVisitTime] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const canSubmit =
    selectedTarget !== null &&
    satisfied !== null

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const nextUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...nextUrls].slice(0, 4));
    event.target.value = '';
  };

  const handleReceiptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setReceiptVerified(true);
    }
    event.target.value = '';
  };

  const handleSelectTarget = (target: ReviewTarget) => {
    setSelectedTarget(target);
    setSearchQuery('');
  };

  const handleFreeInput = (query: string) => {
    setPendingCustomName(query.trim());
  };

  const handleCustomFoodSelect = (foodId: string) => {
    if (!pendingCustomName) return;
    const food = getFoodById(foodId);
    const customTarget: ReviewTarget = {
      storeId: `custom_${Date.now()}`,
      storeName: pendingCustomName,
      menuName: food.name,
      location: '',
      foodId,
      foodName: food.name,
    };
    setPendingCustomName(null);
    handleSelectTarget(customTarget);
  };

  const handleClearTarget = () => {
    setSelectedTarget(null);
    setSearchQuery('');
    if (searchParams.get('storeId') || searchParams.get('foodId')) {
      navigate('/write-review', {
        replace: true,
        state: fromOnboarding ? { fromOnboarding: true } : undefined,
      });
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    unlockTasteProfile();
    navigate(fromOnboarding ? '/onboarding5' : '/my-reviews');
  };

  const handleConfirmSkip = () => {
    skipOnboardingReview();
    setSkipDialogOpen(false);
    navigate('/onboarding5');
  };

  const onboardingSkipButton = fromOnboarding ? (
  <>
    <button
      type="button"
      onClick={() => setSkipDialogOpen(true)}
      className="mt-6 text-[14px] text-[#9e9794] underline underline-offset-2"
    >
      건너뛰기
    </button>
    <OnboardingSkipReviewDialog
      open={skipDialogOpen}
      onOpenChange={setSkipDialogOpen}
      onConfirmSkip={handleConfirmSkip}
    />
  </>
  ) : null;

  const satisfactionBtnClass = (active: boolean) =>
    `min-w-[60px] rounded-[14px] px-2 py-1.5 text-[13px] text-center transition-colors ${
      active
        ? 'bg-[#2e211c] text-white'
        : 'bg-neutral-200 text-[#2e211c]'
    }`;

  const handleFormBack = () => {
    if (showBack) {
      navigate(-1);
      return;
    }
    handleClearTarget();
  };

  const handlePickerBack = () => {
    if (fromOnboarding) {
      navigate('/onboarding4');
      return;
    }
    navigate('/home');
  };

  const pickerHeader = fromOnboarding ? (
    <OnboardingStepHeader step={5} totalSteps={6} onBack={handlePickerBack} />
  ) : (
    <WriteReviewPickerHeader
      onBack={handlePickerBack}
      onBookmark={() =>
        navigate('/saved-items', { state: { pickForReview: true } })
      }
      onClose={() => navigate('/home')}
    />
  );

  if (!selectedTarget) {
    if (pendingCustomName) {
      return (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
          {pickerHeader}
          <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-[29px] pt-10 pb-6">
            <h1 className="mb-2 w-full max-w-[342px] text-center text-2xl text-[#2e211c]">
              어떤 메뉴를 드셨나요?
            </h1>
            <p className="mb-8 text-center text-[13px] text-[#9e9794]">
              &lsquo;{pendingCustomName}&rsquo;에서 드신 유행 음식을 선택해주세요
            </p>
            <div className="flex w-full max-w-[342px] flex-col gap-3">
              {FOODS.map((food) => (
                <button
                  key={food.id}
                  type="button"
                  onClick={() => handleCustomFoodSelect(food.id)}
                  className="w-full rounded-xl border-2 border-[#2e211c] bg-white px-4 py-3.5 text-left transition-colors hover:bg-[#f7f4f0]"
                >
                  <p className="text-[15px] font-bold text-[#2e211c]">{food.name}</p>
                  <p className="mt-0.5 text-[12px] text-[#9e9794]">{food.category} · {food.price}</p>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPendingCustomName(null)}
              className="mt-6 text-[13px] text-[#9e9794] underline underline-offset-2"
            >
              다시 검색하기
            </button>
          </div>
          {!fromOnboarding && <BottomNavigation activeTab="write" />}
        </div>
      );
    }

    return (
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
        {pickerHeader}

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-[29px] pt-10 pb-6">
          <h1 className="mb-8 w-full max-w-[342px] text-center text-2xl text-[#2e211c]">
            {fromOnboarding
              ? '첫 리뷰를 남겨볼까요?'
              : '어떤 음식을 리뷰할까요?'}
          </h1>

          <ReviewTargetSearch
            variant="picker"
            query={searchQuery}
            onQueryChange={setSearchQuery}
            results={searchResults}
            selected={null}
            onSelect={handleSelectTarget}
            onClearSelection={handleClearTarget}
            onFreeInput={fromOnboarding ? handleFreeInput : undefined}
          />

          {!fromOnboarding && (
            <>
              <p className="mt-8 w-full max-w-[342px] text-center text-base text-[#665a55]">
                또는
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate('/saved-items', { state: { pickForReview: true } })
                }
                className="mt-4 flex h-8 items-center justify-center rounded-lg bg-[#9cb8b7] px-[7px] py-0.5"
              >
                <span className="text-base text-[#2e211c]">
                  저장된 목록에서 불러오기
                </span>
              </button>
            </>
          )}
          {onboardingSkipButton}
        </div>

        {!fromOnboarding && <BottomNavigation activeTab="write" />}
      </div>
    );
  }

  const formHeader = fromOnboarding ? (
    <OnboardingStepHeader
      step={5}
      totalSteps={6}
      onBack={handleFormBack}
    />
  ) : (
    <WriteReviewPickerHeader
      onBack={handleFormBack}
      onBookmark={() =>
        navigate('/saved-items', { state: { pickForReview: true } })
      }
      onClose={() => navigate('/home')}
    />
  );

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      {formHeader}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {store && food ? (
          <div className="mx-auto flex w-full max-w-[395px] flex-col items-center">
            <ReviewStoreSummary store={store} foodName={food.name} />

            {/* 영수증 인증 */}
            <section className="w-full p-2.5">
              <div className="flex flex-col gap-1.5 p-2.5">
                <p className="text-xl text-[#2e211c]">
                  영수증으로 인증하시겠습니까?
                </p>
                <p className="text-[13px] text-[#9e9794]">
                  영수증 인증을 완료하면 리뷰 옆에 인증 마크가 표시돼요.
                </p>
                <input
                  ref={receiptInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleReceiptChange}
                />
                <button
                  type="button"
                  onClick={() => receiptInputRef.current?.click()}
                  className="mt-1 flex h-7 w-[107px] items-center justify-center rounded-[10px] bg-[#c06226] px-[13px] pt-1"
                >
                  <span className="text-xs text-white">
                    {receiptVerified ? '인증 완료' : '영수증 촬영하기'}
                  </span>
                </button>
              </div>
            </section>

            <div className="flex w-full flex-col gap-[13px] p-2.5 pb-28">
              <div className="flex flex-col gap-0.5 px-2.5">
                <p className="text-xl text-[#2e211c]">
                  이 {food.name}, 어땠나요?
                </p>
                <p className="text-[13px] text-[#9e9794]">
                  만족 여부를 선택하면 다른 유저들의 선택에도 도움이 돼요.
                </p>
              </div>

              {/* 만족도 · 방문 정보 */}
              <section className="rounded-2xl border-2 border-[#2e211c] bg-white p-[22px]">
                <div className="mb-5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-lg text-neutral-900">만족하셨나요?</p>
                    <SatisfactionHelpButton />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSatisfied(true)}
                      className={satisfactionBtnClass(satisfied === true)}
                    >
                      만족 🙂
                    </button>
                    <button
                      type="button"
                      onClick={() => setSatisfied(false)}
                      className={satisfactionBtnClass(satisfied === false)}
                    >
                      불만족 ☹️
                    </button>
                  </div>
                </div>

                <div className="mb-5 flex items-center justify-between gap-2">
                  <p className="text-base text-neutral-900">재방문 의사</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setWillRevisit(true)}
                      className={satisfactionBtnClass(willRevisit === true)}
                    >
                      있어요
                    </button>
                    <button
                      type="button"
                      onClick={() => setWillRevisit(false)}
                      className={satisfactionBtnClass(willRevisit === false)}
                    >
                      없어요
                    </button>
                  </div>
                </div>

                <div className="mb-5 flex flex-col gap-3">
                  <p className="text-base text-neutral-900">
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

                <div className="mb-5 flex flex-col gap-3">
                  <p className="text-base text-neutral-900">
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

                <div className="flex flex-col gap-3">
                  <p className="text-base text-neutral-900">
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

              {/* 텍스트 리뷰 */}
              <section className="rounded-2xl border-2 border-[#2e211c] bg-white p-[22px]">
                <p className="mb-3 text-lg text-[#2e211c]">텍스트 리뷰</p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 500))}
                  placeholder={
                    '맛, 식감, 웨이팅, 재구매 의사 등을 자유롭게\n적어주세요.'
                  }
                  rows={5}
                  className="h-32 w-full resize-none rounded-[14px] border-2 border-[#2e211c] p-3 text-[13px] text-[#2e211c] placeholder:text-[#9e9794] focus:outline-none"
                />
                <p className="mt-2 text-right text-xs text-[#665a55]">
                  {text.length}/500
                </p>
              </section>

              {/* 사진 업로드 */}
              <section className="rounded-2xl border-2 border-[#2e211c] bg-white p-[22px]">
                <p className="text-lg text-[#2e211c]">사진 업로드</p>
                <p className="mt-1 text-[13px] text-[#9e9794]">
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {photos.map((url, index) => (
                    <div
                      key={url}
                      className="relative size-20 overflow-hidden rounded-[14px] border border-[#9e9794]"
                    >
                      <img src={url} alt="" className="size-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setPhotos((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
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
                      className="flex size-20 flex-col items-center justify-center gap-1 rounded-[14px] border border-dashed border-[#9e9794] text-[#9e9794]"
                    >
                      <CameraIcon />
                      <span className="text-xs font-medium">추가</span>
                    </button>
                  )}
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </div>

      <div className="shrink-0 bg-gradient-to-t from-white via-white/95 to-transparent px-6 pt-2 pb-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="h-[46px] w-full rounded-2xl bg-[#2e211c] text-base font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-40"
        >
          {fromOnboarding ? '리뷰 작성 완료' : '리뷰 등록하기'}
        </button>
        {onboardingSkipButton && (
          <div className="flex justify-center pb-1">{onboardingSkipButton}</div>
        )}
      </div>

      {!fromOnboarding && <BottomNavigation activeTab="write" />}
    </div>
  );
}

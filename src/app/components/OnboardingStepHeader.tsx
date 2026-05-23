interface OnboardingStepHeaderProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
}

export default function OnboardingStepHeader({
  step,
  totalSteps,
  onBack,
}: OnboardingStepHeaderProps) {
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="shrink-0 bg-white">
      <div className="relative flex h-[110px] items-center justify-center px-[24px]">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로 가기"
            className="absolute left-[24px] flex size-10 items-center justify-center rounded-full bg-[#f7f4f0]"
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
        )}
        <p className="text-[14px] font-bold leading-[20px] text-[#737373]">
          {step} / {totalSteps}
        </p>
      </div>

      <div className="h-[40px] px-[24px]">
        <div className="relative h-[8px] rounded-[22369600px] bg-[rgba(255,255,255,0.5)]">
          <div
            className="h-[8px] rounded-[22369600px] bg-[#2e211c]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

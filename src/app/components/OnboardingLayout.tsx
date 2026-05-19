import { ReactNode } from 'react';
import OnboardingBottomBar from './OnboardingBottomBar';

interface OnboardingLayoutProps {
 step: number;
 totalSteps: number;
 children: ReactNode;
 onNext?: () => void;
 onBack?: () => void;
 nextButtonText?: string;
 showBackButton?: boolean;
 nextButtonDisabled?: boolean;
}

export default function OnboardingLayout({
 step,
 totalSteps,
 children,
 onNext,
 onBack,
 nextButtonText = "다음",
 showBackButton = true,
 nextButtonDisabled = false
}: OnboardingLayoutProps) {
 const progressPercent = (step / totalSteps) * 100;

 return (
 <div className="bg-white flex flex-col h-full w-full min-h-0 overflow-hidden">
 {/* Progress indicator */}
 <div className="relative h-[110px] flex items-center justify-center px-[24px]">
 {showBackButton && onBack && (
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
 <p className="font-bold leading-[20px] text-[#737373] text-[14px]">
 {step} / {totalSteps}
 </p>
 </div>

 {/* Progress bar */}
 <div className="h-[81px] px-[24px]">
 <div className="bg-[rgba(255,255,255,0.5)] h-[8px] rounded-[22369600px] relative">
 <div
 className="bg-[#2e211c] h-[8px] rounded-[22369600px]"
 style={{ width: `${progressPercent}%` }}
 />
 </div>
 </div>

 {/* Main content area */}
 <div className="flex-1 overflow-hidden">
 {children}
 </div>

 {/* Bottom buttons */}
 <OnboardingBottomBar>
 {onNext && (
 <button
 onClick={onNext}
 disabled={nextButtonDisabled}
 className={`h-[48px] w-full rounded-[10px] shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] ${
 nextButtonDisabled
 ? 'bg-[#9e9794] cursor-not-allowed'
 : 'bg-[#2e211c]'
 }`}
 >
 <p className="font-bold text-[16px] text-white">
 {nextButtonText}
 </p>
 </button>
 )}
 </OnboardingBottomBar>
 </div>
 );
}

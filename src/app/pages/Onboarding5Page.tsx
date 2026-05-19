import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import OnboardingLayout from '../components/OnboardingLayout';
import svgPaths from "../../imports/온보딩8/svg-jgdtugr5e6";

export default function Onboarding5Page() {
 const navigate = useNavigate();
 const [isAnalyzing, setIsAnalyzing] = useState(true);

 useEffect(() => {
 const timer = setTimeout(() => {
 setIsAnalyzing(false);
 }, 3000);

 return () => clearTimeout(timer);
 }, []);

 const handleNext = () => {
 if (!isAnalyzing) {
 navigate('/mypage');
 }
 };

 return (
 <OnboardingLayout
 step={4}
 totalSteps={4}
 onNext={handleNext}
 nextButtonText="마이페이지로 이동"
 showBackButton={false}
 nextButtonDisabled={isAnalyzing}
 >
 <div className="px-[24px] flex flex-col h-full items-center justify-center">
 {/* AI Icon */}
 <div className="relative w-[72px] h-[71px] mb-[24px]">
 <svg className="w-full h-full" fill="none" viewBox="0 0 72.4167 71.5">
 <path d={svgPaths.p3f129be0} fill="#2E211C" />
 </svg>
 </div>

 {/* Title */}
 <div className="text-center mb-[32px]">
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px]">
 {isAnalyzing ? 'AI가 당신의 취향을' : '분석이 완료되었습니다!'}
 </p>
 {isAnalyzing && (
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px]">
 분석중입니다
 </p>
 )}
 </div>

 {/* Loading dots - only show when analyzing */}
 {isAnalyzing && (
 <div className="flex gap-[4px] mb-[64px]">
 <div className="w-[8px] h-[8px] bg-[#2e211c] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
 <div className="w-[8px] h-[8px] bg-[#2e211c] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
 <div className="w-[8px] h-[8px] bg-[#2e211c] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
 </div>
 )}

 {/* Description */}
 <div className={`text-center text-[#665a55] text-[16px] ${!isAnalyzing ? 'mt-[64px]' : ''}`}>
 <p className="leading-[20px]">선택하신 정보를 바탕으로</p>
 <p className="leading-[20px]">최적의 유행음식을 추천해드릴게요</p>
 </div>
 </div>
 </OnboardingLayout>
 );
}

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
 step={6}
 totalSteps={6}
 onNext={handleNext}
 nextButtonText="마이페이지로 이동"
 showBackButton={false}
 nextButtonDisabled={isAnalyzing}
 >
 <div className="px-[24px] flex flex-col h-full items-center justify-center">
 <div className="relative w-[72px] h-[71px] mb-[24px]">
 <svg className="w-full h-full" fill="none" viewBox="0 0 72.4167 71.5">
 <path d={svgPaths.p3f129be0} fill="#2E211C" />
 </svg>
 </div>

 <div className="text-center mb-[32px]">
 <p className="font-black leading-[30px] text-[#2e211c] text-[26px] mb-[8px]">
 {isAnalyzing ? 'AI가 당신의 취향을' : '분석이 완료되었습니다!'}
 </p>
 {isAnalyzing && (
 <p className="font-black leading-[30px] text-[#2e211c] text-[26px] mb-[8px]">
 분석중입니다
 </p>
 )}
 </div>

 {isAnalyzing && (
 <div className="flex gap-[4px] mb-[64px]">
 <div className="w-[8px] h-[8px] bg-[#2e211c] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
 <div className="w-[8px] h-[8px] bg-[#2e211c] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
 <div className="w-[8px] h-[8px] bg-[#2e211c] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
 </div>
 )}

 {!isAnalyzing && (
 <div className="w-full rounded-2xl border-2 border-[#9cb8b7] bg-[#f0f6f6] p-5 mb-6">
 <p className="font-bold text-[#335352] text-[15px] mb-3">트렌딧 지수란?</p>
 <div className="space-y-2.5 text-[13px] leading-[20px] text-[#665a55]">
 <div className="flex items-start gap-2">
 <span className="mt-0.5 shrink-0 rounded-full bg-[#9cb8b7] px-1.5 py-0.5 text-[11px] font-bold text-white">전체</span>
 <p>전체 유저들이 해당 음식에 만족한 비율이에요.</p>
 </div>
 <div className="flex items-start gap-2">
 <span className="mt-0.5 shrink-0 rounded-full bg-[#335352] px-1.5 py-0.5 text-[11px] font-bold text-white">나</span>
 <p>나와 취향이 비슷한 유저들(취향 일치율 70% 이상)이 만족한 비율이에요. 숫자가 높을수록 내가 좋아할 가능성이 높아요.</p>
 </div>
 </div>
 </div>
 )}

 <div className={`text-center text-[#665a55] text-[16px] ${!isAnalyzing ? '' : ''}`}>
 <p className="leading-[20px]">남겨주신 리뷰와 취향 정보를 바탕으로</p>
 <p className="leading-[20px]">최적의 유행음식을 추천해드릴게요</p>
 </div>
 </div>
 </OnboardingLayout>
 );
}

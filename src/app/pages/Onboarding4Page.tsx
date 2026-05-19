import { useNavigate } from 'react-router';
import OnboardingLayout from '../components/OnboardingLayout';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function Onboarding4Page() {
 const navigate = useNavigate();
 const { favoriteFoods, setFavoriteFoods } = useOnboarding();

 const handleNext = () => {
 navigate('/onboarding5');
 };

 const handleBack = () => {
 navigate('/onboarding3');
 };

 return (
 <OnboardingLayout
 step={4}
 totalSteps={4}
 onNext={handleNext}
 onBack={handleBack}
 nextButtonDisabled={favoriteFoods.trim().length === 0}
 >
 <div className="px-[24px] flex flex-col h-full">
 {/* Heading */}
 <div className="text-center mb-[60px]">
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px] mb-[8px]">
 좋아하는 음식이 있나요?
 </p>
 <p className=" leading-[20px] text-[#665a55] text-[16px]">
 평소에 즐겨 먹는 음식을 알려주세요
 </p>
 </div>

 {/* Text area */}
 <div className="flex-1">
 <textarea
 value={favoriteFoods}
 onChange={(e) => setFavoriteFoods(e.target.value)}
 placeholder="좋아하는 음식들을 자유롭게 입력해주세요. &#10;AI가 당신의 취향을 분석하는데 도움이 될거예요!"
 className="w-full h-[304px] border-2 border-[#665a55] rounded-[5px] p-[14px] text-[13px] text-[#2e211c] placeholder:text-[#9e9794] resize-none focus:outline-none"
 />
 </div>
 </div>
 </OnboardingLayout>
 );
}

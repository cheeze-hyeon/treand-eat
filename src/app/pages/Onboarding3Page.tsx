import { useNavigate } from 'react-router';
import OnboardingLayout from '../components/OnboardingLayout';
import { useOnboarding } from '../contexts/OnboardingContext';

const flavors = [
 '달콤한', '매콤한', '고소한', '매운',
 '시큼한', '쌉싸름한', '짭짜름한', '담백한',
 '진한', '가벼운', '상큼한', '느끼한',
 '슴슴한', '자극적인'
];

export default function Onboarding3Page() {
 const navigate = useNavigate();
 const { selectedFlavors, setSelectedFlavors } = useOnboarding();

 const toggleFlavor = (flavor: string) => {
 if (selectedFlavors.includes(flavor)) {
 setSelectedFlavors(selectedFlavors.filter(f => f !== flavor));
 } else {
 setSelectedFlavors([...selectedFlavors, flavor]);
 }
 };

 const handleNext = () => {
 navigate('/onboarding4');
 };

 const handleBack = () => {
 navigate('/onboarding2');
 };

 return (
 <OnboardingLayout
 step={3}
 totalSteps={4}
 onNext={handleNext}
 onBack={handleBack}
 nextButtonDisabled={selectedFlavors.length === 0}
 >
 <div className="px-[24px] flex flex-col h-full">
 {/* Heading */}
 <div className="text-center mb-[24px]">
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px] mb-[8px]">
 끌리는 맛을 골라주세요
 </p>
 <div className=" text-[#665a55] text-[16px]">
 <p className="leading-[20px]">단짠, 고소함, 쌉싸름까지</p>
 <p className="leading-[20px]">내 입맛에 맞는 상품을 찾아드릴게요.</p>
 </div>
 </div>

 {/* Flavor selection grid */}
 <div className="flex-1 overflow-y-auto">
 <div className="grid grid-cols-2 gap-x-[13px] gap-y-[12px]">
 {flavors.map((flavor) => (
 <button
 key={flavor}
 onClick={() => toggleFlavor(flavor)}
 className={`h-[41px] rounded-[5px] flex items-center justify-center px-[29px] py-[13px] border-2 ${
 selectedFlavors.includes(flavor)
 ? 'bg-[#9cb8b7] border-[#9cb8b7]'
 : 'bg-white border-[#665a55]'
 }`}
 >
 <p className={`font-bold text-[16px] whitespace-nowrap ${
 selectedFlavors.includes(flavor) ? 'text-[#335352]' : 'text-black'
 }`}>
 {flavor}
 </p>
 </button>
 ))}
 </div>
 </div>
 </div>
 </OnboardingLayout>
 );
}

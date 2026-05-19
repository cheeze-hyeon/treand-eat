import { useNavigate } from 'react-router';
import OnboardingLayout from '../components/OnboardingLayout';
import { useOnboarding } from '../contexts/OnboardingContext';

const textures = [
 '쫀득한', '바삭한', '부드러운', '꾸덕한',
 '푹신한', '쫄깃한', '찐득한', '아삭한',
 '촉촉한', '포슬포슬한', '입에서 녹는', '크리미한',
 '묵직한', '부서지는'
];

export default function Onboarding2Page() {
 const navigate = useNavigate();
 const { selectedTextures, setSelectedTextures } = useOnboarding();

 const toggleTexture = (texture: string) => {
 if (selectedTextures.includes(texture)) {
 setSelectedTextures(selectedTextures.filter(t => t !== texture));
 } else {
 setSelectedTextures([...selectedTextures, texture]);
 }
 };

 const handleNext = () => {
 navigate('/onboarding3');
 };

 const handleBack = () => {
 navigate('/onboarding');
 };

 return (
 <OnboardingLayout
 step={2}
 totalSteps={4}
 onNext={handleNext}
 onBack={handleBack}
 nextButtonDisabled={selectedTextures.length === 0}
 >
 <div className="px-[24px] flex flex-col h-full overflow-hidden">
 {/* Heading */}
 <div className="text-center mb-[24px]">
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px] mb-[8px]">
 어떤 식감을 좋아하세요?
 </p>
 <div className=" text-[#665a55] text-[16px]">
 <p className="leading-[20px]">쫀득한 떡부터 바삭한 쿠키까지,</p>
 <p className="leading-[20px]">취향에 맞는 후기를 보여드릴게요.</p>
 </div>
 </div>

 {/* Texture selection grid */}
 <div className="flex-1 overflow-y-auto mb-[16px]">
 <div className="grid grid-cols-2 gap-x-[13px] gap-y-[12px]">
 {textures.map((texture) => (
 <button
 key={texture}
 onClick={() => toggleTexture(texture)}
 className={`h-[41px] rounded-[5px] flex items-center justify-center px-[29px] py-[13px] border-2 ${
 selectedTextures.includes(texture)
 ? 'bg-[#9cb8b7] border-[#9cb8b7]'
 : 'bg-white border-[#665a55]'
 }`}
 >
 <p className={`font-bold text-[16px] whitespace-nowrap ${
 selectedTextures.includes(texture) ? 'text-[#335352]' : 'text-black'
 }`}>
 {texture}
 </p>
 </button>
 ))}
 </div>
 </div>
 </div>
 </OnboardingLayout>
 );
}

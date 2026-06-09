import { useState } from 'react';
import { useNavigate } from 'react-router';
import OnboardingLayout from '../components/OnboardingLayout';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function Onboarding4Page() {
  const navigate = useNavigate();
  const { setSelectedFoods } = useOnboarding();
  const [inputValue, setInputValue] = useState('');

  const handleNext = () => {
    const foods = inputValue
      .split(/[,，\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    setSelectedFoods(foods);
    navigate('/write-review', { state: { fromOnboarding: true } });
  };

  const handleBack = () => {
    navigate('/onboarding3');
  };

  return (
    <OnboardingLayout
      step={4}
      totalSteps={6}
      onNext={handleNext}
      onBack={handleBack}
      nextButtonDisabled={inputValue.trim().length === 0}
    >
      <div className="flex h-full flex-col px-[24px]">
        <div className="mb-[32px] text-center">
          <p className="mb-[8px] text-[26px] font-black leading-[30px] text-[#2e211c]">
            좋아하는 음식을 알려주세요
          </p>
          <div className="text-[16px] text-[#665a55]">
            <p className="leading-[20px]">취향에 맞는 트렌드 음식을</p>
            <p className="leading-[20px]">더 정확하게 찾아드릴게요.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={"예: 마카롱, 크루아상, 타코\n쉼표로 구분해서 입력해주세요"}
            className="h-[140px] w-full resize-none rounded-[12px] border-2 border-[#665a55] bg-white px-[16px] py-[14px] text-[15px] text-[#2e211c] placeholder-[#c8b8b0] outline-none focus:border-[#9cb8b7]"
          />
          <p className="text-right text-[12px] text-[#9e9794]">쉼표(,)로 여러 음식을 구분할 수 있어요</p>
        </div>
      </div>
    </OnboardingLayout>
  );
}

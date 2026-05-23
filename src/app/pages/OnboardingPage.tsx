import { useState } from 'react';
import { useNavigate } from 'react-router';
import OnboardingLayout from '../components/OnboardingLayout';
import { useOnboarding } from '../contexts/OnboardingContext';
import svgPaths from "../../imports/온보딩6/svg-n3ek6if6gl";

const regionData: Record<string, string[]> = {
 '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
 '부산광역시': ['강서구', '금정구', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구', '기장군'],
 '대구광역시': ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구', '달성군', '군위군'],
 '인천광역시': ['계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '중구', '강화군', '옹진군'],
 '광주광역시': ['광산구', '남구', '동구', '북구', '서구'],
 '대전광역시': ['대덕구', '동구', '서구', '유성구', '중구'],
 '울산광역시': ['남구', '동구', '북구', '중구', '울주군'],
 '세종특별자치시': ['세종시'],
 '경기도': ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '하남시', '오산시', '양주시', '이천시', '구리시', '안성시', '포천시', '의왕시', '양평군', '여주시', '동두천시', '가평군', '과천시', '연천군'],
 '강원특별자치도': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
 '충청북도': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
 '충청남도': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
 '전북특별자치도': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
 '전라남도': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
 '경상북도': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
 '경상남도': ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
 '제주특별자치도': ['제주시', '서귀포시']
};

const provinces = Object.keys(regionData);

export default function OnboardingPage() {
 const navigate = useNavigate();
 const { selectedDistricts, setSelectedDistricts } = useOnboarding();
 const [selectedProvince, setSelectedProvince] = useState<string>('서울특별시');

 const toggleDistrict = (district: string) => {
 if (selectedDistricts.includes(district)) {
 setSelectedDistricts(selectedDistricts.filter(d => d !== district));
 } else {
 if (selectedDistricts.length < 10) {
 setSelectedDistricts([...selectedDistricts, district]);
 }
 }
 };

 const removeDistrict = (district: string) => {
 setSelectedDistricts(selectedDistricts.filter(d => d !== district));
 };

 const currentDistricts = regionData[selectedProvince] || [];

 const handleNext = () => {
 navigate('/onboarding2');
 };

 const handleBack = () => {
 navigate('/');
 };

 return (
 <OnboardingLayout
 step={1}
 totalSteps={4}
 onNext={handleNext}
 onBack={handleBack}
 showBackButton={false}
 nextButtonDisabled={selectedDistricts.length === 0}
 >
 <div className="px-[24px] flex flex-col h-full">
 {/* Fixed Header Section */}
 <div className="shrink-0">
 {/* Heading */}
 <div className="text-center mb-[20px]">
 <p className="font-black leading-[30px] text-[#2e211c] text-[26px] mb-[8px]">
 자주 가는 동네를 알려주세요
 </p>
 <p className=" leading-[26px] text-[#665a55] text-[16px]">
 가까운 곳에서 뜨는 유행 음식을 먼저 추천해드릴게요
 </p>
 </div>

 {/* Search bar */}
 <div className="relative mb-[20px]">
 <div className="bg-white border-2 border-[#665a55] h-[34px] rounded-[5px] flex items-center justify-between px-[12px]">
 <p className=" text-[#9e9794] text-[13px]">
 지역명 또는 역명 검색 예) 강남구, 역삼역
 </p>
 <div className="size-[19px] shrink-0">
 <svg className="size-full" fill="none" viewBox="0 0 19 19">
 <g>
 <path d={svgPaths.pf762400} stroke="#665A55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d={svgPaths.p127d83e0} stroke="#665A55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </g>
 </svg>
 </div>
 </div>
 </div>

 {/* Current location button */}
 <button className="flex items-center gap-[8px] mb-[16px] self-end">
 <div className="size-[16px]">
 <svg className="size-full" fill="none" viewBox="0 0 16 16">
 <path d={svgPaths.p30d55750} fill="#665A55" />
 </svg>
 </div>
 <p className=" text-[#665a55] text-[13px]">
 현재 위치 추가
 </p>
 </button>
 </div>

 {/* Scrollable Content Section */}
 <div className="flex-1 flex flex-col min-h-0">
 {/* Selection area */}
 <div className="flex gap-[4px] mb-[16px] flex-1 min-h-0">
 {/* 시/도 column */}
 <div className="flex-1 border-t-2 border-[#665A55] flex flex-col min-h-0">
 <p className="font-bold text-[#665a55] text-[13px] text-center py-[8px] shrink-0">
 시/도
 </p>
 <div className="overflow-y-auto flex-1">
 {provinces.map((province) => (
 <button
 key={province}
 onClick={() => setSelectedProvince(province)}
 className={`w-full py-[8px] ${
 selectedProvince === province ? 'bg-white' : 'bg-transparent'
 }`}
 >
 <p className={`font-bold text-[13px] text-center ${
 selectedProvince === province ? 'text-[#2e211c]' : 'text-[#9e9794]'
 }`}>
 {province.replace('특별시', '').replace('광역시', '').replace('특별자치시', '').replace('특별자치도', '').replace('도', '')}
 </p>
 </button>
 ))}
 </div>
 </div>

 {/* Divider */}
 <div className="w-[2px] bg-[#9E9794]" />

 {/* 구 column */}
 <div className="flex-[2] border-t-2 border-[#665A55] flex flex-col min-h-0">
 <p className="font-bold text-[#665a55] text-[13px] text-center py-[8px] shrink-0">
 시/구/군
 </p>
 <div className="overflow-y-auto flex-1">
 <button className="w-full py-[8px]">
 <p className="font-bold text-[#2e211c] text-[13px] text-center">
 전체
 </p>
 </button>
 {currentDistricts.map((district) => (
 <button
 key={district}
 onClick={() => toggleDistrict(district)}
 className={`w-full py-[8px] ${
 selectedDistricts.includes(district) ? 'bg-[#9cb8b7]' : 'bg-white'
 }`}
 >
 <p className={`font-bold text-[13px] text-center ${
 selectedDistricts.includes(district) ? 'text-[#335352]' : 'text-[#2e211c]'
 }`}>
 {district}
 </p>
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Selected districts info */}
 <div className="mb-[12px] shrink-0">
 <p className="font-bold text-[10px]">
 <span className="text-[#9cb8b7]">최대 10개</span>
 <span className="text-[#9e9794]">까지 선택할 수 있어요.</span>
 </p>
 </div>

 {/* Selected tags */}
 <div className="flex flex-wrap gap-[7px] shrink-0">
 {selectedDistricts.map((district) => (
 <div
 key={district}
 className="bg-[#335352] h-[27px] px-[12px] rounded-[5px] flex items-center gap-[6px] cursor-pointer"
 onClick={() => removeDistrict(district)}
 >
 <p className="font-bold text-[13px] text-white whitespace-nowrap">
 {district}
 </p>
 <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 14 14">
 <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </svg>
 </div>
 ))}
 </div>
 </div>
 </div>
 </OnboardingLayout>
 );
}

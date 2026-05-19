import React from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import svgPaths from '../../imports/마이페이지본인이보는/svg-efmvaixmp8';

export default function MyPage() {
 const navigate = useNavigate();

 return (
 <div className="bg-white h-full w-full min-h-0 overflow-y-auto">
 {/* Header */}
 <div className="bg-white flex gap-[180px] h-[79px] items-center justify-center py-[17px] sticky top-0 z-10">
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px] whitespace-nowrap">마이페이지</p>
 <div className="flex gap-[18px] items-center">
 <div className="h-[19.996px] w-[18px]">
 <div>
 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0002 21.9965">
 <g>
 <path d={svgPaths.p76feb0} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d={svgPaths.p9601900} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </g>
 </svg>
 </div>
 </div>
 <div className="size-[24px]">
 <svg className="block size-full" fill="none" viewBox="0 0 24 24">
 <g clipPath="url(#clip0_13_1116)">
 <path d={svgPaths.p3cccb600} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d={svgPaths.p3737f500} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </g>
 <defs>
 <clipPath id="clip0_13_1116">
 <rect fill="white" height="24" width="24" />
 </clipPath>
 </defs>
 </svg>
 </div>
 </div>
 </div>

 {/* Profile Section */}
 <div className="px-[30px] py-[9px]">
 <div className="relative h-[210px]">
 {/* Profile Image */}
 <div className="absolute left-0 top-[13px]">
 <div className="bg-[#2e211c] flex items-center justify-center rounded-[50px] size-[70px]">
 <div className="h-[45px] w-[36px]">
 <svg className="size-full" fill="none" viewBox="0 0 36 45">
 <path d={svgPaths.p2439f600} fill="white" />
 </svg>
 </div>
 </div>
 </div>

 {/* Profile Info */}
 <div className="absolute left-[87px] top-[13px]">
 <p className="font-bold leading-[32px] text-[#171717] text-[24px]">김트민</p>
 <p className=" leading-[20px] text-[#9e9794] text-[14px] mt-[-4px]">@kimtumeannnnn__</p>
 <div className="flex gap-[16px] mt-[4px]">
 <p className=" text-[14px]">
 <span className="text-[#171717]">팔로워 </span>
 <span className="text-[#9cb8b7]">248</span>
 </p>
 <button onClick={() => navigate('/following-list')} className=" text-[14px]">
 <span className="text-[#171717]">팔로잉 </span>
 <span className="text-[#9cb8b7]">5</span>
 </button>
 </div>
 </div>

 {/* Location */}
 <div className="absolute left-0 top-[97px] flex gap-[4px] items-start">
 <div className="h-[16px] w-[17px]">
 <svg className="size-full" fill="none" viewBox="0 0 17 16">
 <g>
 <path d={svgPaths.p3c447c80} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 <path d={svgPaths.p24084100} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 </g>
 </svg>
 </div>
 <p className=" text-[#c06226] text-[13px]">서울 관악구, 서울 강남구</p>
 </div>

 {/* Bio */}
 <p className="absolute left-0 top-[116px] leading-[20px] text-[#525252] text-[13px]">
 요즘 핫한 디저트는 다 먹어봐야 직성이 풀려요 🍰
 </p>

 {/* Edit Button */}
 <button className="absolute left-0 top-[155px] w-[341px] border-2 border-[#2e211c] rounded-[10px] py-[10px]">
 <p className="font-bold text-[16px] text-[#2e211c]">프로필 수정</p>
 </button>
 </div>
 </div>

 {/* Divider */}
 <div className="h-[1px] bg-[#2A2927] opacity-[0.285714] mx-[30px]" />

 {/* Storage Section */}
 <div className="px-[30px] py-[15px]">
 <p className="font-bold leading-[28px] text-[#2e211c] text-[18px] mb-[12px]">보관함</p>

 <div className="flex gap-[13px]">
 {/* 작성한 리뷰 */}
 <button onClick={() => navigate('/my-reviews')} className="bg-white border-2 border-[#2e211c] rounded-[10px] p-[18px] flex flex-col gap-[8px] items-center justify-center flex-1">
 <div className="size-[25px]">
 <svg className="size-full" fill="none" viewBox="0 0 25 25">
 <g>
 <path d={svgPaths.p1a8cae00} stroke="#9CB8B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
 </g>
 </svg>
 </div>
 <p className="font-extrabold leading-[16px] text-[#2e211c] text-[12px]">작성한 리뷰</p>
 </button>

 {/* 공감한 리뷰 */}
 <button onClick={() => navigate('/liked-reviews')} className="bg-white border-2 border-[#2e211c] rounded-[10px] p-[18px] flex flex-col gap-[8px] items-center justify-center flex-1">
 <div className="size-[25px]">
 <svg className="size-full" fill="none" viewBox="0 0 25 25">
 <g>
 <path d={svgPaths.pa33d280} stroke="#9CB8B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
 </g>
 </svg>
 </div>
 <p className="font-extrabold leading-[16px] text-[#2e211c] text-[12px]">공감한 리뷰</p>
 </button>

 {/* 저장 */}
 <button onClick={() => navigate('/saved-items')} className="bg-white border-2 border-[#2e211c] rounded-[10px] p-[18px] flex flex-col gap-[8px] items-center justify-center flex-1">
 <div className="size-[25px]">
 <svg className="size-full" fill="none" viewBox="0 0 25 25">
 <g>
 <path d={svgPaths.p31bca400} stroke="#9CB8B7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
 </g>
 </svg>
 </div>
 <p className="font-extrabold leading-[16px] text-[#2e211c] text-[12px]">저장</p>
 </button>
 </div>
 </div>

 {/* Preference Analysis Section */}
 <div className="px-[30px] pb-[24px]">
 <div className="mb-[12px]">
 <p className="font-bold leading-[28px] text-[#171717] text-[18px] inline">취향 분석</p>
 <button className="ml-[8px] inline">
 <p className=" text-[#797979] text-[12px] underline">변경하기</p>
 </button>
 </div>

 <div className="flex gap-[10px] mb-[12px]">
 <div className="bg-[#335352] rounded-[15px] px-[12px] py-[4px]">
 <p className="font-extrabold text-white text-[12px]"># 꾸덕한</p>
 </div>
 <div className="bg-[#335352] rounded-[15px] px-[12px] py-[4px]">
 <p className="font-extrabold text-white text-[12px]"># 쫀득한</p>
 </div>
 <div className="bg-[#335352] rounded-[15px] px-[12px] py-[4px]">
 <p className="font-extrabold text-white text-[12px]"># 느끼한</p>
 </div>
 </div>

 <div className=" text-[#404040]">
 <p className="font-bold text-[14px] leading-[22.75px]">꾸덕하고 진한 맛을 좋아하는 DEEP형</p>
 <p className="text-[12px] leading-[18px]">한 입 먹었을 때 묵직하게 남는 맛을 좋아해요. 가볍게 사라지는 음식보다</p>
 <p className="text-[12px] leading-[18px]">밀도 있고 존재감 강한 음식에 끌리는 타입이에요.</p>
 </div>
 </div>

 {/* Menu Section */}
 <div className="px-[30px] py-[15px]">
 <div className="flex flex-col gap-[11px]">
 <button className="flex items-center justify-between">
 <p className=" text-[#171717] text-[14px]">알림</p>
 <div className="h-[24px] w-[12px]">
 <svg className="size-full" fill="none" viewBox="0 0 7.36379 12.728">
 <path clipRule="evenodd" d={svgPaths.p1ad99240} fill="black" fillRule="evenodd" />
 </svg>
 </div>
 </button>

 <button className="flex items-center justify-between">
 <p className=" text-[#171717] text-[14px]">약관 및 정책</p>
 <div className="h-[24px] w-[12px]">
 <svg className="size-full" fill="none" viewBox="0 0 7.36379 12.728">
 <path clipRule="evenodd" d={svgPaths.p1ad99240} fill="black" fillRule="evenodd" />
 </svg>
 </div>
 </button>

 <button className="flex items-center justify-between">
 <p className=" text-[#171717] text-[14px]">고객 문의</p>
 <div className="h-[24px] w-[12px]">
 <svg className="size-full" fill="none" viewBox="0 0 7.36379 12.728">
 <path clipRule="evenodd" d={svgPaths.p1ad99240} fill="black" fillRule="evenodd" />
 </svg>
 </div>
 </button>

 <button className="text-left">
 <p className=" text-[#797979] text-[12px] underline">로그아웃</p>
 </button>
 </div>
 </div>

 <BottomNavigation />
 </div>
 );
}

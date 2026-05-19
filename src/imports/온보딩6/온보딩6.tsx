import React from 'react';
import svgPaths from "./svg-n3ek6if6gl";

function Icon() {
 return <div className="absolute left-[-52px] size-[16px] top-[648px]" data-name="Icon" />;
}

function Container1() {
 return (
 <div className="h-[110px] relative shrink-0 w-full" data-name="Container">
 <div className="flex flex-row items-center justify-center size-full">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-px pt-[57px] px-[179.583px] relative size-full">
 <p className="[word-break:break-word] font-bold leading-[20px] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">1 / 4</p>
 </div>
 </div>
 </div>
 );
}

function Container4() {
 return <div className="bg-[#2e211c] h-[8px] relative rounded-[22369600px] shrink-0 w-full" data-name="Container" />;
}

function Container3() {
 return (
 <div className="bg-[rgba(255,255,255,0.5)] h-[8px] relative rounded-[22369600px] shrink-0 w-full" data-name="Container">
 <div className="overflow-clip rounded-[inherit] size-full">
 <div className="content-stretch flex flex-col items-start pr-[256.5px] relative size-full">
 <Container4 />
 </div>
 </div>
 </div>
 );
}

function Container2() {
 return (
 <div className="h-[81px] relative shrink-0 w-full" data-name="Container">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] relative size-full">
 <Container3 />
 </div>
 </div>
 );
}

function Heading() {
 return (
 <div className="[word-break:break-word] h-[72px] not-italic relative shrink-0 text-center w-full" data-name="Heading 1">
 <p className="-translate-x-1/2 absolute font-bold leading-[36px] left-[176px] text-[#2e211c] text-[30px] top-0 w-[342px]">자주 가는 동네를 알려주세요</p>
 <p className="-translate-x-1/2 absolute leading-[26px] left-[176px] text-[#665a55] text-[16px] top-[36px] w-[342px]">가까운 곳에서 뜨는 유행 음식을 먼저 추천해드릴게요</p>
 </div>
 );
}

function Container6() {
 return (
 <div className="absolute content-stretch flex flex-col h-[62px] items-start left-[24px] right-[24px] top-0" data-name="Container">
 <Heading />
 </div>
 );
}

function Search() {
 return (
 <div className="absolute left-[330px] size-[19px] top-[98px]" data-name="search">
 <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
 <g id="search">
 <path d={svgPaths.pf762400} id="Vector" stroke="var(--stroke-0, #665A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d={svgPaths.p127d83e0} id="Vector_2" stroke="var(--stroke-0, #665A55)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </g>
 </svg>
 </div>
 );
}

function Crosshairs() {
 return <div className="absolute left-[267px] size-[24px] top-[138px]" data-name="crosshairs" />;
}

function Container5() {
 return (
 <div className="h-[547px] relative shrink-0 w-full" data-name="Container">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
 <Container6 />
 <div className="absolute bg-white border-2 border-[#665a55] border-solid h-[34px] left-[43px] rounded-[5px] top-[90px] w-[314px]" />
 <p className="-translate-x-1/2 [word-break:break-word] absolute leading-[26px] left-[152px] not-italic text-[#9e9794] text-[13px] text-center top-[94px] w-[342px]">지역명 또는 역명 검색 예) 강남구, 역삼역</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute h-[28px] leading-[26px] left-[318.5px] not-italic text-[#665a55] text-[13px] text-center top-[128px] w-[85px]">현재 위치 추가</p>
 <Search />
 <Crosshairs />
 <div className="absolute inset-[24.5%_30%_72.58%_66%]" data-name="Vector">
 <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
 <path d={svgPaths.p30d55750} fill="var(--fill-0, #665A55)" id="Vector" />
 </svg>
 </div>
 </div>
 </div>
 );
}

function Button() {
 return (
 <div className="absolute bg-[#2e211c] drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] h-[48px] left-[43px] right-[33px] rounded-[10px] top-[30px]" data-name="Button">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold leading-[24px] left-[162px] not-italic text-[16px] text-center text-white top-[12px] whitespace-nowrap">다음</p>
 </div>
 );
}

function Button1() {
 return (
 <div className="absolute h-[44px] left-[43px] right-[33px] top-[84px]" data-name="Button">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold leading-[20px] left-[161.5px] not-italic text-[#665a55] text-[14px] text-center top-[7px] whitespace-nowrap">뒤로가기</p>
 </div>
 );
}

function Container7() {
 return (
 <div className="h-[135px] relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(0deg, rgb(255, 249, 240) 0%, rgba(231, 226, 218, 0.93) 7.1429%, rgba(208, 203, 195, 0.86) 14.286%, rgba(185, 181, 174, 0.784) 21.429%, rgba(163, 159, 153, 0.714) 28.571%, rgba(141, 137, 132, 0.643) 35.714%, rgba(120, 117, 112, 0.573) 42.857%, rgba(99, 97, 93, 0.5) 50%, rgba(79, 77, 74, 0.427) 57.143%, rgba(60, 59, 56, 0.357) 64.286%, rgba(42, 41, 39, 0.286) 71.429%, rgba(25, 24, 23, 0.216) 78.571%, rgba(10, 9, 8, 0.14) 85.714%, rgba(1, 1, 1, 0.07) 92.857%, rgba(0, 0, 0, 0) 100%)" }} data-name="Container">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <Button />
 <Button1 />
 </div>
 </div>
 );
}

function Container() {
 return (
 <div className="absolute bg-white content-stretch flex flex-col h-[873px] items-start left-[-2px] overflow-clip rounded-[40px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-px w-[400px]" data-name="Container">
 <Container1 />
 <Container2 />
 <Container5 />
 <Container7 />
 </div>
 );
}

function Group1() {
 return (
 <div className="absolute contents left-[44px] top-[360px]">
 <div className="absolute bg-[#9cb8b7] h-[34px] left-[108px] top-[427px] w-[124px]" />
 <div className="absolute bg-[#9cb8b7] h-[33.474px] left-[232px] top-[444.4px] w-[125px]" />
 <div className="absolute bg-[#9cb8b7] h-[33.474px] left-[232px] top-[510.49px] w-[125px]" />
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[261px] not-italic text-[#2e211c] text-[13px] text-center top-[380.6px] w-[38px]">개포4동</p>
 <div className="absolute flex h-[31.757px] items-center justify-center left-[44px] top-[360px] w-[313px]">
 <div className="flex-none rotate-180">
 <div className="bg-white border-[#404040] border-solid border-t-2 h-[31.757px] relative w-[313px]" />
 </div>
 </div>
 <div className="absolute h-0 left-[44px] right-[45px] top-[360px]">
 <div className="absolute inset-[-2px_0_0_0]">
 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 313 2">
 <line id="Line 18" stroke="var(--stroke-0, #665A55)" strokeWidth="2" x2="313" y1="1" y2="1" />
 </svg>
 </div>
 </div>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73.5px] not-italic text-[#665a55] text-[13px] text-center top-[365.15px] w-[25px]">시/도</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[169px] not-italic text-[#665a55] text-[13px] text-center top-[365.15px] w-[40px]">시/구/군</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[294px] not-italic text-[#665a55] text-[13px] text-center top-[365.15px] w-[40px]">동/읍/면</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73.5px] not-italic text-[#2e211c] text-[13px] text-center top-[397.77px] w-[21px]">서울</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[127.5px] not-italic text-[#2e211c] text-[13px] text-center top-[397.77px] w-[21px]">전체</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[133px] not-italic text-[#335352] text-[13px] text-center top-[431.24px] w-[32px]">강남구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[133px] not-italic text-[#2e211c] text-[13px] text-center top-[464.71px] w-[32px]">강동구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[133px] not-italic text-[#2e211c] text-[13px] text-center top-[498.19px] w-[32px]">강북구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[133px] not-italic text-[#2e211c] text-[13px] text-center top-[531.66px] w-[32px]">강서구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[133px] not-italic text-[#2e211c] text-[13px] text-center top-[565.14px] w-[32px]">관악구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[133px] not-italic text-[#2e211c] text-[13px] text-center top-[598.61px] w-[32px]">광진구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[258px] not-italic text-[#2e211c] text-[13px] text-center top-[414.07px] w-[32px]">개포동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[261px] not-italic text-[#335352] text-[13px] text-center top-[447.55px] w-[38px]">논현1동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[261px] not-italic text-[#2e211c] text-[13px] text-center top-[481.02px] w-[38px]">논현2동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[258px] not-italic text-[#335352] text-[13px] text-center top-[514.5px] w-[32px]">논현동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[261px] not-italic text-[#2e211c] text-[13px] text-center top-[549.69px] w-[38px]">대치1동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[261px] not-italic text-[#2e211c] text-[13px] text-center top-[580.59px] w-[38px]">대치2동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[261px] not-italic text-[#2e211c] text-[13px] text-center top-[612.34px] w-[38px]">대치4동</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73.5px] not-italic text-[#9e9794] text-[13px] text-center top-[431.24px] w-[21px]">경기</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73.5px] not-italic text-[#9e9794] text-[13px] text-center top-[464.71px] w-[21px]">인천</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73.5px] not-italic text-[#9e9794] text-[13px] text-center top-[498.19px] w-[21px]">부산</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73px] not-italic text-[#9e9794] text-[13px] text-center top-[531.66px] w-[22px]">대구</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73px] not-italic text-[#9e9794] text-[13px] text-center top-[565.14px] w-[22px]">광주</p>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold h-[22.316px] leading-[26px] left-[73.5px] not-italic text-[#9e9794] text-[13px] text-center top-[598.61px] w-[21px]">대전</p>
 <div className="absolute inset-[59.61%_13.68%_39.13%_83.33%]" data-name="Vector">
 <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
 <path d={svgPaths.pcc11600} fill="var(--fill-0, #335352)" id="Vector" />
 </svg>
 </div>
 <div className="absolute inset-[52.17%_13.68%_46.57%_83.33%]" data-name="Vector">
 <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11">
 <path d={svgPaths.pcc11600} fill="var(--fill-0, #335352)" id="Vector" />
 </svg>
 </div>
 <div className="absolute bg-white border-[#404040] border-solid border-t-2 h-[48.924px] left-[44px] top-[626.08px] w-[313px]" />
 </div>
 );
}

function Group() {
 return (
 <div className="absolute inset-[76.09%_50.12%_22.48%_25.62%]" data-name="Group">
 <div className="absolute inset-[-8%_-1.03%]">
 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.5 14.5">
 <g id="Group">
 <path d={svgPaths.p1a877570} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d="M9.125 5.375L5.375 9.125" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d="M5.375 5.375L9.125 9.125" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <g id="Group_2">
 <path d={svgPaths.p29c26f00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d="M94.125 5.375L90.375 9.125" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d="M90.375 5.375L94.125 9.125" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </g>
 </g>
 </svg>
 </div>
 </div>
 );
}

export default function Component() {
 return (
 <div className="bg-white relative size-full" data-name="온보딩 6">
 <div className="absolute h-[4px] left-[472.67px] top-[189px] w-[8px]" data-name="Vector">
 <div className="absolute inset-[-16.67%_-8.33%]">
 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
 <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #737373)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
 </svg>
 </div>
 </div>
 <Icon />
 <Container />
 <Group1 />
 <div className="absolute flex h-[266px] items-center justify-center left-[108px] top-[360px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
 <div className="flex-none rotate-90">
 <div className="h-0 relative w-[266px]">
 <div className="absolute inset-[-1px_0]">
 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266 2">
 <path d="M0 1H266" id="Line 29" stroke="var(--stroke-0, #9E9794)" strokeWidth="2" />
 </svg>
 </div>
 </div>
 </div>
 </div>
 <div className="absolute flex h-[266.002px] items-center justify-center left-[231.5px] top-[360px] w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
 <div className="flex-none rotate-90">
 <div className="h-0 relative w-[266.002px]">
 <div className="absolute inset-[-1px_0]">
 <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266.002 2">
 <path d="M0 1H266.002" id="Line 30" stroke="var(--stroke-0, #9E9794)" strokeWidth="2" />
 </svg>
 </div>
 </div>
 </div>
 </div>
 <p className="[word-break:break-word] absolute leading-[0] left-[45px] not-italic text-[#9e9794] text-[10px] top-[630px] w-[342px]">
 <span className="font-bold leading-[26px] text-[#9cb8b7]">최대 10개</span>
 <span className="font-bold leading-[26px]">까지 선택할 수 있어요.</span>
 </p>
 <div className="absolute bg-[#335352] h-[27px] left-[45px] rounded-[5px] top-[658px] w-[78px]" />
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold leading-[24px] left-[70px] not-italic text-[13px] text-center text-white top-[659px] whitespace-nowrap">논현1동</p>
 <div className="absolute bg-[#335352] h-[27px] left-[45px] rounded-[5px] top-[658px] w-[78px]" />
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold leading-[24px] left-[70px] not-italic text-[13px] text-center text-white top-[659px] whitespace-nowrap">논현1동</p>
 <div className="absolute bg-[#335352] h-[27px] left-[130px] rounded-[5px] top-[658px] w-[78px]" />
 <div className="absolute bg-[#335352] h-[27px] left-[130px] rounded-[5px] top-[658px] w-[78px]" />
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-bold leading-[24px] left-[153px] not-italic text-[13px] text-center text-white top-[659px] whitespace-nowrap">논현동</p>
 <Group />
 </div>
 );
}
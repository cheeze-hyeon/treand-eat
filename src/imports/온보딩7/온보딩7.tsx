import React from 'react';

function Container1() {
 return (
 <div className="h-[110px] relative shrink-0 w-full" data-name="Container">
 <div className="flex flex-row items-center justify-center size-full">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-px pt-[57px] px-[179.583px] relative size-full">
 <p className="[word-break:break-word] font-bold leading-[20px] not-italic relative shrink-0 text-[#737373] text-[14px] whitespace-nowrap">2 / 4</p>
 </div>
 </div>
 </div>
 );
}

function Container4() {
 return <div className="bg-[#2e211c] h-[8px] relative rounded-[22369600px] shrink-0 w-[176px]" data-name="Container" />;
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
 <p className="-translate-x-1/2 absolute font-bold leading-[36px] left-[176px] text-[#2e211c] text-[30px] top-0 w-[342px]">어떤 식감을 좋아하세요?</p>
 <div className="-translate-x-1/2 absolute leading-[0] left-[171px] text-[#665a55] text-[16px] top-[44px] w-[342px]">
 <p className="leading-[20px] mb-0">쫀득한 떡부터 바삭한 쿠키까지,</p>
 <p className="leading-[20px]">취향에 맞는 후기를 보여드릴게요.</p>
 </div>
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

function Crosshairs() {
 return <div className="absolute left-[267px] size-[24px] top-[138px]" data-name="crosshairs" />;
}

function Frame() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-1 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">쫀득한</p>
 </div>
 );
}

function Frame1() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-1 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">바삭한</p>
 </div>
 );
}

function Frame2() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-2 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">부드러운</p>
 </div>
 );
}

function Frame3() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-2 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">꾸덕한</p>
 </div>
 );
}

function Frame4() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-3 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">푹신한</p>
 </div>
 );
}

function Frame5() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-3 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">쫄깃한</p>
 </div>
 );
}

function Frame6() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-4 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">찐득한</p>
 </div>
 );
}

function Frame7() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-4 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">아삭한</p>
 </div>
 );
}

function Frame8() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-5 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">촉촉한</p>
 </div>
 );
}

function Frame9() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-5 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">포슬포슬한</p>
 </div>
 );
}

function Frame10() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-6 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">입에서 녹는</p>
 </div>
 );
}

function Frame11() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-6 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">크리미한</p>
 </div>
 );
}

function Frame12() {
 return (
 <div className="bg-white col-1 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-7 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">묵직한</p>
 </div>
 );
}

function Frame13() {
 return (
 <div className="bg-white col-2 content-stretch flex h-[41px] items-center justify-center px-[29px] py-[13px] relative rounded-[5px] row-7 shrink-0 w-[139px]">
 <div aria-hidden="true" className="absolute border-2 border-[#665a55] border-solid inset-0 pointer-events-none rounded-[5px]" />
 <p className="[word-break:break-word] font-bold leading-[26px] not-italic relative shrink-0 text-[16px] text-black text-center whitespace-nowrap">부서지는</p>
 </div>
 );
}

function Frame14() {
 return (
 <div className="absolute gap-x-[13px] gap-y-[12px] grid-cols-[repeat(2,fit-content(100%))] grid-rows-[repeat(7,fit-content(100%))] inline-grid left-[54px] top-[115px]">
 <Frame />
 <Frame1 />
 <Frame2 />
 <Frame3 />
 <Frame4 />
 <Frame5 />
 <Frame6 />
 <Frame7 />
 <Frame8 />
 <Frame9 />
 <Frame10 />
 <Frame11 />
 <Frame12 />
 <Frame13 />
 </div>
 );
}

function Container5() {
 return (
 <div className="h-[547px] relative shrink-0 w-full" data-name="Container">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
 <Container6 />
 <Crosshairs />
 <Frame14 />
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

function Button2() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[325px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[162.5px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[325px]">쫀득한</p>
 </div>
 </div>
 );
}

function Button3() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-1/2 not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">바삭한</p>
 </div>
 </div>
 );
}

function Button4() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">부드러운</p>
 </div>
 </div>
 );
}

function Button5() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">꾸덕한</p>
 </div>
 </div>
 );
}

function Button6() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">폭신한</p>
 </div>
 </div>
 );
}

function Button7() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">쫄깃한</p>
 </div>
 </div>
 );
}

function Button8() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">촉촉한</p>
 </div>
 </div>
 );
}

function Button9() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">사르르 녹는</p>
 </div>
 </div>
 );
}

function Button10() {
 return (
 <div className="bg-white h-[60px] relative rounded-[16px] shrink-0 w-[326px]" data-name="Button">
 <div aria-hidden="true" className="absolute border-2 border-[#e5e5e5] border-solid inset-0 pointer-events-none rounded-[16px]" />
 <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-medium leading-[20px] left-[163px] not-italic text-[#262626] text-[14px] text-center top-[20px] w-[326px]">오독오독한</p>
 </div>
 </div>
 );
}

function Container8() {
 return (
 <div className="relative shrink-0 w-[326px]" data-name="Container">
 <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full">
 <Button2 />
 <Button3 />
 <Button4 />
 <Button5 />
 <Button6 />
 <Button7 />
 <Button8 />
 <Button9 />
 <Button10 />
 </div>
 </div>
 );
}

function Container() {
 return (
 <div className="absolute bg-white content-stretch flex flex-col h-[873px] items-start left-0 overflow-clip rounded-[40px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] top-px w-[400px]" data-name="Container">
 <Container1 />
 <Container2 />
 <Container5 />
 <Container7 />
 <Container8 />
 </div>
 );
}

export default function Component() {
 return (
 <div className="bg-white relative size-full" data-name="온보딩 7">
 <Container />
 </div>
 );
}
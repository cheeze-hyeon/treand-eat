import React from 'react';

function Component() {
 return (
 <div className="absolute bg-[#2e211c] h-[874px] left-0 overflow-clip top-0 w-[402px]" data-name="오프닝 화면">
 <div className="-translate-x-1/2 absolute flex h-[62.745px] items-center justify-center left-[197.69px] top-[372px] w-[183.371px]" style={{ "--transform-inner-width": "300", "--transform-inner-height": "19" } as React.CSSProperties}>
 <div className="flex-none rotate-[-8.68deg]">
 <p className="[word-break:break-word] font-['Bayon:Regular',sans-serif] leading-[36px] not-italic relative text-[#9cb8b7] text-[80px] text-center whitespace-nowrap">Trend</p>
 </div>
 </div>
 <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Bayon:Regular',sans-serif] leading-[36px] left-[257px] not-italic text-[64px] text-center text-white top-[427px] whitespace-nowrap">EAT</p>
 <p className="[word-break:break-word] absolute font-bold leading-[normal] left-[111px] not-italic text-[12px] text-white top-[488px] whitespace-nowrap">취향에 맞게 고르는 요즘 유행 음식들</p>
 </div>
 );
}

export default function Frame() {
 return (
 <div className="relative size-full">
 <Component />
 </div>
 );
}
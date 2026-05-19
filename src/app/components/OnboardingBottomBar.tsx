import { ReactNode } from 'react';

interface OnboardingBottomBarProps {
 children: ReactNode;
}

export default function OnboardingBottomBar({ children }: OnboardingBottomBarProps) {
 return (
 <div className="h-fit shrink-0 px-[24px] py-[30px] bg-gradient-to-t from-black/25 to-transparent">
 {children}
 </div>
 );
}

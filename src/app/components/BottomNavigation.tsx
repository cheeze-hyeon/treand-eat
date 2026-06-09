import { useNavigate, useLocation } from 'react-router';
import svgPaths from '../../imports/마이페이지본인이보는/svg-efmvaixmp8';

export type BottomNavTab = 'home' | 'explore' | 'map' | 'write' | 'my';

const TAB_ROUTES: Record<BottomNavTab, string> = {
 home: '/home',
 explore: '/foods',
 map: '/map',
 write: '/write-review',
 my: '/mypage',
};

const TABS: { id: BottomNavTab; label: string; iconPath: string }[] = [
 { id: 'home', label: '홈', iconPath: svgPaths.p10fa0400 },
 { id: 'explore', label: '탐색', iconPath: svgPaths.p3a6410f0 },
 { id: 'map', label: '지도', iconPath: svgPaths.p16a40d00 },
 { id: 'write', label: '리뷰 작성', iconPath: svgPaths.p33810a00 },
 { id: 'my', label: '마이', iconPath: svgPaths.p1c9c7e00 },
];

export function getActiveTabFromPath(pathname: string): BottomNavTab | null {
 if (pathname === '/home') return 'home';
 if (pathname.startsWith('/food/')) return 'home';
 if (pathname === '/foods' || pathname.startsWith('/foods/') || pathname.startsWith('/store/')) {
 return 'explore';
 }
 if (pathname === '/map') return 'map';
 if (pathname === '/write-review') return 'write';
 if (
 pathname === '/mypage' ||
 pathname.startsWith('/my-') ||
 pathname === '/following-list' ||
 pathname.startsWith('/liked-') ||
 pathname.startsWith('/saved-') ||
 pathname.startsWith('/profile/')
 ) {
 return 'my';
 }
 return null;
}

type BottomNavigationProps = {
 activeTab?: BottomNavTab;
};

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
 const navigate = useNavigate();
 const { pathname } = useLocation();
 const currentTab = activeTab ?? getActiveTabFromPath(pathname);

 return (
 <div className="sticky bottom-0 bg-white shadow-[0px_-4px_10px_rgba(0,0,0,0.1)] px-[16px] py-[12px]">
 <div className="flex items-center justify-between">
 {TABS.map((tab) => {
 const isActive = currentTab === tab.id;
 const color = isActive ? '#2E211C' : '#9E9794';

 return (
 <button
 key={tab.id}
 onClick={() => navigate(TAB_ROUTES[tab.id])}
 className="flex flex-col gap-[5.677px] items-center justify-center size-[45px]"
 >
 <div className="size-[25.548px]">
 <svg className="size-full" fill="none" viewBox="0 0 25.5484 25.5484">
 <path d={tab.iconPath} fill={color} />
 </svg>
 </div>
 <p
 className="font-bold text-[10px]"
 style={{ color }}
 >
 {tab.label}
 </p>
 </button>
 );
 })}
 </div>
 </div>
 );
}

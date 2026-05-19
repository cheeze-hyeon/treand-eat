import { Outlet } from 'react-router';

export default function RootLayout() {
 return (
 <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f5f5]">
 <div className="flex h-full w-full max-h-[852px] max-w-[393px] min-h-0 min-w-0 flex-col overflow-hidden">
 <Outlet />
 </div>
 </div>
 );
}

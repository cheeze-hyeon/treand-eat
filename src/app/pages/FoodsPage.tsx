import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import svgPaths from '../../imports/마이페이지본인이보는/svg-efmvaixmp8';
import { FOODS } from '../data/foods';

const CATEGORIES = ['전체', '디저트', '간식', '한식', '카페'] as const;

export default function FoodsPage() {
 const navigate = useNavigate();
 const [search, setSearch] = useState('');
 const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('전체');

 const filteredFoods = useMemo(() => {
 const query = search.trim().toLowerCase();

 return FOODS.filter((food) => {
 const matchesCategory = category === '전체' || food.category === category;
 const matchesSearch =
 query.length === 0 ||
 food.name.toLowerCase().includes(query) ||
 food.description.toLowerCase().includes(query);

 return matchesCategory && matchesSearch;
 });
 }, [category, search]);

 return (
 <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
 <div className="flex h-[79px] shrink-0 items-center justify-between px-4 py-[17px] bg-white">
 <p className="font-bold text-[30px] leading-[36px] text-[#2e211c]">
 탐색
 </p>
 <div className="h-[20px] w-[18px]">
 <svg className="block size-full" fill="none" viewBox="0 0 20.0002 21.9965">
 <path
 d={svgPaths.p76feb0}
 stroke="#2e211c"
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 />
 <path
 d={svgPaths.p9601900}
 stroke="#2e211c"
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 />
 </svg>
 </div>
 </div>

 <div className="flex-1 overflow-y-auto px-[18px] pb-4">
 <div className="flex flex-col gap-4">
 <div className="flex h-[44px] items-center gap-2 rounded-[12px] border-2 border-[#2e211c] bg-[#f7f4f0] px-3">
 <div className="size-[18px] shrink-0">
 <svg className="size-full" fill="none" viewBox="0 0 25.5484 25.5484">
 <path d={svgPaths.p3a6410f0} fill="#9e9794" />
 </svg>
 </div>
 <input
 type="text"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 placeholder="음식 이름으로 검색"
 className="flex-1 bg-transparent text-[14px] text-[#2e211c] placeholder:text-[#9e9794] outline-none"
 />
 </div>

 <div className="flex gap-2 overflow-x-auto pb-1">
 {CATEGORIES.map((item) => {
 const isActive = category === item;

 return (
 <button
 key={item}
 onClick={() => setCategory(item)}
 className={`shrink-0 rounded-full border-2 px-4 py-2 text-[13px] transition-colors ${
 isActive
 ? 'border-[#2e211c] bg-[#2e211c] text-white'
 : 'border-[#2e211c] bg-white text-[#2e211c]'
 }`}
 >
 {item}
 </button>
 );
 })}
 </div>

 <div className="flex items-center justify-between">
 <p className="font-bold text-[#2e211c] text-base">
 유행 음식
 </p>
 <p className=" text-[#9e9794] text-xs">
 총 {filteredFoods.length}개
 </p>
 </div>

 <div className="flex flex-col gap-3">
 {filteredFoods.length === 0 ? (
 <div className="flex h-[200px] items-center justify-center rounded-[14px] border-2 border-dashed border-[#9e9794] bg-[#f7f4f0]">
 <p className=" text-[#9e9794] text-sm">
 검색 결과가 없어요
 </p>
 </div>
 ) : (
 filteredFoods.map((food) => (
 <button
 key={food.id}
 onClick={() => navigate(`/food/${food.id}`)}
 className="flex gap-3 rounded-[14px] border-2 border-[#2e211c] bg-white p-3 text-left shadow-[0px_2px_10px_#0000000f] transition-colors hover:bg-[#f9f9f9]"
 >
 <div className="h-[88px] w-[88px] shrink-0 rounded-[10px] border-2 border-[#2e211c] bg-[#f7f4f0]" />

 <div className="flex min-w-0 flex-1 flex-col gap-1.5">
 <div className="flex items-start justify-between gap-2">
 <div className="min-w-0">
 <p className="font-bold text-[#2e211c] text-base truncate">
 {food.name}
 </p>
 <p className="font-extrabold text-[#9d9693] text-[10px]">
 {food.price}
 </p>
 </div>
 <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#9cb8b7] px-2 py-1">
 <p className="font-extrabold text-[#2e211c] text-[11px] whitespace-nowrap">
 {food.matchRate}
 </p>
 </div>
 </div>

 <p className=" text-[#665a55] text-[11px] leading-[16px] line-clamp-2">
 {food.description}
 </p>

 <p className=" text-[#9cb8b7] text-[11px]">
 판매 매장 {food.storeCount}곳
 </p>
 </div>
 </button>
 ))
 )}
 </div>
 </div>
 </div>

 <BottomNavigation activeTab="explore" />
 </div>
 );
}

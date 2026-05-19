import { useNavigate } from 'react-router';
import svgPaths from "../../imports/마이페이지본인이보는/svg-efmvaixmp8";
import BottomNavigation from '../components/BottomNavigation';
import { getFoodIdByMenuName } from '../data/foods';

export default function SavedItemsPage() {
 const navigate = useNavigate();

 // Mock data for saved items (stores + menu)
 const savedItems = [
 {
 id: 1,
 name: "미엘 케이커리",
 menuName: "두쫀쿠",
 location: "서울 강남구",
 price: "2000원",
 priceUnit: "(개당)",
 waitingTime: "15분",
 reviewCount: 404,
 matchRate: 92,
 imageUrl: null
 },
 {
 id: 2,
 name: "떡앤카페",
 menuName: "버터떡",
 location: "서울 관악구",
 price: "3000원",
 priceUnit: "(개당)",
 waitingTime: "10분",
 reviewCount: 289,
 matchRate: 88,
 imageUrl: null
 },
 {
 id: 3,
 name: "한떡",
 menuName: "호박인절미",
 location: "서울 서초구",
 price: "2500원",
 priceUnit: "(개당)",
 waitingTime: "5분",
 reviewCount: 312,
 matchRate: 85,
 imageUrl: null
 },
 {
 id: 4,
 name: "매운맛집",
 menuName: "마라떡볶이",
 location: "서울 강남구",
 price: "5000원",
 priceUnit: "(1인분)",
 waitingTime: "20분",
 reviewCount: 567,
 matchRate: 78,
 imageUrl: null
 },
 {
 id: 5,
 name: "쫀득베이커리",
 menuName: "쫀득빵",
 location: "서울 마포구",
 price: "3500원",
 priceUnit: "(개당)",
 waitingTime: "12분",
 reviewCount: 423,
 matchRate: 90,
 imageUrl: null
 },
 {
 id: 6,
 name: "베이글 스토리",
 menuName: "베이글샌드",
 location: "서울 용산구",
 price: "6500원",
 priceUnit: "(개당)",
 waitingTime: "8분",
 reviewCount: 256,
 matchRate: 82,
 imageUrl: null
 }
 ];

 return (
 <div className="bg-white h-full w-full min-h-0 overflow-y-auto">
 {/* Header */}
 <div className="bg-white flex items-center justify-between px-[20px] h-[79px] sticky top-0 z-10">
 <button onClick={() => navigate('/mypage')} className="h-[24px] w-[12px] rotate-180">
 <svg className="size-full" fill="none" viewBox="0 0 7.36379 12.728">
 <path clipRule="evenodd" d={svgPaths.p1ad99240} fill="black" fillRule="evenodd" />
 </svg>
 </button>
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px]">저장</p>
 <div className="w-[12px]" /> {/* Spacer for alignment */}
 </div>

 {/* Item Count */}
 <div className="px-[30px] py-[16px]">
 <p className=" text-[#9e9794] text-[14px]">
 총 <span className="text-[#9cb8b7]">{savedItems.length}</span>개
 </p>
 </div>

 {/* Saved Items List */}
 <div className="px-[30px] pb-[100px]">
 <div className="flex flex-col gap-[16px]">
 {savedItems.map((item) => (
 <button
 key={item.id}
 onClick={() => navigate(`/store/${item.id}`)}
 className="bg-white border-2 border-[#2e211c] rounded-[16px] p-[16px] relative text-left hover:bg-[#f9f9f9] transition-colors"
 >
 {/* Bookmark Icon - Top Right */}
 <div className="absolute top-[16px] right-[16px] size-[20px]" onClick={(e) => e.stopPropagation()}>
 <svg className="size-full" fill="none" viewBox="0 0 25 25">
 <path d={svgPaths.p31bca400} fill="#9CB8B7" stroke="none" />
 </svg>
 </div>

 <div className="flex justify-between items-start pr-[28px]">
 <div className="flex-1 pr-[12px]">
 {/* Store Name and Menu - Horizontal */}
 <div className="flex items-center gap-[8px] mb-[10px]">
 <p className="font-bold text-[#2e211c] text-[18px] leading-[1.2]">
 {item.name}
 </p>
 <button
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 const foodId = getFoodIdByMenuName(item.menuName);
 if (foodId) navigate(`/food/${foodId}`);
 }}
 className="bg-[#2e211c] rounded-[8px] px-[10px] py-[4px] transition-opacity hover:opacity-80"
 >
 <p className="font-bold text-white text-[13px] leading-[1]">
 {item.menuName}
 </p>
 </button>
 </div>

 {/* Waiting Time and Review Count */}
 <div className="flex items-center gap-[8px] mb-[8px]">
 <p className=" text-[#665a55] text-[12px]">
 평균 웨이팅 {item.waitingTime}
 </p>
 <div className="size-[2px] bg-[#404040] rounded-full" />
 <p className=" text-[#665a55] text-[12px]">
 리뷰 {item.reviewCount}
 </p>
 </div>

 {/* Location */}
 <div className="flex items-center gap-[4px]">
 <div className="h-[14px] w-[15px]">
 <svg className="size-full" fill="none" viewBox="0 0 17 16">
 <path d={svgPaths.p3c447c80} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 <path d={svgPaths.p24084100} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 </svg>
 </div>
 <p className=" text-[#c06226] text-[12px]">
 {item.location}
 </p>
 </div>
 </div>

 {/* Match Rate - Right Side */}
 <div className="flex flex-col items-center justify-center bg-[#f5f5f5] rounded-[12px] px-[16px] py-[12px] min-w-[85px]">
 <p className=" text-[#525252] text-[10px] mb-[6px] whitespace-nowrap">
 트렌딧 지수
 </p>
 <p className="font-bold text-[#4a90a4] text-[32px] leading-[1]">
 {item.matchRate}
 <span className="text-[20px]">%</span>
 </p>
 </div>
 </div>
 </button>
 ))}
 </div>
 </div>

 <BottomNavigation />
 </div>
 );
}

import { useNavigate } from 'react-router';
import { useState } from 'react';
import svgPaths from "../../imports/마이페이지본인이보는/svg-efmvaixmp8";
import BottomNavigation from '../components/BottomNavigation';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { getFoodIdByMenuName } from '../data/foods';

export default function LikedReviewsPage() {
 const navigate = useNavigate();
 const { showPersonalizedMetrics } = usePersonalizedMetrics();
 const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set([0, 1, 2, 3, 4])); // All liked by default

 const toggleLike = (reviewIndex: number) => {
 setLikedReviews(prev => {
 const newSet = new Set(prev);
 if (newSet.has(reviewIndex)) {
 newSet.delete(reviewIndex);
 } else {
 newSet.add(reviewIndex);
 }
 return newSet;
 });
 };

 // Mock data for liked reviews
 const reviewsData = [
 {
 id: 1,
 storeId: '4', // 매운맛집
 author: "디저트러버",
 authorInitial: "디",
 storeName: "매운맛집",
 menuName: "마라떡볶이",
 satisfied: true,
 content: "마라 향이 진하면서도 떡이 쫄깃해서 정말 맛있어요! 매운 걸 좋아하신다면 꼭 드세요 🌶️",
 date: "1시간 전",
 matchRate: 72,
 visitInfo: "저녁에 방문 | 주말에 방문 | 웨이팅 20분",
 imageCount: 3
 },
 {
 id: 2,
 storeId: '6', // 베이글 스토리
 author: "케이크킹",
 authorInitial: "케",
 storeName: "베이글 스토리",
 menuName: "베이글샌드",
 satisfied: true,
 content: "베이글이 쫄깃하고 속 재료들이 신선해요. 든든한 한 끼로 최고입니다!",
 date: "3시간 전",
 matchRate: 85,
 visitInfo: "점심에 방문 | 평일에 방문 | 웨이팅 8분",
 imageCount: 2
 },
 {
 id: 3,
 storeId: '5', // 쫀득베이커리
 author: "스윗투스",
 authorInitial: "스",
 storeName: "쫀득베이커리",
 menuName: "쫀득빵",
 satisfied: true,
 content: "쫀득빵 이름 그대로 진짜 쫀득해요! 한 입 베어물면 쫄깃한 식감이 좋아요.",
 date: "1일 전",
 matchRate: 68,
 visitInfo: "오후에 방문 | 주말에 방문 | 웨이팅 12분",
 imageCount: 4
 },
 {
 id: 4,
 storeId: '2', // 떡앤카페
 author: "디저트탐험가",
 authorInitial: "탐",
 storeName: "떡앤카페",
 menuName: "버터떡",
 satisfied: true,
 content: "버터 향이 진하고 떡이 부드러워서 식감이 완벽해요. 고소한 맛도 일품이에요 ✨",
 date: "2일 전",
 matchRate: 91,
 visitInfo: "점심에 방문 | 평일에 방문 | 웨이팅 10분",
 imageCount: 3
 },
 {
 id: 5,
 storeId: '1', // 미엘 케이커리 (한식당 -> 미엘 케이커리로 변경)
 author: "당충전",
 authorInitial: "당",
 storeName: "미엘 케이커리",
 menuName: "두쫀쿠",
 satisfied: false,
 content: "두쫀쿠가 생각보다 너무 달았어요. 좀 더 담백한 맛이었으면 좋았을 것 같아요.",
 date: "3일 전",
 matchRate: 54,
 visitInfo: "저녁에 방문 | 평일에 방문 | 웨이팅 없음",
 imageCount: 1
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
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px]">공감한 리뷰</p>
 <div className="w-[12px]" /> {/* Spacer for alignment */}
 </div>

 {/* Review Count */}
 <div className="px-[30px] py-[16px]">
 <p className=" text-[#9e9794] text-[14px]">
 총 <span className="text-[#9cb8b7]">{reviewsData.length}</span>개의 리뷰
 </p>
 </div>

 {/* Reviews List */}
 <div className="px-[30px] pb-[100px]">
 <div className="flex flex-col gap-[10px]">
 {reviewsData.map((review, idx) => (
 <div key={review.id} className="bg-white rounded-[16px] border-2 border-[#404040] p-[14px] relative pb-[40px]">
 {/* Store + Menu Info */}
 <div className="flex items-center gap-[6px] mb-[8px]">
 <button
 onClick={() => navigate(`/store/${review.storeId}`)}
 className="font-extrabold text-[#2e211c] text-[16px] text-left hover:underline"
 >
 {review.storeName}
 </button>
 <button
 type="button"
 onClick={() => {
 const foodId = getFoodIdByMenuName(review.menuName);
 if (foodId) navigate(`/food/${foodId}`);
 }}
 className="bg-[#2e211c] rounded-[6px] px-[6px] py-[2px] transition-opacity hover:opacity-80"
 >
 <p className=" text-white text-[11px]">
 {review.menuName}
 </p>
 </button>
 </div>

 {/* Author Info */}
 <div className="flex items-end justify-between mb-[6px]">
 <div className="flex items-center gap-[8px]">
 <div className="bg-[#2e211c] size-[32px] rounded-full flex items-center justify-center">
 <p className=" text-white text-[12px]">
 {review.authorInitial}
 </p>
 </div>
 <div>
 <p className="font-extrabold text-[#2e211c] text-[14px]">
 {review.author}
 </p>
 <p className=" text-[#9e9794] text-[12px]">
 {review.date}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-[4px]">
 {showPersonalizedMetrics && (
 <div className="bg-[#9cb8b7] rounded-[8px] px-[8px] py-[3px]">
 <p className=" text-[#2e211c] text-[11px]">
 취향 일치율 {review.matchRate}%
 </p>
 </div>
 )}
 <div className="text-[28px]">{review.satisfied ? '🙂' : '🙁'}</div>
 </div>
 </div>

 {/* Review Meta */}
 <p className=" text-[#717171] text-[12px] mb-[6px]">
 {review.visitInfo}
 </p>

 {/* Review Content */}
 <p className={` text-[14px] leading-[22.75px] mb-[6px] ${review.satisfied ? 'text-[#2e211c]' : 'text-[#404040]'}`}>
 {review.content}
 </p>

 {/* Review Images */}
 <div className="flex gap-[8px]">
 {Array.from({ length: review.imageCount }).map((_, i) => (
 <div key={i} className="bg-[#f7f4f0] size-[64px] rounded-[10px] flex items-center justify-center">
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
 <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" fill="none" />
 <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" fill="none" />
 <path d="M3 16L8 11L13 16" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
 <path d="M13 13L16 10L21 15" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
 </svg>
 </div>
 ))}
 </div>

 {/* Like Button - Bottom Right */}
 <button
 onClick={(e) => {
 e.stopPropagation();
 toggleLike(idx);
 }}
 className="absolute bottom-[14px] right-[14px] flex items-center gap-[4px] transition-colors"
 >
 <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 25 25">
 <path
 d="M7.69227 21.0403C7.42516 21.0403 7.16944 20.9345 6.98466 20.7467C6.79987 20.5589 6.69727 20.3039 6.69727 20.0409V10.3763C6.69727 10.1133 6.79987 9.85828 6.98466 9.67048C7.16944 9.48268 7.42516 9.37695 7.69227 9.37695H10.1781L13.5858 3.55749C13.7103 3.34188 13.8952 3.16541 14.1188 3.0509C14.3424 2.9364 14.5953 2.88892 14.8457 2.91448C15.0961 2.94003 15.3336 3.03741 15.5302 3.19522C15.7267 3.35304 15.8739 3.56464 15.9544 3.80386L17.7498 9.37695H20.7331C21.0002 9.37695 21.2559 9.48268 21.4407 9.67048C21.6255 9.85828 21.7281 10.1133 21.7281 10.3763V12.3709C21.7281 12.5177 21.7006 12.6632 21.6471 12.7997L18.4894 20.2908C18.393 20.5275 18.2245 20.7292 18.0062 20.8689C17.7879 21.0087 17.5303 21.0801 17.2675 21.0739H7.69227V21.0403ZM4.21227 10.3763V21.0403H2.22227V10.3763H4.21227Z"
 fill={likedReviews.has(idx) ? "#4a90a4" : "none"}
 stroke={likedReviews.has(idx) ? "#4a90a4" : "#9CB8B7"}
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 />
 </svg>
 <p className={` text-[12px] ${likedReviews.has(idx) ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>
 공감
 </p>
 </button>
 </div>
 ))}
 </div>
 </div>

 <BottomNavigation />
 </div>
 );
}

import { useNavigate } from 'react-router';
import { useState } from 'react';
import svgPaths from "../../imports/마이페이지본인이보는/svg-efmvaixmp8";
import BottomNavigation from '../components/BottomNavigation';
import { getFoodIdByMenuName } from '../data/foods';

export default function MyReviewsPage() {
 const navigate = useNavigate();
 const [filter, setFilter] = useState<'all' | 'satisfied' | 'unsatisfied'>('all');
 const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

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

 // Mock data for reviews
 const reviews = [
 {
 id: 1,
 storeId: '1', // 미엘 케이커리
 storeName: "미엘 케이커리",
 menuName: "두쫀쿠",
 storeLocation: "서울 강남구",
 satisfied: true,
 content: "겉은 쫀득하고 속은 바삭해서 독특한 식감이 정말 좋았어요. 두쫀쿠 특유의 반전 식감이 매력적입니다!",
 date: "12분 전",
 visitInfo: "저녁에 방문 | 평일에 방문 | 웨이팅 15분",
 imageCount: 4,
 likes: 24
 },
 {
 id: 2,
 storeId: '2', // 떡앤카페
 storeName: "떡앤카페",
 menuName: "버터떡",
 storeLocation: "서울 관악구",
 satisfied: true,
 content: "버터향이 진하고 쫀득해요. 떡 특유의 탱탱한 식감이 살아있어서 좋았어요.",
 date: "2시간 전",
 visitInfo: "점심에 방문 | 주말에 방문 | 웨이팅 10분",
 imageCount: 3,
 likes: 18
 },
 {
 id: 3,
 storeId: '3', // 한떡
 storeName: "한떡",
 menuName: "호박인절미",
 storeLocation: "서울 강남구",
 satisfied: false,
 content: "호박인절미가 생각보다 달았어요. 개인적으로는 좀 더 고소한 맛이 좋을 것 같아요.",
 date: "1일 전",
 visitInfo: "오후에 방문 | 평일에 방문 | 웨이팅 5분",
 imageCount: 2,
 likes: 32
 }
 ];

 // Filter reviews based on selected filter
 const filteredReviews = reviews.filter(review => {
 if (filter === 'satisfied') return review.satisfied;
 if (filter === 'unsatisfied') return !review.satisfied;
 return true; // 'all'
 });

 return (
 <div className="bg-white h-full w-full min-h-0 overflow-y-auto relative">
 {/* Header */}
 <div className="bg-white flex items-center justify-between px-[20px] h-[79px] sticky top-0 z-10">
 <button onClick={() => navigate('/mypage')} className="h-[24px] w-[12px] rotate-180">
 <svg className="size-full" fill="none" viewBox="0 0 7.36379 12.728">
 <path clipRule="evenodd" d={svgPaths.p1ad99240} fill="black" fillRule="evenodd" />
 </svg>
 </button>
 <p className="font-bold leading-[36px] text-[#2e211c] text-[30px]">작성한 리뷰</p>
 <div className="w-[12px]" /> {/* Spacer for alignment */}
 </div>

 {/* Filter Buttons */}
 <div className="px-[30px] pt-[16px] pb-[12px] border-b border-[#e5e5e5]">
 <div className="flex gap-[8px]">
 <button
 onClick={() => setFilter('all')}
 className={` text-[14px] px-[16px] py-[8px] rounded-[20px] border transition-colors ${
 filter === 'all'
 ? 'bg-[#2e211c] text-white border-[#2e211c]'
 : 'bg-white text-[#9e9794] border-[#d9d9d9]'
 }`}
 >
 전체 리뷰
 </button>
 <button
 onClick={() => setFilter('satisfied')}
 className={` text-[14px] px-[16px] py-[8px] rounded-[20px] border transition-colors ${
 filter === 'satisfied'
 ? 'bg-[#2e211c] text-white border-[#2e211c]'
 : 'bg-white text-[#9e9794] border-[#d9d9d9]'
 }`}
 >
 만족한 리뷰
 </button>
 <button
 onClick={() => setFilter('unsatisfied')}
 className={` text-[14px] px-[16px] py-[8px] rounded-[20px] border transition-colors ${
 filter === 'unsatisfied'
 ? 'bg-[#2e211c] text-white border-[#2e211c]'
 : 'bg-white text-[#9e9794] border-[#d9d9d9]'
 }`}
 >
 불만족한 리뷰
 </button>
 </div>
 </div>

 {/* Review Count */}
 <div className="px-[30px] py-[16px]">
 <p className=" text-[#9e9794] text-[14px]">
 총 <span className="text-[#9cb8b7]">{filteredReviews.length}</span>개의 리뷰
 </p>
 </div>

 {/* Reviews List */}
 <div className="px-[30px] pb-[100px] min-h-[600px]">
 <div className="flex flex-col gap-[10px]">
 {filteredReviews.map((review, idx) => (
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
 김
 </p>
 </div>
 <div>
 <p className="font-extrabold text-[#2e211c] text-[14px]">
 김트민
 </p>
 <p className=" text-[#9e9794] text-[12px]">
 {review.date}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-[4px]">
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

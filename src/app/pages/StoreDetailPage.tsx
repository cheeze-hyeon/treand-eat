import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import svgPaths from "../../imports/매장별페이지-1/svg-rwqfjwbxb";
import BottomNavigation from '../components/BottomNavigation';
import { getFoodIdByMenuName } from '../data/foods';
import { getStoreById } from '../data/stores';

export default function StoreDetailPage() {
 const navigate = useNavigate();
 const { storeId } = useParams();
 const store = getStoreById(storeId);
 const [showTrenditInfo, setShowTrenditInfo] = useState(false);
 const [isSaved, setIsSaved] = useState(true); // 저장 리스트에서 넘어온 경우 true
 const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set()); // 공감한 리뷰 ID 집합

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

 return (
 <div className="bg-white h-full w-full min-h-0 overflow-y-auto relative">
 {/* Header */}
 <div className="bg-white h-[70px] px-[24px] sticky top-0 z-10 flex items-center justify-between">
 <button
 onClick={() => navigate(-1)}
 className="size-[28px] flex items-center justify-center"
 >
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 19.9849 19.9849">
 <path d={svgPaths.p368bf240} stroke="#2E211C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d="M15.8214 9.99245H4.16352" stroke="#2E211C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </svg>
 </button>
 <button
 onClick={() => setIsSaved(!isSaved)}
 className="size-[28px] flex items-center justify-center"
 >
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 19.9849 19.9849">
 <path
 d={svgPaths.p39f88880}
 stroke="#2E211C"
 fill={isSaved ? "#2E211C" : "none"}
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="1.66541"
 />
 </svg>
 </button>
 </div>

 {/* Store Info Section */}
 <div className="px-[24px] pb-[16px] border-b border-[#e5e5e5]">
 <div className="flex items-center justify-between mb-[4px]">
 <p className="font-bold text-[#2e211c] text-[20px]">
 {store.name}
 </p>
 <div className="flex items-baseline gap-[4px]">
 <p className="font-bold text-[#2e211c] text-[20px]">
 {store.price}
 </p>
 <p className=" text-[#9e9794] text-[13px]">
 {store.priceUnit}
 </p>
 </div>
 </div>

 {/* Menu Badge */}
 <div className="mb-[8px]">
 <button
 type="button"
 onClick={() => {
 const foodId = getFoodIdByMenuName(store.menuName);
 if (foodId) navigate(`/food/${foodId}`);
 }}
 className="inline-block bg-[#2e211c] rounded-[8px] px-[10px] py-[3px] transition-opacity hover:opacity-80"
 >
 <p className="font-bold text-white text-[13px]">
 {store.menuName}
 </p>
 </button>
 </div>

 {/* Stats */}
 <div className="flex items-center gap-[8px] mb-[8px]">
 <p className=" text-[#665a55] text-[13px]">
 평균 웨이팅 {store.waitingTime}
 </p>
 <div className="size-[2px] bg-[#404040] rounded-full" />
 <p className=" text-[#665a55] text-[13px]">
 리뷰 {store.reviewCount}
 </p>
 </div>

 {/* Location */}
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-[4px]">
 <div className="h-[14px] w-[15px]">
 <svg className="size-full" fill="none" viewBox="0 0 15 14">
 <path d={svgPaths.p2c57a680} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 <path d={svgPaths.p2082ac00} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 </svg>
 </div>
 <p className=" text-[#c06226] text-[13px]">
 {store.location}
 </p>
 </div>
 <button
 type="button"
 onClick={() => navigate(`/write-review?storeId=${storeId ?? '1'}`)}
 className="bg-[#c06226] rounded-[16px] px-[13px] py-[4px]"
 >
 <p className=" text-white text-[12px]">
 리뷰 쓰기
 </p>
 </button>
 </div>
 </div>

 {/* Image Gallery */}
 <div className="px-[24px] py-[16px]">
 <div className="flex gap-[8px] overflow-x-auto">
 {[1, 2, 3, 4].map((i) => (
 <div key={i} className="bg-[#f7f4f0] h-[130px] w-[104px] rounded-[10px] border-2 border-[#2e211c] flex-shrink-0 flex items-center justify-center">
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
 <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" fill="none" />
 <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" fill="none" />
 <path d="M3 16L8 11L13 16" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
 <path d="M13 13L16 10L21 15" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
 </svg>
 </div>
 ))}
 </div>
 </div>

 {/* Related Stores Banner */}
 <div className="px-[24px] py-[12px] border-y border-[#e5e5e5]">
 <button className="flex items-center justify-between w-full">
 <div className="flex items-center gap-[8px]">
 <div className="bg-[#2e211c] size-[25px] rounded-full flex items-center justify-center">
 <svg className="w-[13px] h-[16px]" fill="none" viewBox="0 0 14.8337 17.3333">
 <path d={svgPaths.p3c51ee00} stroke="white" strokeWidth="1.5" />
 <path d={svgPaths.p14c46e00} stroke="white" strokeWidth="1.5" />
 </svg>
 </div>
 <p className=" text-[#665a55] text-[13px]">
 이 {store.menuName}에 만족한 다른 유저들이 저장한 장소 보기
 </p>
 </div>
 <svg className="w-[8px] h-[13px]" fill="none" viewBox="0 0 17.3333 9.33333">
 <path d={svgPaths.p82eee00} stroke="#665A55" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
 </svg>
 </button>
 </div>

 {/* Trendit Score Section */}
 <div className="px-[24px] py-[24px] relative">
 <div className="flex items-center gap-[8px] mb-[17px] relative">
 <p className="font-extrabold text-[#2e211c] text-[18px]">
 트렌딧 지수
 </p>
 <button
 onClick={() => setShowTrenditInfo(!showTrenditInfo)}
 className="size-[19px] relative"
 >
 <svg className="size-full" fill="none" viewBox="0 0 19 19">
 <path d={svgPaths.p2125cb00} stroke="#9E9794" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d={svgPaths.p21ee5880} stroke="#9E9794" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 <path d="M9.5 13.4583H9.50708" stroke="#9E9794" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
 </svg>
 </button>

 {/* Info Popup - Next to Question Mark */}
 {showTrenditInfo && (
 <div className="absolute top-[-8px] left-[140px] w-[220px] bg-white border-2 border-[#2e211c] rounded-[12px] p-[14px] pr-[32px] shadow-lg z-20">
 <p className=" text-[#2e211c] text-[12px] leading-[18px]">
 이 음식을 경험한 후 만족한 사용자의 비율을 나타내는 지수입니다. 나와 취향이 비슷한 사용자는 취향일치율이 70% 이상인 사용자입니다.
 </p>
 <button
 onClick={() => setShowTrenditInfo(false)}
 className="absolute top-[12px] right-[12px] size-[16px] flex items-center justify-center"
 >
 <svg className="size-[12px]" fill="none" viewBox="0 0 12.85 12.85">
 <path clipRule="evenodd" d={svgPaths.p17b53000} fill="#2E211C" fillRule="evenodd" />
 </svg>
 </button>
 </div>
 )}
 </div>

 <div className="flex gap-[22px]">
 {/* Average Score */}
 <div className="flex-1 bg-white border-2 border-[#2e211c] rounded-[16px] p-[16px] flex flex-col items-center justify-center">
 <p className=" text-[#665a55] text-[12px] text-center mb-[12px] leading-[16px]">
 유저들의<br />전체 평균은
 </p>
 <p className="font-extrabold text-[#4a90a4] text-[28px] text-center leading-[1]">
 {store.avgScore}%
 </p>
 </div>

 {/* Similar Taste Score */}
 <div className="flex-1 bg-white border-2 border-[#2e211c] rounded-[16px] p-[16px] flex flex-col items-center justify-center">
 <p className=" text-[#665a55] text-[12px] text-center mb-[12px] leading-[16px]">
 나와 취향이 비슷한<br />유저들의 평균은
 </p>
 <p className="font-extrabold text-[#4a90a4] text-[28px] text-center leading-[1]">
 {store.similarScore}%
 </p>
 </div>
 </div>
 </div>

 {/* Reviews Section */}
 <div className="px-[24px] pt-[16px] pb-[30px]">
 <div className="flex items-center justify-between mb-[12px]">
 <p className="font-extrabold text-[#2e211c] text-[18px]">
 실시간 리뷰 ({store.reviewCount})
 </p>
 <button className=" text-[#9e9794] text-[13px]">
 더보기
 </button>
 </div>
 <p className=" text-[#665a55] text-[12px] mb-[12px]">
 다른 사람들이 남긴 생생한 후기를 확인해보세요.
 </p>

 {/* Reviews List */}
 <div className="flex flex-col gap-[10px]">
 {store.reviews.map((review, idx) => (
 <div key={idx} className="bg-white rounded-[16px] border-2 border-[#404040] p-[14px] relative pb-[40px]">
 {/* Review Header */}
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
 {review.time}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-[4px]">
 <div className="bg-[#9cb8b7] rounded-[8px] px-[8px] py-[3px]">
 <p className=" text-[#2e211c] text-[11px]">
 취향 일치율 {review.matchRate}%
 </p>
 </div>
 <div className="text-[28px]">{review.satisfied ? '🙂' : '🙁'}</div>
 </div>
 </div>

 {/* Review Meta */}
 <p className=" text-[#717171] text-[12px] mb-[6px]">
 {review.visitTime} | {review.visitDay} | {review.waiting}
 </p>

 {/* Review Content */}
 <p className={` text-[14px] leading-[22.75px] mb-[6px] ${review.satisfied ? 'text-[#2e211c]' : 'text-[#404040]'}`}>
 {review.text}
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
 <div className="size-[16px]">
 <svg className="size-full" fill="none" viewBox="0 0 25 25">
 <path
 d="M7.69227 21.0403C7.42516 21.0403 7.16944 20.9345 6.98466 20.7467C6.79987 20.5589 6.69727 20.3039 6.69727 20.0409V10.3763C6.69727 10.1133 6.79987 9.85828 6.98466 9.67048C7.16944 9.48268 7.42516 9.37695 7.69227 9.37695H10.1781L13.5858 3.55749C13.7103 3.34188 13.8952 3.16541 14.1188 3.0509C14.3424 2.9364 14.5953 2.88892 14.8457 2.91448C15.0961 2.94003 15.3336 3.03741 15.5302 3.19522C15.7267 3.35304 15.8739 3.56464 15.9544 3.80386L17.7498 9.37695H20.7331C21.0002 9.37695 21.2559 9.48268 21.4407 9.67048C21.6255 9.85828 21.7281 10.1133 21.7281 10.3763V12.3709C21.7281 12.5177 21.7006 12.6632 21.6471 12.7997L18.4894 20.2908C18.393 20.5275 18.2245 20.7292 18.0062 20.8689C17.7879 21.0087 17.5303 21.0801 17.2675 21.0739H7.69227V21.0403ZM4.21227 10.3763V21.0403H2.22227V10.3763H4.21227Z"
 fill={likedReviews.has(idx) ? "#4a90a4" : "none"}
 stroke={likedReviews.has(idx) ? "#4a90a4" : "#9CB8B7"}
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth="2"
 />
 </svg>
 </div>
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

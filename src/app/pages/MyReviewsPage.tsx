import { useNavigate } from 'react-router';
import { useState } from 'react';
import svgPaths from "../../imports/마이페이지본인이보는/svg-efmvaixmp8";
import BottomNavigation from '../components/BottomNavigation';
import ProfileReviewCard from '../components/ProfileReviewCard';
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
          <ProfileReviewCard
            key={review.id}
            variant="own"
            storeName={review.storeName}
            menuName={review.menuName}
            authorInitial="김"
            authorName="김트민"
            time={review.date}
            satisfied={review.satisfied}
            visitInfo={review.visitInfo}
            content={review.content}
            imageCount={review.imageCount}
            liked={likedReviews.has(idx)}
            onToggleLike={() => toggleLike(idx)}
            onStoreClick={() => navigate(`/store/${review.storeId}`)}
            onMenuClick={() => {
              const foodId = getFoodIdByMenuName(review.menuName);
              if (foodId) navigate(`/food/${foodId}`);
            }}
          />
        ))}
 </div>
 </div>

 <BottomNavigation />
 </div>
 );
}

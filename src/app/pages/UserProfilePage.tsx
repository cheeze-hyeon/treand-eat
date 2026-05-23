import { useNavigate, useParams } from 'react-router';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';
import { useState } from 'react';
import svgPaths from "../../imports/마이페이지타인이보는-1/svg-6dgla2jtwy";
import BottomNavigation from '../components/BottomNavigation';
import ProfileReviewCard from '../components/ProfileReviewCard';
import { getFoodIdByMenuName } from '../data/foods';

const userProfiles = {
 '1': {
 name: '한맛집',
 username: '@hanmatzip__',
 followerCount: 1234,
 followingCount: 89,
 location: '서울 강남구, 서울 서초구',
 bio: '맛집 탐방이 취미인 평범한 직장인입니다 🍜',
 matchRate: 91,
 tags: ['# 매콤한', '# 바삭한', '# 자극적인'],
 type: '자극적인 맛을 좋아하는 SPICY형',
 description: ['강렬한 맛에 끌리는 타입이에요. 평범한 음식보다는', '확실한 맛의 자극이 있는 음식을 선호해요.'],
 savedStores: [
 { name: '매운맛집', menu: '마라떡볶이' },
 { name: '한식당', menu: '봄동비빔밥' },
 { name: '쫀득베이커리', menu: '쫀득빵' },
 { name: '매운맛집', menu: '마라떡볶이' }
 ],
 reviews: [
 { storeId: '4', store: '매운맛집', menu: '마라떡볶이', time: '12분 전', satisfied: true, matchRate: 68, visitInfo: '저녁에 방문 | 평일에 방문 | 웨이팅 15분', text: '웨이팅은 조금 있었지만 맛은 만족스러웠어요. 맛이 강해서 아메리카노랑 잘 어울려요.', imageCount: 4 },
 { storeId: '3', store: '한떡', menu: '호박인절미', time: '3일 전', satisfied: false, matchRate: 45, visitInfo: '점심에 방문 | 주말에 방문 | 웨이팅 없음', text: '호박인절미가 너무 질겨서 먹기 힘들었어요. 가격 대비 양도 적고 실망스러웠습니다.', imageCount: 1 }
 ]
 },
 '2': {
 name: '디저트킹',
 username: '@dessertking_',
 followerCount: 856,
 followingCount: 124,
 location: '서울 마포구, 서울 용산구',
 bio: '달달한 디저트가 제 낙입니다 🧁',
 matchRate: 85,
 tags: ['# 달콤한', '# 부드러운', '# 크리미한'],
 type: '달콤한 맛을 좋아하는 SWEET형',
 description: ['부드럽고 달콤한 디저트를 좋아해요.', '크림과 초콜릿이 들어간 음식에 약해요.'],
 savedStores: [
 { name: '떡앤카페', menu: '버터떡' },
 { name: '미엘 케이커리', menu: '두쫀쿠' },
 { name: '한떡', menu: '호박인절미' },
 { name: '쫀득베이커리', menu: '쫀득빵' }
 ],
 reviews: [
 { storeId: '2', store: '떡앤카페', menu: '버터떡', time: '1시간 전', satisfied: true, matchRate: 82, visitInfo: '오후에 방문 | 평일에 방문 | 웨이팅 10분', text: '버터떡이 정말 맛있었어요. 부드럽고 달콤해서 딱 제 스타일이에요.', imageCount: 3 },
 { storeId: '1', store: '미엘 케이커리', menu: '두쫀쿠', time: '2일 전', satisfied: true, matchRate: 75, visitInfo: '저녁에 방문 | 주말에 방문 | 웨이팅 20분', text: '두쫀쿠가 겉은 쫀득하고 속은 바삭해서 독특해요. 완벽했습니다.', imageCount: 2 }
 ]
 },
 '3': {
 name: '맛있어요',
 username: '@yummy_foodie',
 followerCount: 542,
 followingCount: 201,
 location: '서울 성동구, 서울 광진구',
 bio: '요즘 핫한 맛집을 찾아다녀요 ✨',
 matchRate: 78,
 tags: ['# 상큼한', '# 가벼운', '# 촉촉한'],
 type: '상큼한 맛을 좋아하는 FRESH형',
 description: ['신선하고 가벼운 음식을 선호해요.', '상큼한 과일 디저트를 자주 먹어요.'],
 savedStores: [
 { name: '베이글 스토리', menu: '베이글샌드' },
 { name: '한식당', menu: '봄동비빔밥' },
 { name: '쫀득베이커리', menu: '쫀득빵' }
 ],
 reviews: [
 { storeId: '6', store: '베이글 스토리', menu: '베이글샌드', time: '2일 전', satisfied: true, matchRate: 71, visitInfo: '점심에 방문 | 평일에 방문 | 웨이팅 5분', text: '베이글이 신선하고 재료가 가벼워요. 너무 달지 않아서 좋았어요.', imageCount: 2 },
 { storeId: '5', store: '쫀득베이커리', menu: '쫀득빵', time: '5일 전', satisfied: false, matchRate: 38, visitInfo: '저녁에 방문 | 주말에 방문 | 웨이팅 없음', text: '쫀득빵이 너무 심심해서 맛이 없었어요. 좀 더 달았으면 좋았을 것 같아요.', imageCount: 1 }
 ]
 },
 '4': {
 name: '서울맛집',
 username: '@seoul_best',
 followerCount: 2105,
 followingCount: 67,
 location: '서울 종로구, 서울 중구',
 bio: '서울 구석구석 숨은 맛집 전문가',
 matchRate: 93,
 tags: ['# 고소한', '# 꾸덕한', '# 진한'],
 type: '깊은 맛을 좋아하는 DEEP형',
 description: ['전통적이고 깊은 맛을 선호해요.', '고소하고 진한 디저트를 좋아해요.'],
 savedStores: [
 { name: '한떡', menu: '호박인절미' },
 { name: '떡앤카페', menu: '버터떡' },
 { name: '한떡', menu: '호박인절미' },
 { name: '미엘 케이커리', menu: '두쫀쿠' }
 ],
 reviews: [
 { storeId: '3', store: '한떡', menu: '호박인절미', time: '5일 전', satisfied: true, matchRate: 88, visitInfo: '오후에 방문 | 평일에 방문 | 웨이팅 5분', text: '호박인절미가 정말 고소하고 쫀득해요. 전통 맛이 살아있어요.', imageCount: 2 },
 { storeId: '2', store: '떡앤카페', menu: '버터떡', time: '1주일 전', satisfied: true, matchRate: 92, visitInfo: '점심에 방문 | 주말에 방문 | 웨이팅 15분', text: '버터떡이 꾸덕하고 달콤해요. 커피랑 환상 조합입니다.', imageCount: 3 }
 ]
 },
 '5': {
 name: '음식러버',
 username: '@foodlover_kr',
 followerCount: 678,
 followingCount: 156,
 location: '서울 송파구, 서울 강동구',
 bio: '음식 사진 찍는 걸 좋아합니다 📸',
 matchRate: 72,
 tags: ['# 쫀득한', '# 입에서 녹는', '# 달콤한'],
 type: '비주얼을 중시하는 VISUAL형',
 description: ['예쁘고 감성적인 음식을 좋아해요.', '인스타그램에 올릴 만한 플레이팅을 선호해요.'],
 savedStores: [
 { name: '미엘 케이커리', menu: '두쫀쿠' },
 { name: '쫀득베이커리', menu: '쫀득빵' },
 { name: '베이글 스토리', menu: '베이글샌드' }
 ],
 reviews: [
 { storeId: '1', store: '미엘 케이커리', menu: '두쫀쿠', time: '1일 전', satisfied: true, matchRate: 79, visitInfo: '오후에 방문 | 주말에 방문 | 웨이팅 25분', text: '두쫀쿠가 너무 예뻐요. 겉은 쫀득하고 속은 바삭해서 맛도 좋아요.', imageCount: 5 },
 { storeId: '5', store: '쫀득베이커리', menu: '쫀득빵', time: '3일 전', satisfied: true, matchRate: 83, visitInfo: '저녁에 방문 | 평일에 방문 | 웨이팅 10분', text: '쫀득빵 위에 토핑이 예쁘게 올라가 있어서 사진 찍기 좋아요.', imageCount: 4 }
 ]
 }
};

export default function UserProfilePage() {
 const navigate = useNavigate();
 const { userId } = useParams();
 const { showPersonalizedMetrics } = usePersonalizedMetrics();
 const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

 const profile = userProfiles[userId as keyof typeof userProfiles] || userProfiles['1'];

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
 <div className="bg-white h-full w-full min-h-0 overflow-y-auto">
 {/* Header */}
 <div className="bg-white flex items-center justify-between h-[79px] px-[24px] py-[17px] sticky top-0 z-10">
 <button onClick={() => navigate(-1)} className="flex items-center">
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
 <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </button>
 <p className="font-bold text-[20px] text-[#2e211c]">프로필</p>
 <div className="w-[24px]" />
 </div>

 {/* Profile Section */}
 <div className="px-[30px] py-[9px]">
 <div className="relative h-[181px]">
 {/* Profile Image */}
 <div className="absolute left-[-4px] top-[13px]">
 <div className="bg-[#2e211c] flex items-center justify-center rounded-[50px] size-[70px]">
 <div className="h-[45px] w-[36px]">
 <svg className="size-full" fill="none" viewBox="0 0 36 45">
 <path d={svgPaths.p2439f600} fill="white" />
 </svg>
 </div>
 </div>
 </div>

 {/* Profile Info */}
 <div className="absolute left-[87px] top-[13px]">
 <p className="font-bold leading-[32px] text-[#171717] text-[24px]">{profile.name}</p>
 <p className=" leading-[20px] text-[#9e9794] text-[14px]">{profile.username}</p>
 <div className="flex gap-[16px] mt-[4px]">
 <p className=" text-[14px]">
 <span className="text-[#171717]">팔로워 </span>
 <span className="font-bold text-[#9cb8b7]">{profile.followerCount}</span>
 </p>
 <p className=" text-[14px]">
 <span className="text-[#171717]">팔로잉 </span>
 <span className="font-bold text-[#9cb8b7]">{profile.followingCount}</span>
 </p>
 </div>
 </div>

 {/* Location */}
 <div className="absolute left-px top-[97px] flex gap-[4px] items-start">
 <div className="h-[16px] w-[17px]">
 <svg className="size-full" fill="none" viewBox="0 0 17 16">
 <g>
 <path d={svgPaths.p3c447c80} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 <path d={svgPaths.p24084100} stroke="#C06226" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998958" />
 </g>
 </svg>
 </div>
 <p className=" text-[#c06226] text-[13px]">{profile.location}</p>
 </div>

 {/* Bio */}
 <p className="absolute left-px top-[116px] leading-[20px] text-[#525252] text-[13px]">
 {profile.bio}
 </p>

 {showPersonalizedMetrics && (
 <p className="absolute left-px top-[150px] font-extrabold text-[16px] text-[#171717]">
 나와의 취향 일치율: <span className="font-bold text-[#335352]">{profile.matchRate}%</span>
 </p>
 )}

 {/* Following Button */}
 <button className="absolute left-[267px] top-[28px] bg-white border-2 border-[#335352] rounded-[15px] px-[20px] py-[6px] flex items-center justify-center">
 <p className="font-bold text-[13px] text-[#335352] whitespace-nowrap">팔로잉</p>
 </button>
 </div>
 </div>

 {/* Divider */}
 <div className="h-px bg-[#2A2927] opacity-[0.285714] mx-[30px]" />

 {/* Saved Stores Section */}
 <div className="px-[30px] py-[15px]">
 <p className="font-bold leading-[28px] text-[#171717] text-[18px] mb-[12px]">저장 목록</p>

 <div className="flex gap-[15px] overflow-x-auto">
 {profile.savedStores.map((store, idx) => (
 <button
 key={idx}
 onClick={() => navigate(`/store/${idx + 1}`)}
 className="flex flex-col items-center shrink-0 hover:opacity-80 transition-opacity active:scale-95"
 >
 <div className="bg-[#f7f4f0] h-[106px] w-[84px] rounded-[10px] border-2 border-[#2e211c] mb-[4px] flex items-center justify-center shadow-sm">
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
 <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" fill="none" />
 <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" fill="none" />
 <path d="M3 16L8 11L13 16" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
 <path d="M13 13L16 10L21 15" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
 </svg>
 </div>
 <div className="w-[84px] flex flex-col items-center">
 <p className=" text-[#2e211c] text-[13px] leading-[16px] text-center">{store.name}</p>
 <button
 type="button"
 onClick={(e) => {
 e.stopPropagation();
 const foodId = getFoodIdByMenuName(store.menu);
 if (foodId) navigate(`/food/${foodId}`);
 }}
 className="bg-[#2e211c] rounded-[8px] px-[6px] py-[2px] mt-[2px] transition-opacity hover:opacity-80"
 >
 <p className=" text-white text-[10px]">{store.menu}</p>
 </button>
 </div>
 </button>
 ))}
 </div>
 </div>

 {/* Preference Analysis Section */}
 <div className="px-[30px] py-[15px]">
 <p className="font-bold leading-[28px] text-[#171717] text-[18px] mb-[12px]">취향 분석</p>

 <div className="flex gap-[10px] mb-[12px] flex-wrap">
 {profile.tags.map((tag, idx) => (
 <div key={idx} className="bg-[#335352] rounded-[15px] px-[12px] py-[4px]">
 <p className="font-extrabold text-white text-[12px]">{tag}</p>
 </div>
 ))}
 </div>

 <div className=" text-[#404040]">
 <p className="font-bold text-[14px] leading-[22.75px]">{profile.type}</p>
 {profile.description.map((line, idx) => (
 <p key={idx} className="text-[12px] leading-[18px]">{line}</p>
 ))}
 </div>
 </div>

 {/* Reviews Section */}
 <div className="px-[30px] py-[15px]">
 <p className="font-bold leading-[28px] text-[#171717] text-[18px] mb-[12px]">작성한 리뷰</p>

 <div className="flex flex-col gap-[10px]">
        {profile.reviews.map((review, idx) => (
          <ProfileReviewCard
            key={idx}
            variant="other"
            storeName={review.store}
            menuName={review.menu}
            authorInitial={profile.name.substring(0, 1)}
            authorName={profile.name}
            time={review.time}
            satisfied={review.satisfied}
            visitInfo={review.visitInfo}
            content={review.text}
            imageCount={review.imageCount}
            liked={likedReviews.has(idx)}
            onToggleLike={() => toggleLike(idx)}
            onStoreClick={() => navigate(`/store/${review.storeId}`)}
            onMenuClick={() => {
              const foodId = getFoodIdByMenuName(review.menu);
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

import { useNavigate } from 'react-router';
import { usePersonalizedMetrics } from '../contexts/UserPreferencesContext';

const followingUsers = [
 { id: 1, name: '한맛집', username: '@hanmatzip__', followerCount: 1234, bio: '맛집 탐방이 취미인 평범한 직장인입니다 🍜', matchRate: 91 },
 { id: 2, name: '디저트킹', username: '@dessertking_', followerCount: 856, bio: '달달한 디저트가 제 낙입니다 🧁', matchRate: 85 },
 { id: 3, name: '맛있어요', username: '@yummy_foodie', followerCount: 542, bio: '요즘 핫한 맛집을 찾아다녀요 ✨', matchRate: 78 },
 { id: 4, name: '서울맛집', username: '@seoul_best', followerCount: 2105, bio: '서울 구석구석 숨은 맛집 전문가', matchRate: 93 },
 { id: 5, name: '음식러버', username: '@foodlover_kr', followerCount: 678, bio: '음식 사진 찍는 걸 좋아합니다 📸', matchRate: 72 },
];

export default function FollowingListPage() {
 const navigate = useNavigate();
 const { showPersonalizedMetrics } = usePersonalizedMetrics();

 return (
 <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
 {/* Header */}
 <div className="bg-white flex items-center justify-between h-[79px] px-[24px] py-[17px] border-b border-[#e5e5e5]">
 <button onClick={() => navigate(-1)} className="flex items-center">
 <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
 <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </button>
 <p className="font-bold text-[20px] text-[#2e211c]">팔로잉</p>
 <div className="w-[24px]" />
 </div>

 {/* Following List */}
 <div className="flex-1 overflow-y-auto">
 {followingUsers.map((user) => (
 <button
 key={user.id}
 onClick={() => navigate(`/profile/${user.id}`)}
 className="w-full px-[24px] py-[16px] flex items-start gap-[12px] hover:bg-[#f5f5f5] transition-colors border-b border-[#f0f0f0]"
 >
 {/* Profile Image */}
 <div className="bg-[#2e211c] rounded-full size-[50px] flex items-center justify-center shrink-0">
 <svg className="w-[30px] h-[35px]" fill="none" viewBox="0 0 36 45">
 <path
 d="M18 22.5C23.799 22.5 28.5 17.799 28.5 12C28.5 6.20101 23.799 1.5 18 1.5C12.201 1.5 7.5 6.20101 7.5 12C7.5 17.799 12.201 22.5 18 22.5ZM18 27.75C11.6625 27.75 0 30.9263 0 37.5V40.125C0 42.0525 1.5975 43.5 3.525 43.5H32.475C34.4025 43.5 36 42.0525 36 40.125V37.5C36 30.9263 24.3375 27.75 18 27.75Z"
 fill="white"
 />
 </svg>
 </div>

 {/* User Info */}
 <div className="flex-1 text-left">
 <p className="font-bold text-[16px] text-[#171717]">
 {user.name}
 </p>
 <p className=" text-[12px] text-[#9e9794]">
 {user.username}
 </p>
 <p className=" text-[12px] text-[#525252] mt-[4px]">
 {user.bio}
 </p>
 <p className=" text-[12px] text-[#9e9794] mt-[2px]">
 팔로워 {user.followerCount}
 </p>
 </div>

 {showPersonalizedMetrics && (
 <div className="shrink-0 flex flex-col items-center justify-center ml-[8px]">
 <p className=" text-[11px] text-[#9e9794] mb-[2px]">트렌딧 지수</p>
 <p className="font-bold text-[18px] text-[#335352]">{user.matchRate}%</p>
 </div>
 )}
 </button>
 ))}
 </div>
 </div>
 );
}

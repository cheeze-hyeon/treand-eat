import { useNavigate } from 'react-router';

export default function NotFoundPage() {
 const navigate = useNavigate();

 return (
 <div className="bg-white h-full w-full min-h-0 flex flex-col items-center justify-center">
 <p className="font-bold text-[30px] text-[#2e211c] mb-[16px]">
 404
 </p>
 <p className=" text-[16px] text-[#665a55] mb-[24px]">
 페이지를 찾을 수 없습니다
 </p>
 <button
 onClick={() => navigate('/')}
 className="bg-[#2e211c] px-[24px] py-[12px] rounded-[10px]"
 >
 <p className="font-bold text-[16px] text-white">
 홈으로 가기
 </p>
 </button>
 </div>
 );
}

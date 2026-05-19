import { useNavigate, useParams } from 'react-router';
import BottomNavigation from '../components/BottomNavigation';
import { FOOD_STORES, getFoodById, parseFoodPrice } from '../data/foods';

export default function FoodDetailPage() {
 const { id } = useParams();
 const navigate = useNavigate();
 const food = getFoodById(id);
 const stores = FOOD_STORES[food.id] ?? FOOD_STORES['2'];
 const { amount: priceAmount, unit: priceUnit } = parseFoodPrice(food.price);

 return (
 <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
 <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
 <div className="relative w-full bg-white">
 <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2.5 bg-white/80 backdrop-blur-sm">
 <button
 type="button"
 onClick={() => navigate(-1)}
 aria-label="뒤로 가기"
 className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[39.99px] h-[39.99px] relative pr-[10.0094633102417px] rounded-[36618800px] bg-white/50"
 >
 <svg
 width={20}
 height={20}
 viewBox="0 0 20 20"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0 w-[19.98px] h-[19.98px] relative"
 preserveAspectRatio="none"
 >
 <path
 d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309"
 stroke="#2E211C"
 strokeWidth="1.66541"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 <path
 d="M15.8214 9.99219H4.16357"
 stroke="#2E211C"
 strokeWidth="1.66541"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </button>
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
 <svg
 width={20}
 height={20}
 viewBox="0 0 20 20"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0 w-[19.98px] h-[19.98px] relative"
 preserveAspectRatio="none"
 >
 <path
 d="M15.8214 17.4867L9.9925 14.1559L4.16357 17.4867V4.16346C4.16357 3.72176 4.33904 3.29816 4.65136 2.98583C4.96369 2.67351 5.38729 2.49805 5.82898 2.49805H14.156C14.5977 2.49805 15.0213 2.67351 15.3336 2.98583C15.646 3.29816 15.8214 3.72176 15.8214 4.16346V17.4867Z"
 stroke="#2E211C"
 strokeWidth="1.66541"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </div>
 </div>
 <div className="flex w-full flex-col">
 <div className="self-stretch flex-grow-0 flex-shrink-0 h-[280px] relative bg-[#c8b89a]">
 <div className="w-full h-[280px] absolute left-0 top-0 bg-[#f7f4f0]" />
 <div className="flex flex-col justify-start items-start w-full absolute left-0 top-[180px] gap-[5px] px-5 pb-[18px]">
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative pt-[3px]">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[362px] text-[26px] text-left text-[#2e211c]">
 {food.name}
 </p>
 </div>
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[362px] text-xs text-left text-[#2e211c]">
 {food.description}
 </p>
 </div>
 </div>
 </div>
 <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 px-5 py-3.5 bg-white border-t-0 border-r-0 border-b border-l-0 border-[#ebebeb]">
 <div className="flex justify-start items-center flex-grow gap-[19px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-[5px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2.5">
 <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[31px] w-[95px] relative px-[7px] py-0.5 rounded-lg bg-[#9cb8b7]">
 <p className="flex-grow-0 flex-shrink-0 text-left text-[#2e211c]">
 <span className="flex-grow-0 flex-shrink-0 text-base text-left text-[#2e211c]">
 취향일치도
 </span>
 <span className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#2e211c]">
 {" "}
 </span>
 </p>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 text-[22px] font-black text-left text-[#335352]">
 {food.matchRate}
 </p>
 </div>
 </div>
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-[5px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2.5">
 <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[31px] w-[81px] relative px-[7px] py-0.5 rounded-lg bg-[#9cb8b7]">
 <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#2e211c]">
 평균가격
 </p>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 font-black text-left">
 <span className="flex-grow-0 flex-shrink-0 text-[22px] font-black text-left text-[#335352]">
 {priceAmount}
 </span>
 <span className="flex-grow-0 flex-shrink-0 text-[10px] font-black text-left text-[#9cb8b7]">
 {priceUnit}
 </span>
 </p>
 </div>
 </div>
 <div className="flex justify-end items-center flex-grow w-px h-[19px] gap-2" />
 </div>
 </div>
 </div>
 <div className="flex w-full flex-col gap-3 px-[18px] pt-5">
 <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0">
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1c1e]">판매하는 곳</p>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#9e9794]">더보기 ›</p>
 </div>
 </div>
 <div className="flex justify-start items-start self-stretch gap-2 overflow-x-auto pb-1">
 <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-2">
 <button
 type="button"
 onClick={() => navigate(`/store/${stores[0]?.storeId ?? '1'}`)}
 className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-[5px] p-[17.09000015258789px] rounded-2xl bg-white border-2 border-[#2e211c] text-left transition-colors hover:bg-[#f9f9f9]"
 >
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[78px] w-[294px] gap-[3.9901466369628906px]">
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[9px]">
 <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[30px] w-[30px] relative px-[7px] py-0.5 rounded-[20px] bg-[#c06226]">
 <p className="flex-grow-0 flex-shrink-0 text-xl text-left text-white">{stores[0]?.rank ?? 1}</p>
 </div>
 <div className="flex justify-start items-start flex-grow h-7 relative">
 <p className="flex-grow w-[255px] text-xl text-left text-[#2e211c]">
 {stores[0]?.name ?? '미엘 케이커리'}
 </p>
 </div>
 </div>
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 평균 웨이팅 15분
 </p>
 <svg
 width={2}
 height={2}
 viewBox="0 0 2 2"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0"
 preserveAspectRatio="none"
 >
 <circle cx={1} cy={1} r={1} fill="#665A55" />
 </svg>
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 리뷰 404
 </p>
 <svg
 width={2}
 height={2}
 viewBox="0 0 2 2"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0"
 preserveAspectRatio="none"
 >
 <circle cx={1} cy={1} r={1} fill="#665A55" />
 </svg>
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 1,500원
 </p>
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1 rounded bg-[#3a7bd5]/[0.12]">
 <svg
 width={12}
 height={11}
 viewBox="0 0 12 11"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0"
 preserveAspectRatio="none"
 >
 <path
 d="M6.63067 9.75C6.24577 10.4167 5.28352 10.4167 4.89862 9.75L0.135483 1.5C-0.249417 0.833333 0.231708 0 1.00151 0L10.5278 0C11.2976 0 11.7787 0.833333 11.3938 1.5L6.63067 9.75Z"
 fill="#3A7BD5"
 />
 </svg>
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 500원
 </p>
 </div>
 </div>
 <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-[354px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[78px] relative gap-1">
 <svg
 width={15}
 height={14}
 viewBox="0 0 15 14"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0 w-[15px] h-3.5 relative"
 preserveAspectRatio="none"
 >
 <g clipPath="url(#clip0_23_1198)">
 <path
 d="M12.5 5.83366C12.5 8.74624 9.03812 11.7796 7.87562 12.7164C7.76733 12.7924 7.6355 12.8335 7.5 12.8335C7.3645 12.8335 7.23267 12.7924 7.12438 12.7164C5.96188 11.7796 2.5 8.74624 2.5 5.83366C2.5 4.59598 3.02678 3.409 3.96447 2.53383C4.90215 1.65866 6.17392 1.16699 7.5 1.16699C8.82608 1.16699 10.0979 1.65866 11.0355 2.53383C11.9732 3.409 12.5 4.59598 12.5 5.83366Z"
 stroke="#FF8C42"
 strokeWidth="0.998958"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 <path
 d="M7.5 7.58301C8.53553 7.58301 9.375 6.79951 9.375 5.83301C9.375 4.86651 8.53553 4.08301 7.5 4.08301C6.46447 4.08301 5.625 4.86651 5.625 5.83301C5.625 6.79951 6.46447 7.58301 7.5 7.58301Z"
 stroke="#FF8C42"
 strokeWidth="0.998958"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </g>
 <defs>
 <clipPath id="clip0_23_1198">
 <rect width={15} height={14} fill="white" />
 </clipPath>
 </defs>
 </svg>
 <div className="flex-grow-0 flex-shrink-0 w-[58px] h-4 relative">
 <p className="w-[61px] h-[15px] absolute left-[0.01px] top-0 text-[13px] text-left text-[#ff8c42]">
 서울 마포구
 </p>
 </div>
 </div>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[294px] overflow-hidden gap-2.5">
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2">
 <div className="flex-grow-0 flex-shrink-0 w-[104px] h-[130px] rounded-[10px] bg-[#f7f4f0] border-2 border-[#2e211c]" />
 <div className="flex-grow-0 flex-shrink-0 w-[104px] h-[130px] rounded-[10px] bg-[#f7f4f0] border-2 border-[#2e211c]" />
 <div className="flex-grow-0 flex-shrink-0 w-[104px] h-[130px] rounded-[10px] bg-[#f7f4f0] border-2 border-[#2e211c]" />
 </div>
 </div>
 </button>
 </div>
 {stores[1] ? (
 <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-2">
 <button
 type="button"
 onClick={() => navigate(`/store/${stores[1].storeId}`)}
 className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-[5px] p-[17.09000015258789px] rounded-2xl bg-white border-2 border-[#2e211c] text-left transition-colors hover:bg-[#f9f9f9]"
 >
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-[78px] w-[294px] gap-[3.9901466369628906px]">
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-[9px]">
 <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[30px] w-[30px] relative px-[7px] py-0.5 rounded-[20px] bg-[#c06226]">
 <p className="flex-grow-0 flex-shrink-0 text-xl text-left text-white">{stores[1].rank}</p>
 </div>
 <div className="flex justify-start items-start flex-grow h-7 relative">
 <p className="flex-grow w-[255px] text-xl text-left text-[#2e211c]">
 {stores[1].name}
 </p>
 </div>
 </div>
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2">
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 평균 웨이팅 15분
 </p>
 <div className="flex-grow-0 flex-shrink-0" />
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 리뷰 404
 </p>
 <div className="flex-grow-0 flex-shrink-0" />
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 1,500원
 </p>
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1 rounded bg-[#3a7bd5]/[0.12]">
 <div className="flex-grow-0 flex-shrink-0" />
 <p className="flex-grow-0 flex-shrink-0 text-[13px] text-left text-[#665a55]">
 500원
 </p>
 </div>
 </div>
 <div className="flex justify-between items-center flex-grow-0 flex-shrink-0 w-[354px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[78px] relative gap-1">
 <svg
 width={15}
 height={14}
 viewBox="0 0 15 14"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className="flex-grow-0 flex-shrink-0 w-[15px] h-3.5 relative"
 preserveAspectRatio="none"
 >
 <g clipPath="url(#clip0_23_1227)">
 <path
 d="M12.5 5.83366C12.5 8.74624 9.03812 11.7796 7.87562 12.7164C7.76733 12.7924 7.6355 12.8335 7.5 12.8335C7.3645 12.8335 7.23267 12.7924 7.12438 12.7164C5.96188 11.7796 2.5 8.74624 2.5 5.83366C2.5 4.59598 3.02678 3.409 3.96447 2.53383C4.90215 1.65866 6.17392 1.16699 7.5 1.16699C8.82608 1.16699 10.0979 1.65866 11.0355 2.53383C11.9732 3.409 12.5 4.59598 12.5 5.83366Z"
 stroke="#FF8C42"
 strokeWidth="0.998958"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 <path
 d="M7.5 7.58301C8.53553 7.58301 9.375 6.79951 9.375 5.83301C9.375 4.86651 8.53553 4.08301 7.5 4.08301C6.46447 4.08301 5.625 4.86651 5.625 5.83301C5.625 6.79951 6.46447 7.58301 7.5 7.58301Z"
 stroke="#FF8C42"
 strokeWidth="0.998958"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </g>
 <defs>
 <clipPath id="clip0_23_1227">
 <rect width={15} height={14} fill="white" />
 </clipPath>
 </defs>
 </svg>
 <div className="flex-grow-0 flex-shrink-0 w-[58px] h-4 relative">
 <p className="w-[61px] h-[15px] absolute left-[0.01px] top-0 text-[13px] text-left text-[#ff8c42]">
 서울 마포구
 </p>
 </div>
 </div>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[294px] overflow-hidden gap-2.5">
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2">
 <div className="flex-grow-0 flex-shrink-0 w-[104px] h-[130px] rounded-[10px] bg-[#f7f4f0] border-2 border-[#2e211c]" />
 <div className="flex-grow-0 flex-shrink-0 w-[104px] h-[130px] rounded-[10px] bg-[#f7f4f0] border-2 border-[#2e211c]" />
 <div className="flex-grow-0 flex-shrink-0 w-[104px] h-[130px] rounded-[10px] bg-[#f7f4f0] border-2 border-[#2e211c]" />
 </div>
 </div>
 </button>
 </div>
 ) : null}
 </div>
 </div>
 <div className="flex w-full flex-col gap-2 px-[18px] pt-5 pb-6">
 <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0">
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 text-base text-left text-[#1c1c1e]">
 지금 뜨는 리뷰
 </p>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
 <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#9e9794]">더보기 ›</p>
 </div>
 </div>
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-[255px] relative gap-[7.997333526611328px] pl-[17.086042404174805px] pr-[17.08604621887207px] pt-[17.0860595703125px] pb-[1.0913200378417969px] rounded-2xl bg-white border-2 border-[#2e211c]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[295px] h-9 gap-[92px] pr-[-0.000011444091796875px]">
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[81.97px] h-[35.98px] relative gap-[7.997364044189453px]">
 <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[31.99px] h-[31.99px] relative rounded-[36618800px] bg-[#2e211c]">
 <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-white">쫀</p>
 </div>
 <div className="flex-grow h-[35.98px] relative">
 <p className="absolute left-[0.5px] top-[-0.46px] text-sm text-left text-[#2e211c]">
 쫀득파
 </p>
 <p className="absolute left-[0.5px] top-[19.54px] text-xs text-left text-[#9e9794]">
 방금 전
 </p>
 </div>
 </div>
 <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[114px] h-6 relative gap-[7.997344970703125px]">
 <div className="flex-grow-0 flex-shrink-0 w-[100px] h-6 relative rounded-lg bg-[#9cb8b7]">
 <p className="absolute left-[11.95px] top-[4.27px] text-xs text-left text-[#2e211c]">
 취향 일치도 68%
 </p>
 </div>
 <div className="flex-grow-0 flex-shrink-0 w-[37px] h-6 relative rounded-lg bg-[#335352]">
 <p className="absolute left-[8.09px] top-[4.27px] text-xs text-left text-white">만족</p>
 </div>
 </div>
 </div>
 <div className="self-stretch flex-grow-0 flex-shrink-0 h-[22px] relative">
 <p className="w-[283px] absolute left-0 top-[-0.91px] text-xs text-left text-[#717171]">
 저녁에 방문 | 평일에 방문 | 웨이팅 15분
 </p>
 </div>
 <div className="self-stretch flex-grow-0 flex-shrink-0 h-[50px] relative">
 <p className="w-[296px] absolute left-[-0.09px] top-[-1.06px] text-sm text-left text-neutral-700">
 진짜 쫀득하고 버터향이 강해서 멀리서 와도 먹을 만해요. 겉은 살짝 바삭하고 안은 떡처럼
 쫀쫀해요.
 </p>
 </div>
 <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-16 gap-[7.997364044189453px]">
 <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-16 h-16 relative pl-[20.00192642211914px] pr-[20.001907348632812px] rounded-[10px] bg-neutral-200">
 <div className="flex-grow-0 flex-shrink-0 w-[23.99px] h-[23.99px] relative" />
 </div>
 <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-16 h-16 relative pl-[20.001922607421875px] pr-[20.001911163330078px] rounded-[10px] bg-neutral-200">
 <div className="flex-grow-0 flex-shrink-0 w-[23.99px] h-[23.99px] relative" />
 </div>
 </div>
 <div className="flex justify-start items-end flex-grow-0 flex-shrink-0 relative gap-1">
 <div className="flex-grow-0 flex-shrink-0 w-5 h-5 relative" />
 <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#2e211c]">공감 남기기</p>
 </div>
 </div>
 <div
 className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-[9.399999618530273px] pt-1 pb-[13px] rounded-[14px] bg-white border-2 border-[#2e211c]"
 style={{ boxShadow: "0px 1px 6px 0 rgba(0,0,0,0.05)" }}
 >
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 px-3.5 pt-3">
 <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-7 h-7 relative rounded-[14px] bg-[#ff6b35]">
 <p className="flex-grow-0 flex-shrink-0 text-[11px] font-bold text-center text-white">
 쫀
 </p>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow">
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[290px] text-xs font-bold text-left text-[#1c1c1e]">
 쫀득파
 </p>
 </div>
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[290px] text-[10px] text-left text-[#8a8a8e]">
 방금 전 · 취향 일치도 68%
 </p>
 </div>
 </div>
 </div>
 <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-0.5 px-3.5 pt-[0.6000000238418579px]">
 <div className="flex-grow h-[90px] rounded-lg bg-[#d9d2ca]" />
 <div className="flex-grow h-[90px] rounded-lg bg-[#d4cec6]" />
 <div className="flex-grow h-[90px] rounded-lg bg-[#cfc8c0]" />
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[326px] relative">
 <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#1c1c1e]">
 <span className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#1c1c1e]">
 진짜 쫀득하고 버터향이 강해서 멀리서 와도 먹을 만해요. 살짝 바
 </span>
 <br />
 <span className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#1c1c1e]">
 삭하고 안은 떡처럼 쫀쫀해요.
 </span>
 </p>
 </div>
 </div>
 <div
 className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-[9.399999618530273px] pb-[13px] rounded-[14px] bg-white"
 style={{ boxShadow: "0px 1px 6px 0 rgba(0,0,0,0.05)" }}
 >
 <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 px-3.5 pt-3">
 <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-7 h-7 relative rounded-[14px] bg-[#8b7ead]">
 <p className="flex-grow-0 flex-shrink-0 text-[11px] font-bold text-center text-white">
 단
 </p>
 </div>
 <div className="flex flex-col justify-start items-start flex-grow">
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[290px] text-xs font-bold text-left text-[#1c1c1e]">
 단짠러버
 </p>
 </div>
 <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
 <p className="self-stretch flex-grow-0 flex-shrink-0 w-[290px] text-[10px] text-left text-[#8a8a8e]">
 24분 전 · 취향 일치도 91%
 </p>
 </div>
 </div>
 </div>
 <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-0.5 px-3.5 pt-[0.6000000238418579px]">
 <div className="flex-grow h-[90px] rounded-lg bg-[#d2ccc4]" />
 <div className="flex-grow h-[90px] rounded-lg bg-[#ccc6be]" />
 </div>
 <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[326px] relative">
 <p className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#1c1c1e]">
 <span className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#1c1c1e]">
 버터 풍미가 정말 진해요. 포장 상태도 좋고 선물용으로 샀는데 반
 </span>
 <br />
 <span className="flex-grow-0 flex-shrink-0 text-xs text-left text-[#1c1c1e]">
 응이 좋았어요!
 </span>
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 <BottomNavigation activeTab="explore" />
 </div>
 );
}

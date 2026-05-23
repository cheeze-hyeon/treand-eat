import type { StoreReview } from '../data/stores';

function ReviewPhotoPlaceholder() {
  return (
    <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" fill="none" />
      <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" fill="none" />
      <path
        d="M3 16L8 11L13 16"
        stroke="#A1A1A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M13 13L16 10L21 15"
        stroke="#A1A1A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

type StoreReviewCardProps = {
  review: StoreReview;
  liked: boolean;
  onToggleLike: () => void;
  showMatchRate?: boolean;
};

export default function StoreReviewCard({
  review,
  liked,
  onToggleLike,
  showMatchRate = true,
}: StoreReviewCardProps) {
  return (
    <div className="relative rounded-[16px] border-2 border-[#404040] bg-white p-[14px] pb-[40px]">
      <div className="mb-[6px] flex items-end justify-between">
        <div className="flex items-center gap-[8px]">
          <div className="flex size-[32px] items-center justify-center rounded-full bg-[#2e211c]">
            <p className="text-[12px] text-white">{review.authorInitial}</p>
          </div>
          <div>
            <p className="text-[14px] font-extrabold text-[#2e211c]">{review.author}</p>
            <p className="text-[12px] text-[#9e9794]">{review.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-[4px]">
          {showMatchRate && (
            <div className="rounded-[8px] bg-[#9cb8b7] px-[8px] py-[3px]">
              <p className="text-[11px] text-[#2e211c]">취향 일치율 {review.matchRate}%</p>
            </div>
          )}
          <div className="text-[28px]">{review.satisfied ? '🙂' : '🙁'}</div>
        </div>
      </div>

      <p className="mb-[6px] text-[12px] text-[#717171]">
        {review.visitTime} | {review.visitDay} | {review.waiting}
      </p>

      <p
        className={`mb-[6px] text-[14px] leading-[22.75px] ${review.satisfied ? 'text-[#2e211c]' : 'text-[#404040]'}`}
      >
        {review.text}
      </p>

      <div className="flex gap-[8px]">
        {Array.from({ length: review.imageCount }).map((_, i) => (
          <div
            key={i}
            className="flex size-[64px] items-center justify-center rounded-[10px] bg-[#f7f4f0]"
          >
            <ReviewPhotoPlaceholder />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike();
        }}
        className="absolute bottom-[14px] right-[14px] flex items-center gap-[4px] transition-colors"
      >
        <div className="size-[16px]">
          <svg className="size-full" fill="none" viewBox="0 0 25 25">
            <path
              d="M7.69227 21.0403C7.42516 21.0403 7.16944 20.9345 6.98466 20.7467C6.79987 20.5589 6.69727 20.3039 6.69727 20.0409V10.3763C6.69727 10.1133 6.79987 9.85828 6.98466 9.67048C7.16944 9.48268 7.42516 9.37695 7.69227 9.37695H10.1781L13.5858 3.55749C13.7103 3.34188 13.8952 3.16541 14.1188 3.0509C14.3424 2.9364 14.5953 2.88892 14.8457 2.91448C15.0961 2.94003 15.3336 3.03741 15.5302 3.19522C15.7267 3.35304 15.8739 3.56464 15.9544 3.80386L17.7498 9.37695H20.7331C21.0002 9.37695 21.2559 9.48268 21.4407 9.67048C21.6255 9.85828 21.7281 10.1133 21.7281 10.3763V12.3709C21.7281 12.5177 21.7006 12.6632 21.6471 12.7997L18.4894 20.2908C18.393 20.5275 18.2245 20.7292 18.0062 20.8689C17.7879 21.0087 17.5303 21.0801 17.2675 21.0739H7.69227V21.0403ZM4.21227 10.3763V21.0403H2.22227V10.3763H4.21227Z"
              fill={liked ? '#4a90a4' : 'none'}
              stroke={liked ? '#4a90a4' : '#9CB8B7'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
        <p className={`text-[12px] ${liked ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>공감</p>
      </button>
    </div>
  );
}

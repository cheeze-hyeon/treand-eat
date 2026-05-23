import type { TrendingReview } from '../data/trendingReviews';

function ReviewPhotoPlaceholder() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" />
      <path
        d="M3 16L8 11L13 16"
        stroke="#A1A1A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 13L16 10L21 15"
        stroke="#A1A1A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type TrendingReviewCardProps = {
  review: TrendingReview;
  liked: boolean;
  onToggleLike: () => void;
  showMatchRate?: boolean;
};

export default function TrendingReviewCard({
  review,
  liked,
  onToggleLike,
  showMatchRate = true,
}: TrendingReviewCardProps) {
  return (
    <div className="relative h-[245.5px] shrink-0 self-stretch">
      <div className="absolute left-0 top-0 h-[245.5px] w-full rounded-2xl border-2 border-neutral-700 bg-white">
        <div className="absolute left-4 right-4 top-4 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e211c]">
              <p className="text-xs text-white">{review.authorInitial}</p>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm text-[#2e211c]">{review.author}</p>
              <p className="text-xs text-[#9e9794]">{review.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {showMatchRate && (
              <div className="rounded-lg bg-[#9cb8b7] px-2 pt-[3px]">
                <p className="text-[11px] text-[#2e211c]">취향 일치율 {review.matchRate}%</p>
              </div>
            )}
            <p className="text-[28px] leading-none">{review.satisfied ? '🙂' : '🙁'}</p>
          </div>
        </div>
        <p className="absolute left-4 right-4 top-16 text-xs text-[#717171]">{review.visitInfo}</p>
        <p
          className={`absolute left-4 right-4 top-[88px] line-clamp-2 text-sm ${
            review.satisfied ? 'text-[#2e211c]' : 'text-[#404040]'
          }`}
        >
          {review.text}
        </p>
        <div className="absolute left-4 top-[139.5px] flex items-start gap-2">
          {Array.from({ length: review.imageCount }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-[10px] bg-[#f7f4f0]"
            >
              <ReviewPhotoPlaceholder />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggleLike}
          className="absolute bottom-4 right-4 flex items-center gap-1"
        >
          <div className="h-4 w-4">
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
          <p className={`text-xs ${liked ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>공감</p>
        </button>
      </div>
    </div>
  );
}

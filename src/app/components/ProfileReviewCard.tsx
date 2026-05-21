function ReviewPhotoPlaceholder() {
  return (
    <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        stroke="#A1A1A1"
        strokeWidth={2}
      />
      <path
        d="M8.5 11C9.88071 11 11 9.88071 11 8.5C11 7.11929 9.88071 6 8.5 6C7.11929 6 6 7.11929 6 8.5C6 9.88071 7.11929 11 8.5 11Z"
        stroke="#A1A1A1"
        strokeWidth={2}
      />
      <path
        d="M3 16L8 11L13 16"
        stroke="#A1A1A1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 13L16 10L21 15"
        stroke="#A1A1A1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M23 11.9991L20.56 9.21906L20.9 5.53906L17.29 4.71906L15.4 1.53906L12 2.99906L8.6 1.53906L6.71 4.71906L3.1 5.52906L3.44 9.20906L1 11.9991L3.44 14.7791L3.1 18.4691L6.71 19.2891L8.6 22.4691L12 20.9991L15.4 22.4591L17.29 19.2791L20.9 18.4591L20.56 14.7791L23 11.9991ZM10 16.9991L6 12.9991L7.41 11.5891L10 14.1691L16.59 7.57906L18 8.99906L10 16.9991Z"
        fill="#335352"
      />
    </svg>
  );
}

function LikeIcon({ liked }: { liked: boolean }) {
  const color = liked ? '#4a90a4' : '#9CB8B7';
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M4.92316 13.4662C4.75221 13.4662 4.58855 13.3985 4.47029 13.2783C4.35203 13.1581 4.28636 12.9949 4.28636 12.8266V6.64121C4.28636 6.47289 4.35203 6.30967 4.47029 6.18948C4.58855 6.06929 4.75221 6.00162 4.92316 6.00162H6.51409L8.69502 2.27717C8.7747 2.13918 8.89304 2.02624 9.03614 1.95295C9.17925 1.87967 9.3411 1.84928 9.50136 1.86564C9.66161 1.88199 9.81361 1.94432 9.93944 2.04532C10.0652 2.14632 10.1594 2.28174 10.2109 2.43485L11.36 6.00162H13.2693C13.4402 6.00162 13.6039 6.06929 13.7222 6.18948C13.8404 6.30967 13.9061 6.47289 13.9061 6.64121V7.91775C13.9061 8.0117 13.8885 8.10482 13.8543 8.19218L11.8333 12.9865C11.7716 13.138 11.6638 13.2671 11.5241 13.3565C11.3844 13.4459 11.2195 13.4916 11.0513 13.4877H4.92316V13.4662ZM2.69596 6.64121V13.4662H1.42236V6.64121H2.69596Z"
        stroke={color}
        strokeWidth={1.28}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={liked ? color : 'none'}
      />
    </svg>
  );
}

export type ProfileReviewCardProps = {
  storeName: string;
  menuName: string;
  authorInitial: string;
  authorName: string;
  time: string;
  satisfied: boolean;
  visitInfo: string;
  content: string;
  imageCount: number;
  liked?: boolean;
  onToggleLike?: () => void;
  onStoreClick?: () => void;
  onMenuClick?: () => void;
  /** 타인 프로필 카드에서 인증 뱃지 위치가 약간 다름 */
  variant?: 'own' | 'other';
};

export default function ProfileReviewCard({
  storeName,
  menuName,
  authorInitial,
  authorName,
  time,
  satisfied,
  visitInfo,
  content,
  imageCount,
  liked = false,
  onToggleLike,
  onStoreClick,
  onMenuClick,
  variant = 'own',
}: ProfileReviewCardProps) {
  const verifiedTop = variant === 'own' ? 'top-[87px]' : 'top-[90px]';

  return (
    <div className="relative h-[277.5px] w-full rounded-2xl border-2 border-neutral-700 bg-white">
      <div className="absolute left-4 top-4 flex h-6 items-center gap-1.5">
        <button
          type="button"
          onClick={onStoreClick}
          className="text-base text-[#2e211c] hover:underline"
        >
          {storeName}
        </button>
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md bg-[#2e211c] px-1.5 pt-0.5 transition-opacity hover:opacity-80"
        >
          <span className="text-[11px] text-white">{menuName}</span>
        </button>
      </div>

      <div className="absolute left-4 right-4 top-12 flex h-[42px] items-end justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e211c]">
            <span className="text-xs text-white">{authorInitial}</span>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-[#2e211c]">{authorName}</p>
            <p className="text-xs text-[#9e9794]">{time}</p>
          </div>
        </div>
        <p className="text-[28px] leading-none text-[#0a0a0a]">{satisfied ? '🙂' : '🙁'}</p>
      </div>

      {satisfied && (
        <div className={`absolute right-4 ${verifiedTop}`} aria-hidden>
          <VerifiedBadge />
        </div>
      )}

      <p className="absolute left-4 right-4 top-24 text-xs text-[#717171]">{visitInfo}</p>

      <p
        className={`absolute left-4 right-4 top-[120px] line-clamp-2 text-sm ${
          satisfied ? 'text-[#2e211c]' : 'text-[#404040]'
        }`}
      >
        {content}
      </p>

      <div className="absolute left-4 top-[171.5px] flex gap-2">
        {Array.from({ length: imageCount }).map((_, i) => (
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
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike?.();
        }}
        className="absolute bottom-[14px] right-4 flex items-center gap-1 transition-colors"
      >
        <LikeIcon liked={liked} />
        <span className={`text-xs ${liked ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>공감</span>
      </button>
    </div>
  );
}

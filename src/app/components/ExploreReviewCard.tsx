import { useEffect, useRef, useState } from 'react';

function ReviewPhotoPlaceholder() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#A1A1A1" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="2.5" stroke="#A1A1A1" strokeWidth="2" />
      <path d="M3 16L8 11L13 16" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 13L16 10L21 15" stroke="#A1A1A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" aria-label="영수증 인증">
      <path d="M23 11.9991L20.56 9.21906L20.9 5.53906L17.29 4.71906L15.4 1.53906L12 2.99906L8.6 1.53906L6.71 4.71906L3.1 5.52906L3.44 9.20906L1 11.9991L3.44 14.7791L3.1 18.4691L6.71 19.2891L8.6 22.4691L12 20.9991L15.4 22.4591L17.29 19.2791L20.9 18.4591L20.56 14.7791L23 11.9991ZM10 16.9991L6 12.9991L7.41 11.5891L10 14.1691L16.59 7.57906L18 8.99906L10 16.9991Z" fill="#335352" />
    </svg>
  );
}

function LikeIcon({ liked }: { liked: boolean }) {
  const color = liked ? '#4A90A4' : '#9CB8B7';
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 16 16" aria-hidden>
      <path d="M4.92316 13.4662C4.75221 13.4662 4.58855 13.3985 4.47029 13.2783C4.35203 13.1581 4.28636 12.9949 4.28636 12.8266V6.64121C4.28636 6.47289 4.35203 6.30967 4.47029 6.18948C4.58855 6.06929 4.75221 6.00162 4.92316 6.00162H6.51409L8.69502 2.27717C8.7747 2.13918 8.89304 2.02624 9.03614 1.95295C9.17925 1.87967 9.3411 1.84928 9.50136 1.86564C9.66161 1.88199 9.81361 1.94432 9.93944 2.04532C10.0652 2.14632 10.1594 2.28174 10.2109 2.43485L11.36 6.00162H13.2693C13.4402 6.00162 13.6039 6.06929 13.7222 6.18948C13.8404 6.30967 13.9061 6.47289 13.9061 6.64121V7.91775C13.9061 8.0117 13.8885 8.10482 13.8543 8.19218L11.8333 12.9865C11.7716 13.138 11.6638 13.2671 11.5241 13.3565C11.3844 13.4459 11.2195 13.4916 11.0513 13.4877H4.92316V13.4662ZM2.69596 6.64121V13.4662H1.42236V6.64121H2.69596Z" fill={liked ? color : 'none'} stroke={color} strokeWidth="1.28" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type ExploreReviewCardProps = {
  storeName: string;
  menuName: string;
  authorInitial: string;
  author: string;
  time: string;
  matchRate: number;
  satisfied: boolean;
  visitInfo: string;
  text: string;
  imageCount: number;
  verified?: boolean;
  liked?: boolean;
  showMatchRate?: boolean;
  onToggleLike?: () => void;
  onNavigate?: () => void;
};

function ReviewText({ text, satisfied, expanded, onExpand, onCollapse }: { text: string; satisfied: boolean; expanded: boolean; onExpand: () => void; onCollapse: () => void; }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el || expanded) return;
    setIsTruncated(el.scrollHeight > el.clientHeight + 1);
  }, [text, expanded]);

  const textColor = satisfied ? 'text-[#2e211c]' : 'text-[#404040]';

  return (
    <div className="mb-3">
      <p ref={textRef} className={`text-sm ${textColor} ${expanded ? '' : 'line-clamp-2'}`}>{text}</p>
      {!expanded && isTruncated && (
        <button type="button" onClick={(e) => { e.stopPropagation(); onExpand(); }} className="mt-1 text-xs text-[#797979] underline">…더보기</button>
      )}
      {expanded && (
        <button type="button" onClick={(e) => { e.stopPropagation(); onCollapse(); }} className="mt-1 text-xs text-[#797979] underline">접기</button>
      )}
    </div>
  );
}

function ExploreReviewCardBody(props: Omit<ExploreReviewCardProps, 'onNavigate'>) {
  const { storeName, menuName, authorInitial, author, time, matchRate, satisfied, visitInfo, text, imageCount, verified = false, liked = false, showMatchRate = true, onToggleLike } = props;
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="mb-3 flex items-center gap-1.5">
        <p className="text-base text-[#2e211c]">{storeName}</p>
        <span className="rounded-md bg-[#2e211c] px-1.5 pt-0.5 text-[11px] text-white">{menuName}</span>
      </div>
      <div className="mb-3 flex items-end justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2e211c]">
            <span className="text-xs text-white">{authorInitial}</span>
          </div>
          <div>
            <p className="text-sm text-[#2e211c]">{author}</p>
            <p className="text-xs text-[#9e9794]">{time}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {showMatchRate && <span className="rounded-lg bg-[#9cb8b7] px-2 pt-[3px] text-[11px] text-[#2e211c]">취향 일치율 {matchRate}%</span>}
          <span className="text-[28px] leading-none">{satisfied ? '🙂' : '🙁'}</span>
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs text-[#717171]">{visitInfo}</p>
        {verified && satisfied && <VerifiedBadge />}
      </div>
      <ReviewText text={text} satisfied={satisfied} expanded={expanded} onExpand={() => setExpanded(true)} onCollapse={() => setExpanded(false)} />
      <div className="mb-3 flex gap-2">
        {Array.from({ length: imageCount }).map((_, i) => (
          <div key={i} className="flex h-16 w-16 items-center justify-center rounded-[10px] bg-[#f7f4f0]"><ReviewPhotoPlaceholder /></div>
        ))}
      </div>
      <div className="flex justify-end">
        <span role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); onToggleLike?.(); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onToggleLike?.(); } }} className="flex items-center gap-1">
          <LikeIcon liked={liked} />
          <span className={`text-xs ${liked ? 'text-[#4a90a4]' : 'text-[#9cb8b7]'}`}>공감</span>
        </span>
      </div>
    </>
  );
}

export default function ExploreReviewCard({ onNavigate, ...props }: ExploreReviewCardProps) {
  const cardClassName = 'relative w-full rounded-2xl border-2 border-neutral-700 bg-white p-4';
  if (onNavigate) {
    return (
      <div role="button" tabIndex={0} onClick={onNavigate} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(); } }} className={`${cardClassName} cursor-pointer text-left`}>
        <ExploreReviewCardBody {...props} />
      </div>
    );
  }
  return <div className={cardClassName}><ExploreReviewCardBody {...props} /></div>;
}

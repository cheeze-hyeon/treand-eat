import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import svgPaths from '../../imports/매장별페이지-1/svg-rwqfjwbxb';
import BottomNavigation from '../components/BottomNavigation';
import StoreDetailContent from '../components/StoreDetailContent';

export default function StoreDetailPage() {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [isSaved, setIsSaved] = useState(true);

  if (!storeId) return null;

  return (
    <div className="relative h-full min-h-0 w-full overflow-y-auto bg-white">
      <div className="sticky top-0 z-10 flex h-[70px] items-center justify-between bg-white px-[24px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex size-[28px] items-center justify-center"
        >
          <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 19.9849 19.9849">
            <path
              d={svgPaths.p368bf240}
              stroke="#2E211C"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M15.8214 9.99245H4.16352"
              stroke="#2E211C"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIsSaved(!isSaved)}
          className="flex size-[28px] items-center justify-center"
        >
          <svg className="h-[24px] w-[24px]" fill="none" viewBox="0 0 19.9849 19.9849">
            <path
              d={svgPaths.p39f88880}
              stroke="#2E211C"
              fill={isSaved ? '#2E211C' : 'none'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.66541"
            />
          </svg>
        </button>
      </div>

      <StoreDetailContent storeId={storeId} />

      <BottomNavigation />
    </div>
  );
}

import { useNavigate } from 'react-router';
import { Drawer } from 'vaul';
import {
  MAP_BOTTOM_NAV_HEIGHT,
  MAP_DRAWER_EXPANDED_SNAP,
  MAP_DRAWER_PEEK_SNAP,
} from '../../data/mapLayout';
import type { DrawerSnap, MapStore } from '../../data/mapStores';
import { getStoreById } from '../../data/stores';
import MapStorePeekCard from './MapStorePeekCard';

type MapStoreDetailSheetProps = {
  store: MapStore | undefined;
  drawerSnap: DrawerSnap;
  onDrawerSnapChange: (snap: DrawerSnap) => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
};

export default function MapStoreDetailSheet({
  store,
  drawerSnap,
  onDrawerSnapChange,
  isBookmarked,
  onBookmarkToggle,
}: MapStoreDetailSheetProps) {
  const navigate = useNavigate();
  const isOpen = drawerSnap !== 'closed' && store != null;
  const activeSnap = drawerSnap === 'expanded' ? MAP_DRAWER_EXPANDED_SNAP : MAP_DRAWER_PEEK_SNAP;
  const detail = store ? getStoreById(store.id) : null;

  const handleSnapChange = (point: number | string | null) => {
    if (point === null) {
      onDrawerSnapChange('closed');
      return;
    }
    if (point === MAP_DRAWER_EXPANDED_SNAP) {
      onDrawerSnapChange('expanded');
    } else if (point === MAP_DRAWER_PEEK_SNAP) {
      onDrawerSnapChange('peek');
    }
  };

  if (!store) return null;

  return (
    <Drawer.Root
      open={isOpen}
      snapPoints={[MAP_DRAWER_PEEK_SNAP, MAP_DRAWER_EXPANDED_SNAP]}
      activeSnapPoint={isOpen ? activeSnap : null}
      setActiveSnapPoint={handleSnapChange}
      fadeFromIndex={1}
      onOpenChange={(open) => {
        if (!open) onDrawerSnapChange('closed');
      }}
      modal={drawerSnap === 'expanded'}
    >
      <Drawer.Portal>
        {drawerSnap === 'expanded' && (
          <Drawer.Overlay className="fixed inset-0 z-40 bg-black/30" />
        )}
        <Drawer.Content
          className="fixed inset-x-0 z-50 flex flex-col rounded-t-[20px] bg-white outline-none max-w-[393px] mx-auto"
          style={{ bottom: MAP_BOTTOM_NAV_HEIGHT, boxShadow: '0px -6px 30px 0 rgba(0,0,0,0.1)' }}
        >
          <div className="flex justify-center pt-2.5 pb-1.5 shrink-0">
            <div className="w-9 h-1 rounded-sm bg-black/[0.12]" aria-hidden />
          </div>

          {drawerSnap === 'peek' && (
            <div className="pb-4">
              <MapStorePeekCard
                store={store}
                isBookmarked={isBookmarked}
                onBookmarkToggle={onBookmarkToggle}
                onExpand={() => onDrawerSnapChange('expanded')}
              />
            </div>
          )}

          {drawerSnap === 'expanded' && detail && (
            <div className="flex flex-col max-h-[calc(88vh-40px)] overflow-y-auto pb-6">
              <div className="flex items-center justify-between px-6 py-2 sticky top-0 bg-white z-10">
                <button
                  type="button"
                  onClick={() => onDrawerSnapChange('peek')}
                  aria-label="요약으로 돌아가기"
                  className="w-7 h-7 flex items-center justify-center"
                >
                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309"
                      stroke="#2E211C"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.8214 9.99219H4.16357"
                      stroke="#2E211C"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  <span className="bg-[#2e211c] text-white text-[13px] font-bold px-2.5 py-1 rounded-lg">
                    {store.highlightMenu}
                  </span>
                  <button
                    type="button"
                    onClick={onBookmarkToggle}
                    aria-label={isBookmarked ? '북마크 해제' : '북마크 저장'}
                    className="w-7 h-7 flex items-center justify-center"
                  >
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M15.8214 17.4867L9.9925 14.1559L4.16357 17.4867V4.16346C4.16357 3.72176 4.33904 3.29816 4.65136 2.98583C4.96369 2.67351 5.38729 2.49805 5.82898 2.49805H14.156C14.5977 2.49805 15.0213 2.67351 15.3336 2.98583C15.646 3.29816 15.8214 3.72176 15.8214 4.16346V17.4867Z"
                        stroke="#2E211C"
                        strokeWidth="1.67"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill={isBookmarked ? '#2E211C' : 'none'}
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDrawerSnapChange('closed')}
                    aria-label="닫기"
                    className="w-7 h-7 flex items-center justify-center text-[#2e211c] text-xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="px-6 pb-4 border-b border-[#e5e5e5]">
                <p className="font-bold text-[#2e211c] text-[20px] mb-1">{detail.name}</p>
                <p className="text-[#2e211c] text-[20px] font-bold mb-2">
                  {detail.price}{' '}
                  <span className="text-[#9e9794] text-[13px] font-normal">{detail.priceUnit}</span>
                </p>
                <p className="text-[#665a55] text-[13px] mb-2">
                  평균 웨이팅 {detail.waitingTime} · 리뷰 {detail.reviewCount}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#c06226] text-[13px]">
                    <svg width={15} height={14} viewBox="0 0 15 14" fill="none" aria-hidden>
                      <path
                        d="M7.5 12.5C10.5 9.5 12.5 7.5 12.5 5.5C12.5 3.5 10.5 1.5 7.5 1.5C4.5 1.5 2.5 3.5 2.5 5.5C2.5 7.5 4.5 9.5 7.5 12.5Z"
                        stroke="#C06226"
                        strokeWidth="1"
                      />
                      <circle cx="7.5" cy="5.5" r="1.5" stroke="#C06226" strokeWidth="1" />
                    </svg>
                    {detail.location}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/write-review?storeId=${store.id}`)}
                    className="bg-[#c06226] rounded-2xl px-[13px] py-1 text-white text-[12px]"
                  >
                    리뷰 쓰기
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 flex gap-2 overflow-x-auto">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-[#f7f4f0] h-[130px] w-[104px] rounded-[10px] border-2 border-[#2e211c] flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

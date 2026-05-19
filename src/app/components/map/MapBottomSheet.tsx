import { useCallback, useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import StoreDetailContent from '../StoreDetailContent';
import {
  MAP_SHEET_SNAP_DETAIL,
  MAP_SHEET_SNAP_LIST,
  MAP_SHEET_SNAP_LIST_MAX,
} from '../../data/mapLayout';
import type { MapMetricMode, MapStore } from '../../data/mapStores';
import MapStoreListItem from './MapStoreListItem';

type MapBottomSheetProps = {
  container: HTMLElement | null;
  stores: MapStore[];
  selectedStore: MapStore | undefined;
  metricMode: MapMetricMode;
  onSelectStore: (id: string) => void;
  onBackToList: () => void;
  onSnapBlockHeightChange: (heightPx: number) => void;
};

function SheetHandle() {
  return (
    <div className="flex shrink-0 justify-center pt-2.5 pb-1.5">
    </div>
  );
}

export default function MapBottomSheet({
  container,
  stores,
  selectedStore,
  metricMode,
  onSelectStore,
  onBackToList,
  onSnapBlockHeightChange,
}: MapBottomSheetProps) {
  const [containerHeightPx, setContainerHeightPx] = useState(0);
  const [snapBlockHeightPx, setSnapBlockHeightPx] = useState(0);
  const [currentSnap, setCurrentSnap] = useState<number>(MAP_SHEET_SNAP_LIST);
  const isDetail = selectedStore != null;

  const snapPoints = isDetail
    ? [MAP_SHEET_SNAP_LIST, MAP_SHEET_SNAP_DETAIL]
    : [MAP_SHEET_SNAP_LIST, MAP_SHEET_SNAP_LIST_MAX];

  const activeSnap = isDetail ? MAP_SHEET_SNAP_DETAIL : MAP_SHEET_SNAP_LIST;

  const updateHeights = useCallback(() => {
    if (!container) return;
    const h = container.getBoundingClientRect().height;
    setContainerHeightPx(h);
    const snapH = Math.max(280, Math.round(h * currentSnap));
    setSnapBlockHeightPx(snapH);
    onSnapBlockHeightChange(snapH);
  }, [container, currentSnap, onSnapBlockHeightChange]);

  useEffect(() => {
    setCurrentSnap(activeSnap);
  }, [activeSnap]);

  useEffect(() => {
    if (!container) return;
    updateHeights();
    const observer = new ResizeObserver(updateHeights);
    observer.observe(container);
    return () => observer.disconnect();
  }, [container, updateHeights]);

  const handleSnapChange = (point: number | string | null) => {
    if (point === null) return;
    if (typeof point === 'number') {
      setCurrentSnap(point);
    }
    if (isDetail && point === MAP_SHEET_SNAP_LIST) {
      onBackToList();
    }
  };

  if (!container) {
    return null;
  }

  return (
    <Drawer.Root
      open
      defaultOpen
      container={container}
      snapPoints={snapPoints}
      activeSnapPoint={activeSnap}
      setActiveSnapPoint={handleSnapChange}
      dismissible={false}
      modal={false}
      handleOnly
      snapToSequentialPoint
    >
      <Drawer.Portal>
        <Drawer.Content
          className="absolute inset-x-0 bottom-0 z-500 mx-auto flex max-w-[393px] flex-col bg-transparent outline-none"
          style={{
            height: containerHeightPx > 0 ? containerHeightPx : '100%',
          }}
        >
          {/* Vaul snap exposes the top of the drawer — block height matches snap so the sheet sits flush on the tab bar */}
          <div
            className="flex w-full shrink-0 flex-col overflow-hidden rounded-t-[20px] bg-white pt-4"
            style={{
              height: snapBlockHeightPx > 0 ? snapBlockHeightPx : 280,
              boxShadow: '0px -6px 30px 0 rgba(0,0,0,0.1)',
            }}
          >
              <Drawer.Handle>
                <SheetHandle />
              </Drawer.Handle>

              <div
                className="map-sheet-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain py-4"
                data-vaul-no-drag=""
              >
                {!isDetail ? (
                  <div className="px-[18px] pb-20 pt-1">
                    {stores.length === 0 ? (
                      <p className="py-8 text-center text-[13px] text-[#8a8a8e]">
                        검색 결과가 없습니다.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {stores.map((store) => (
                          <MapStoreListItem
                            key={store.id}
                            store={store}
                            metricMode={metricMode}
                            onSelect={() => onSelectStore(store.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="sticky top-0 z-10 flex items-center bg-white px-6 py-2">
                      <button
                        type="button"
                        onClick={onBackToList}
                        aria-label="목록으로 돌아가기"
                        className="flex h-7 w-7 items-center justify-center"
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
                    </div>
                    <StoreDetailContent storeId={selectedStore.id} />
                  </div>
                )}
              </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

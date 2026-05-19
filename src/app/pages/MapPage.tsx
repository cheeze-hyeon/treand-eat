import { useEffect, useMemo, useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import MapCategoryChips from '../components/map/MapCategoryChips';
import MapFloatingControls from '../components/map/MapFloatingControls';
import MapMarkerLayer from '../components/map/MapMarkerLayer';
import MapSearchBar from '../components/map/MapSearchBar';
import MapStoreDetailSheet from '../components/map/MapStoreDetailSheet';
import {
  type DrawerSnap,
  filterMapStores,
  getMapStoreById,
  MAP_STORES,
  type MapMetricMode,
} from '../data/mapStores';
import mapScreenshot from '../../asset/map.png';

export default function MapPage() {
  const [metricMode, setMetricMode] = useState<MapMetricMode>('preference');
  const [category, setCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>('1');
  const [drawerSnap, setDrawerSnap] = useState<DrawerSnap>('peek');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [locationPulse, setLocationPulse] = useState(false);

  const filteredStores = useMemo(
    () => filterMapStores(MAP_STORES, category, searchQuery),
    [category, searchQuery],
  );

  const selectedStore = getMapStoreById(selectedStoreId);

  useEffect(() => {
    if (selectedStoreId && !filteredStores.some((s) => s.id === selectedStoreId)) {
      setSelectedStoreId(null);
      setDrawerSnap('closed');
    }
  }, [filteredStores, selectedStoreId]);

  const handleSelectStore = (id: string) => {
    setSelectedStoreId(id);
    setDrawerSnap('peek');
  };

  const toggleBookmark = () => {
    if (!selectedStoreId) return;
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(selectedStoreId)) {
        next.delete(selectedStoreId);
      } else {
        next.add(selectedStoreId);
      }
      return next;
    });
  };

  const handleCurrentLocation = () => {
    setLocationPulse(true);
    window.setTimeout(() => setLocationPulse(false), 600);
  };

  const isDimmed = drawerSnap === 'expanded';

  return (
    <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <img
          src={mapScreenshot}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-[filter] duration-200 ${
            isDimmed ? 'brightness-[0.55]' : ''
          }`}
        />

        {isDimmed && (
          <div
            className="absolute inset-0 bg-black/20 pointer-events-none z-[15]"
            aria-hidden
          />
        )}

        <div className="absolute inset-x-4 top-6 z-30 flex flex-col gap-2">
          <MapSearchBar value={searchQuery} onChange={setSearchQuery} />
          <MapCategoryChips selected={category} onSelect={setCategory} />
        </div>

        <MapMarkerLayer
          stores={filteredStores}
          metricMode={metricMode}
          selectedStoreId={selectedStoreId}
          onSelectStore={handleSelectStore}
        />

        <div
          className="absolute z-10 pointer-events-none"
          style={{ left: '47%', top: '42%' }}
          aria-hidden
        >
<div className="relative flex items-center justify-center w-10 h-10">
  {/* 바깥쪽 큰 원 */}
  <div className="absolute w-10 h-10 rounded-[20px] bg-[#3a7bd5]/[0.12]" />
  
  {/* 안쪽 작은 원 (그림자 포함) */}
  <div
    className="absolute w-3.5 h-3.5 rounded-[7px] bg-[#3a7bd5] border-[3px] border-white z-10"
    style={{ boxShadow: '0px 2px 8px 0 rgba(58,123,213,0.5)' }}
  />
</div>
        </div>

        <MapFloatingControls
          metricMode={metricMode}
          onMetricModeChange={setMetricMode}
          onCurrentLocation={handleCurrentLocation}
          locationPulse={locationPulse}
          drawerSnap={drawerSnap}
        />

        <MapStoreDetailSheet
          store={selectedStore}
          drawerSnap={drawerSnap}
          onDrawerSnapChange={setDrawerSnap}
          isBookmarked={selectedStoreId != null && bookmarkedIds.has(selectedStoreId)}
          onBookmarkToggle={toggleBookmark}
        />
      </div>

      <BottomNavigation activeTab="map" />
    </div>
  );
}

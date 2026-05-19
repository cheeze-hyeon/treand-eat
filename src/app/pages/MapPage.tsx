import { useEffect, useMemo, useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import MapCategoryChips from '../components/map/MapCategoryChips';
import MapBottomSheet from '../components/map/MapBottomSheet';
import MapFloatingControls from '../components/map/MapFloatingControls';
import MapMarkerLayer from '../components/map/MapMarkerLayer';
import { MAP_FLOATING_CONTROLS_OVERLAP } from '../data/mapLayout';
import MapSearchBar from '../components/map/MapSearchBar';
import {
  filterMapStores,
  getMapStoreById,
  MAP_STORES,
  type MapMetricMode,
} from '../data/mapStores';
import mapScreenshot from '../../asset/map.png';

export default function MapPage() {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [metricMode, setMetricMode] = useState<MapMetricMode>('preference');
  const [category, setCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [locationPulse, setLocationPulse] = useState(false);
  const [snapBlockHeightPx, setSnapBlockHeightPx] = useState(0);

  const filteredStores = useMemo(
    () => filterMapStores(MAP_STORES, category, searchQuery),
    [category, searchQuery],
  );

  const selectedStore = getMapStoreById(selectedStoreId);

  useEffect(() => {
    if (selectedStoreId && !filteredStores.some((s) => s.id === selectedStoreId)) {
      setSelectedStoreId(null);
    }
  }, [filteredStores, selectedStoreId]);

  const handleSelectStore = (id: string) => {
    setSelectedStoreId(id);
  };

  const handleBackToList = () => {
    setSelectedStoreId(null);
  };

  const handleCurrentLocation = () => {
    setLocationPulse(true);
    window.setTimeout(() => setLocationPulse(false), 600);
  };

  return (
    <div className="bg-white h-full w-full min-h-0 flex flex-col overflow-hidden">
      <div ref={setMapContainer} className="flex-1 min-h-0 relative overflow-hidden">
        <img
          src={mapScreenshot}
          alt=""
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />

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
            <div className="absolute w-10 h-10 rounded-[20px] bg-[#3a7bd5]/[0.12]" />
            <div
              className="absolute w-3.5 h-3.5 rounded-[7px] bg-[#3a7bd5] border-[3px] border-white z-10"
              style={{ boxShadow: '0px 2px 8px 0 rgba(58,123,213,0.5)' }}
            />
          </div>
        </div>

        <MapBottomSheet
          container={mapContainer}
          stores={filteredStores}
          selectedStore={selectedStore}
          metricMode={metricMode}
          onSelectStore={handleSelectStore}
          onBackToList={handleBackToList}
          onSnapBlockHeightChange={setSnapBlockHeightPx}
        />

        {snapBlockHeightPx > 0 && !selectedStore ? (
          <div
            className="pointer-events-none absolute inset-x-0 z-[60] mx-auto flex max-w-[393px] items-end justify-between px-[18px]"
            style={{ bottom: snapBlockHeightPx - MAP_FLOATING_CONTROLS_OVERLAP }}
          >
            <MapFloatingControls
              metricMode={metricMode}
              onMetricModeChange={setMetricMode}
              onCurrentLocation={handleCurrentLocation}
              locationPulse={locationPulse}
            />
          </div>
        ) : null}
      </div>

      <BottomNavigation activeTab="map" />
    </div>
  );
}

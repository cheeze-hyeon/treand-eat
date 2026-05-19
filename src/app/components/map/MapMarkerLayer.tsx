import type { MapMetricMode, MapStore } from '../../data/mapStores';
import MapMarker from './MapMarker';

type MapMarkerLayerProps = {
  stores: MapStore[];
  metricMode: MapMetricMode;
  selectedStoreId: string | null;
  onSelectStore: (id: string) => void;
};

export default function MapMarkerLayer({
  stores,
  metricMode,
  selectedStoreId,
  onSelectStore,
}: MapMarkerLayerProps) {
  if (stores.length === 0) {
    return (
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4 py-2 rounded-lg bg-white/90 text-[#665a55] text-sm text-center pointer-events-none">
        주변에 매장이 없어요
      </p>
    );
  }

  return (
    <>
      {stores.map((store) => (
        <MapMarker
          key={store.id}
          store={store}
          metricMode={metricMode}
          isSelected={selectedStoreId === store.id}
          onSelect={onSelectStore}
        />
      ))}
    </>
  );
}

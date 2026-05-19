import { getMapFloatingControlsBottom } from '../../data/mapLayout';
import type { DrawerSnap, MapMetricMode } from '../../data/mapStores';
import MapCurrentLocationButton from './MapCurrentLocationButton';
import MapMetricToggle from './MapMetricToggle';

type MapFloatingControlsProps = {
  metricMode: MapMetricMode;
  onMetricModeChange: (mode: MapMetricMode) => void;
  onCurrentLocation: () => void;
  locationPulse: boolean;
  drawerSnap: DrawerSnap;
};

/** 탭바 바로 위에 고정되는 지표 토글 + 현재 위치 버튼 */
export default function MapFloatingControls({
  metricMode,
  onMetricModeChange,
  onCurrentLocation,
  locationPulse,
  drawerSnap,
}: MapFloatingControlsProps) {
  return (
    <div
      className={`fixed inset-x-0 z-[55] mx-auto flex max-w-[393px] items-end justify-between px-[18px] pointer-events-none transition-[opacity] duration-200 ${
        drawerSnap === 'expanded' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ bottom: getMapFloatingControlsBottom() }}
    >
      <MapMetricToggle mode={metricMode} onChange={onMetricModeChange} />
      <MapCurrentLocationButton onClick={onCurrentLocation} active={locationPulse} />
    </div>
  );
}

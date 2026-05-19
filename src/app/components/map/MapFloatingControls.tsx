import type { MapMetricMode } from '../../data/mapStores';
import MapCurrentLocationButton from './MapCurrentLocationButton';
import MapMetricToggle from './MapMetricToggle';

type MapFloatingControlsProps = {
  metricMode: MapMetricMode;
  onMetricModeChange: (mode: MapMetricMode) => void;
  onCurrentLocation: () => void;
  locationPulse: boolean;
};

/** 드로어 스택 안, 흰 시트 바로 위에 붙는 컨트롤 행 */
export default function MapFloatingControls({
  metricMode,
  onMetricModeChange,
  onCurrentLocation,
  locationPulse,
}: MapFloatingControlsProps) {
  return (
    <div className="flex shrink-0 items-end justify-between pointer-events-auto gap-auto w-full">
      <MapMetricToggle mode={metricMode} onChange={onMetricModeChange} />
      <MapCurrentLocationButton onClick={onCurrentLocation} active={locationPulse} />
    </div>
  );
}

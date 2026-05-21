import type { MapMetricMode } from '../../data/mapStores';

type MapMetricToggleProps = {
  mode: MapMetricMode;
  onChange: (mode: MapMetricMode) => void;
};

export default function MapMetricToggle({ mode, onChange }: MapMetricToggleProps) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg bg-[#f2efe9] pointer-events-auto"
      role="group"
      aria-label="지도 표시 지표"
    >
      <button
        type="button"
        onClick={() => onChange('preference')}
        aria-pressed={mode === 'preference'}
        className={`px-2.5 py-1.5 w-full rounded-md text-[11px] text-nowrap text-center transition-colors ${
          mode === 'preference' ? 'bg-[#2e211c] text-white' : 'text-[#8a8a8e]'
        }`}
      >
전체 트렌딧 지수      </button>
      <button
        type="button"
        onClick={() => onChange('trend')}
        aria-pressed={mode === 'trend'}
        className={`px-2.5 py-1.5 rounded-md text-[11px] text-nowrap text-center transition-colors ${
          mode === 'trend'
            ? 'bg-[#2e211c] text-white'
            : 'text-[#8a8a8e] border-2 border-[#2e211c] bg-transparent'
        }`}
      >
        나와 취향 비슷한 유저 트렌딧 지수
      </button>
    </div>
  );
}

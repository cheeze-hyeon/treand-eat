import {
  formatMarkerLabel,
  type MapMetricMode,
  type MapStore,
} from '../../data/mapStores';

function MapTooltipPointer({ fill }: { fill: string }) {
  return (
    <svg width={10} height={6} viewBox="0 0 10 6" className="flex-shrink-0" aria-hidden>
      <path d="M5 6L0 0h10L5 6z" fill={fill} />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width={40}
      height={50}
      viewBox="0 0 40 50"
      fill="none"
      className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex-shrink-0"
      aria-hidden
    >
      <path
        d="M20 2.01511C18.1403 1.92534 16.2828 2.23621 14.5466 2.92781C12.8103 3.61941 11.2335 4.67651 9.917 6.03145C8.60053 7.38638 7.57344 9.00929 6.90147 10.7963C6.2295 12.5833 5.92746 14.495 6.01469 16.4091C6.01469 20.9432 9.51101 25.4053 11.2592 27.2045C13.0073 29.0038 20 38 20 38C20 38 26.9927 29.0038 28.7408 27.2045C30.489 25.4053 33.9853 20.9432 33.9853 16.4091C34.0725 14.495 33.7705 12.5833 33.0985 10.7963C32.4266 9.00929 31.3995 7.38638 30.083 6.03145C28.7665 4.67651 27.1897 3.61941 25.4534 2.92781C23.7172 2.23621 21.8597 1.92534 20 2.01511ZM20 22.2566C18.8763 22.2566 17.7778 21.9137 16.8435 21.2711C15.9092 20.6286 15.181 19.7153 14.7509 18.6468C14.3209 17.5783 14.2084 16.4026 14.4276 15.2683C14.6469 14.134 15.188 13.092 15.9825 12.2742C16.7771 11.4564 17.7895 10.8995 18.8916 10.6739C19.9937 10.4483 21.1361 10.5641 22.1742 11.0066C23.2124 11.4492 24.0997 12.1987 24.724 13.1603C25.3483 14.122 25.6815 15.2525 25.6815 16.4091C25.6815 17.177 25.5346 17.9374 25.2491 18.6468C24.9635 19.3563 24.545 20.0009 24.0175 20.5439C23.4899 21.0869 22.8635 21.5176 22.1742 21.8115C21.4849 22.1054 20.7461 22.2566 20 22.2566Z"
        fill="#335352"
      />
      <path
        d="M20 38L19.2109 38.6133L20 39.6299L20.7891 38.6133L20 38Z"
        stroke="white"
        strokeWidth={2}
      />
    </svg>
  );
}

type MapMarkerProps = {
  store: MapStore;
  metricMode: MapMetricMode;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export default function MapMarker({ store, metricMode, isSelected, onSelect }: MapMarkerProps) {
  const bubbleBg = isSelected ? '#2e211c' : 'white';
  const nameColor = isSelected ? 'white' : '#2e211c';
  const label = formatMarkerLabel(store, metricMode);

  return (
    <button
      type="button"
      onClick={() => onSelect(store.id)}
      aria-label={`${store.name}, ${label}`}
      aria-pressed={isSelected}
      className="absolute z-20 flex flex-col items-center pointer-events-auto -translate-x-1/2"
      style={{
        left: `${store.position.xPercent}%`,
        top: `${store.position.yPercent}%`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div
        className="flex flex-col items-start px-[9px] py-[5px] rounded-[10px]"
        style={{
          backgroundColor: bubbleBg,
          boxShadow: '0px 3px 12px 0 rgba(0,0,0,0.15)',
        }}
      >
        <p className="text-[13px] text-left whitespace-nowrap" style={{ color: nameColor }}>
          {store.name}
        </p>
        <p className="text-[13px] text-left text-[#9cb8b7] pt-px">{label}</p>
      </div>
      <MapTooltipPointer fill={bubbleBg} />
      <MapPinIcon />
    </button>
  );
}

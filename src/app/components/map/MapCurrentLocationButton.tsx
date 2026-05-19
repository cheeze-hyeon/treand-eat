type MapCurrentLocationButtonProps = {
  onClick: () => void;
  active?: boolean;
};

export default function MapCurrentLocationButton({ onClick, active }: MapCurrentLocationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="현재 위치로 이동"
      className={`flex shrink-0 justify-center items-center w-10 h-10 rounded-xl bg-white border-2 border-[#2e211c] pointer-events-auto transition-shadow ${
        active ? 'ring-2 ring-[#3a7bd5]/40' : ''
      }`}
      style={{ boxShadow: '0px 4px 16px 0 rgba(0,0,0,0.14)' }}
    >
      <svg width={26} height={26} viewBox="0 0 26 26" fill="none" className="w-[26px] h-[26px]" aria-hidden>
        <path
          d="M12.9998 17.3337C15.3931 17.3337 17.3332 15.3936 17.3332 13.0003C17.3332 10.6071 15.3931 8.66699 12.9998 8.66699C10.6066 8.66699 8.6665 10.6071 8.6665 13.0003C8.6665 15.3936 10.6066 17.3337 12.9998 17.3337Z"
          fill="#3A7BD5"
        />
        <path
          d="M12.9998 2.88867V5.77756M12.9998 20.222V23.1109M2.88867 12.9998H5.77756M20.222 12.9998H23.1109"
          stroke="#3A7BD5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M13.0002 22.3891C18.1856 22.3891 22.3891 18.1856 22.3891 13.0002C22.3891 7.81488 18.1856 3.61133 13.0002 3.61133C7.81488 3.61133 3.61133 7.81488 3.61133 13.0002C3.61133 18.1856 7.81488 22.3891 13.0002 22.3891Z"
          stroke="#3A7BD5"
          strokeWidth="1.2"
        />
      </svg>
    </button>
  );
}

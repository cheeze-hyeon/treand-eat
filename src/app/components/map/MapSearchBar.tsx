type MapSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function MapSearchBar({ value, onChange }: MapSearchBarProps) {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-2 pointer-events-auto">
      <label className="sr-only" htmlFor="map-search">
        이 지역에서 검색
      </label>
      <div className="flex justify-start items-center self-stretch h-11 gap-2 px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#2e211c]">
        <input
          id="map-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="이 지역에서 검색"
          className="flex-1 text-[13px] text-[#2e211c] placeholder:text-[#9e9794] bg-transparent outline-none min-w-0"
        />
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="flex-shrink-0 w-4 h-4" aria-hidden>
          <path
            d="M6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5Z"
            stroke="#9E9794"
            strokeWidth="1.6"
          />
          <path d="M10.5 10.5L14 14" stroke="#9E9794" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}


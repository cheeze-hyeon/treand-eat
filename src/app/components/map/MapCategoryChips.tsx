import { MAP_CATEGORIES } from '../../data/mapStores';

type MapCategoryChipsProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export default function MapCategoryChips({ selected, onSelect }: MapCategoryChipsProps) {
  return (
    <div className="self-stretch h-[33px] overflow-x-auto overflow-y-hidden pointer-events-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-2 min-w-max pr-4">
        {MAP_CATEGORIES.map((category) => {
          const isSelected = selected === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              aria-pressed={isSelected}
              className={`flex-shrink-0 h-[31px] px-[13px] py-1.5 rounded-[20px] border-2 text-[13px] whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-[#335352] border-[#2e211c] text-white'
                  : 'bg-white border-[#9e9794] text-[#9e9794]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

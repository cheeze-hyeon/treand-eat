import { useNavigate, useParams } from 'react-router';
import FoodStoreCard, { getStoreListing } from '../components/FoodStoreCard';
import { FOOD_STORES, getFoodById, parseFoodPrice } from '../data/foods';

export default function FoodStoresPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = getFoodById(id);
  const stores = FOOD_STORES[food.id] ?? FOOD_STORES['1'];
  const { amount: priceAmount } = parseFoodPrice(food.price);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-white">
      <div className="sticky top-0 z-10 flex h-[56px] shrink-0 items-center gap-3 border-b border-[#e5e5e5] bg-white px-[18px]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로 가기"
          className="flex h-10 w-10 items-center justify-center"
        >
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M9.9925 15.8209L4.16357 9.99202L9.9925 4.16309"
              stroke="#2E211C"
              strokeWidth="1.66541"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.8214 9.99219H4.16357"
              stroke="#2E211C"
              strokeWidth="1.66541"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-[#1c1c1e]">판매하는 곳</p>
          <p className="truncate text-xs text-[#9e9794]">{food.name}</p>
        </div>
        <p className="shrink-0 text-xs text-[#9e9794]">{stores.length}곳</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[18px] py-4">
        <div className="flex flex-col gap-3">
          {stores.map((store) => {
            const listing = getStoreListing(store, priceAmount);
            return (
              <FoodStoreCard
                key={store.storeId}
                rank={listing.rank}
                name={listing.name}
                waitingTime={listing.waitingTime}
                reviewCount={listing.reviewCount}
                price={listing.price}
                priceDiff={listing.priceDiff}
                location={listing.location}
                clipId={`foodStoresPin-${store.storeId}`}
                fullWidth
                onClick={() => navigate(`/store/${store.storeId}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

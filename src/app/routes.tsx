import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import OpeningPage from "./pages/OpeningPage";
import OnboardingPage from "./pages/OnboardingPage";
import Onboarding2Page from "./pages/Onboarding2Page";
import Onboarding3Page from "./pages/Onboarding3Page";
import Onboarding4Page from "./pages/Onboarding4Page";
import Onboarding5Page from "./pages/Onboarding5Page";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import FollowingListPage from "./pages/FollowingListPage";
import UserProfilePage from "./pages/UserProfilePage";
import FoodsPage from "./pages/FoodsPage";
import MapPage from "./pages/MapPage";
import WriteReviewPage from "./pages/WriteReviewPage";
import FoodDetailPage from "./pages/FoodDetailPage";
import FoodTrendingReviewsPage from "./pages/FoodTrendingReviewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import LikedReviewsPage from "./pages/LikedReviewsPage";
import SavedItemsPage from "./pages/SavedItemsPage";
import StoreDetailPage from "./pages/StoreDetailPage";
import StoreReviewsPage from "./pages/StoreReviewsPage";

export const router = createBrowserRouter([
 {
 path: "/",
 Component: RootLayout,
 children: [
 { index: true, Component: OpeningPage },
 { path: "onboarding", Component: OnboardingPage },
 { path: "onboarding2", Component: Onboarding2Page },
 { path: "onboarding3", Component: Onboarding3Page },
 { path: "onboarding4", Component: Onboarding4Page },
 { path: "onboarding5", Component: Onboarding5Page },
 { path: "home", Component: HomePage },
 { path: "mypage", Component: MyPage },
 { path: "my-reviews", Component: MyReviewsPage },
 { path: "liked-reviews", Component: LikedReviewsPage },
 { path: "saved-items", Component: SavedItemsPage },
 { path: "store/:storeId", Component: StoreDetailPage },
 { path: "store/:storeId/reviews", Component: StoreReviewsPage },
 { path: "following-list", Component: FollowingListPage },
 { path: "profile/:userId", Component: UserProfilePage },
 { path: "foods", Component: FoodsPage },
 { path: "map", Component: MapPage },
 { path: "write-review", Component: WriteReviewPage },
 { path: "food/:id", Component: FoodDetailPage },
 { path: "food/:id/reviews", Component: FoodTrendingReviewsPage },
 { path: "*", Component: NotFoundPage },
 ],
 },
]);

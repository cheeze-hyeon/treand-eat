import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'trendeat_taste_profile_limited';

interface UserPreferencesContextType {
  isTasteProfileLimited: boolean;
  skipOnboardingReview: () => void;
  unlockTasteProfile: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(
  undefined,
);

function readLimitedFromStorage(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeLimitedToStorage(limited: boolean) {
  try {
    if (limited) {
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [isTasteProfileLimited, setIsTasteProfileLimited] = useState(readLimitedFromStorage);

  const skipOnboardingReview = useCallback(() => {
    setIsTasteProfileLimited(true);
    writeLimitedToStorage(true);
  }, []);

  const unlockTasteProfile = useCallback(() => {
    setIsTasteProfileLimited(false);
    writeLimitedToStorage(false);
  }, []);

  const value = useMemo(
    () => ({
      isTasteProfileLimited,
      skipOnboardingReview,
      unlockTasteProfile,
    }),
    [isTasteProfileLimited, skipOnboardingReview, unlockTasteProfile],
  );

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
}

/** 트렌딧 지수·만족할 확률 등 개인화 지표 표시 여부 */
export function usePersonalizedMetrics() {
  const { isTasteProfileLimited } = useUserPreferences();
  return { showPersonalizedMetrics: !isTasteProfileLimited };
}

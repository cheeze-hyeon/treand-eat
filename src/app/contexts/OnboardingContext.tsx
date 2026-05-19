import { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
 selectedDistricts: string[];
 setSelectedDistricts: (districts: string[]) => void;
 selectedTextures: string[];
 setSelectedTextures: (textures: string[]) => void;
 selectedFlavors: string[];
 setSelectedFlavors: (flavors: string[]) => void;
 favoriteFoods: string;
 setFavoriteFoods: (foods: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
 const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
 const [selectedTextures, setSelectedTextures] = useState<string[]>([]);
 const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
 const [favoriteFoods, setFavoriteFoods] = useState<string>('');

 return (
 <OnboardingContext.Provider
 value={{
 selectedDistricts,
 setSelectedDistricts,
 selectedTextures,
 setSelectedTextures,
 selectedFlavors,
 setSelectedFlavors,
 favoriteFoods,
 setFavoriteFoods,
 }}
 >
 {children}
 </OnboardingContext.Provider>
 );
}

export function useOnboarding() {
 const context = useContext(OnboardingContext);
 if (context === undefined) {
 throw new Error('useOnboarding must be used within an OnboardingProvider');
 }
 return context;
}

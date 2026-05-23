import { RouterProvider } from 'react-router';
import { router } from './routes';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';

export default function App() {
 return (
 <UserPreferencesProvider>
 <OnboardingProvider>
 <RouterProvider router={router} />
 </OnboardingProvider>
 </UserPreferencesProvider>
 );
}

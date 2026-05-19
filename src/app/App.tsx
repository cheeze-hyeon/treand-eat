import { RouterProvider } from 'react-router';
import { router } from './routes';
import { OnboardingProvider } from './contexts/OnboardingContext';

export default function App() {
 return (
 <OnboardingProvider>
 <RouterProvider router={router} />
 </OnboardingProvider>
 );
}

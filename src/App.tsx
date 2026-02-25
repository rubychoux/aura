import { BrowserRouter } from 'react-router-dom';
import { ProfileProvider } from '@/store/profile/ProfileContext';
import { AppRouter } from '@/router/AppRouter';

export default function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <AppRouter />
      </ProfileProvider>
    </BrowserRouter>
  );
}
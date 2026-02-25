import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { OnboardingShell } from '@/features/onboarding/components/OnboardingShell';
import { DashboardShell } from '@/features/dashboard/components/DashboardShell';
import { ProtocolShell } from '@/features/protocol/components/ProtocolShell';
import { useProfileContext } from '@/store/profile/ProfileContext';

export function AppRouter() {
  const { isProfileComplete } = useProfileContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isProfileComplete
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/onboarding" replace />
        }
      />
      <Route path="/onboarding" element={<OnboardingShell />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardShell />} />
        <Route path="/protocol" element={<ProtocolShell />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
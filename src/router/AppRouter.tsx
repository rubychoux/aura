import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { OnboardingShell } from '@/features/onboarding/components/OnboardingShell';
import { DashboardShell } from '@/features/dashboard/components/DashboardShell';
import { ProtocolShell } from '@/features/protocol/components/ProtocolShell';
import { ScannerShell } from '@/features/scanner/components/ScannerShell';
import { ProfileView } from '@/features/profile/components/ProfileView';

export function AppRouter() {
  return (
    <Routes>
      {/* Full-page flows (no sidebar) */}
      <Route path="/profile/setup" element={<OnboardingShell />} />

      {/* App shell routes (with sidebar) */}
      <Route element={<AppShell />}>
        <Route path="/" element={<ScannerShell />} />
        <Route path="/scanner" element={<ScannerShell />} />
        <Route path="/dashboard" element={<DashboardShell />} />
        <Route path="/protocol" element={<ProtocolShell />} />
        <Route path="/profile" element={<ProfileView />} />
      </Route>

      {/* Legacy redirect for old onboarding path */}
      <Route path="/onboarding" element={<Navigate to="/profile/setup" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

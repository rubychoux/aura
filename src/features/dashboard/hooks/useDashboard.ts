import { useProfileContext } from '@/store/profile/ProfileContext';
import { useOptimizationEngine } from '@/hooks/useOptimizationEngine';

export function useDashboard() {
  const { profile } = useProfileContext();
  const { score, protocol, isReady } = useOptimizationEngine(profile);

  return { profile, score, protocol, isReady };
}
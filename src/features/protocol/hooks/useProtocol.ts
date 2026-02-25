import { useProfileContext } from '@/store/profile/ProfileContext';
import { useOptimizationEngine } from '@/hooks/useOptimizationEngine';

export function useProtocol() {
  const { profile } = useProfileContext();
  const { protocol, isReady } = useOptimizationEngine(profile);

  return { protocol, isReady, profile };
}
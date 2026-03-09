import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { PartialProfile } from '@/types';
import type { ProfileAction } from './profile.actions';
import { profileReducer, DEFAULT_PROFILE } from './profile.reducer';

interface ProfileContextValue {
  profile: PartialProfile;
  dispatch: React.Dispatch<ProfileAction>;
  isProfileComplete: boolean;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

const STORAGE_KEY = 'aura_profile_v1';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, dispatch] = useReducer(
    profileReducer,
    DEFAULT_PROFILE,
    (initial) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? { ...initial, ...JSON.parse(stored) } : initial;
      } catch {
        return initial;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const isProfileComplete = Boolean(
    profile.skinType &&
    profile.climate &&
    profile.sleepHours &&
    profile.stressLevel &&
    profile.goals?.length
  );

  return (
    <ProfileContext.Provider value={{ profile, dispatch, isProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfileContext must be used within ProfileProvider');
  return ctx;
}
import type { PartialProfile, UserProfile } from '@/types';

export const PROFILE_ACTIONS = {
  UPDATE_FIELD: 'PROFILE/UPDATE_FIELD',
  SET_PROFILE: 'PROFILE/SET_PROFILE',
  RESET: 'PROFILE/RESET',
} as const;

export type ProfileAction =
  | { type: typeof PROFILE_ACTIONS.UPDATE_FIELD; payload: PartialProfile }
  | { type: typeof PROFILE_ACTIONS.SET_PROFILE; payload: UserProfile }
  | { type: typeof PROFILE_ACTIONS.RESET };
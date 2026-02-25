import type { PartialProfile } from '@/types';
import type { ProfileAction } from './profile.actions';
import { PROFILE_ACTIONS } from './profile.actions';

export const DEFAULT_PROFILE: PartialProfile = {
  sleepHours: 7,
  stressLevel: 3,
  workoutFrequency: 3,
  dietType: 'omnivore',
  waterIntakeLiters: 2,
  goals: [],
  biometrics: null,
};

export function profileReducer(
  state: PartialProfile,
  action: ProfileAction
): PartialProfile {
  switch (action.type) {
    case PROFILE_ACTIONS.UPDATE_FIELD:
      return { ...state, ...action.payload };
    case PROFILE_ACTIONS.SET_PROFILE:
      return action.payload;
    case PROFILE_ACTIONS.RESET:
      return DEFAULT_PROFILE;
    default:
      return state;
  }
}
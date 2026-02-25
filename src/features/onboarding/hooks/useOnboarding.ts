import { useState, useCallback, useMemo } from 'react';
import type { PartialProfile } from '@/types';
import { useProfileContext } from '@/store/profile/ProfileContext';
import { PROFILE_ACTIONS } from '@/store/profile/profile.actions';
import { ONBOARDING_STEPS, type OnboardingStepId } from '@/utils/constants';

export function useOnboarding() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { dispatch, profile } = useProfileContext();

  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const totalSteps = ONBOARDING_STEPS.length;
  const progress = Math.round((currentStepIndex / (totalSteps - 1)) * 100);

  const updateProfile = useCallback((data: PartialProfile) => {
    dispatch({ type: PROFILE_ACTIONS.UPDATE_FIELD, payload: data });
  }, [dispatch]);

  const canGoNext = useMemo(() => {
    switch (currentStep) {
      case 'skin': return Boolean(profile.skinType && profile.climate);
      case 'lifestyle': return Boolean(
        profile.sleepHours &&
        profile.stressLevel &&
        profile.waterIntakeLiters
      );
      case 'fitness': return profile.workoutFrequency !== undefined;
      case 'goals': return Boolean(profile.goals?.length);
      case 'review': return true;
      default: return false;
    }
  }, [currentStep, profile]);

  const goNext = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(i => i + 1);
    }
  }, [currentStepIndex, totalSteps]);

  const goPrev = useCallback(() => {
    if (currentStepIndex > 0) setCurrentStepIndex(i => i - 1);
  }, [currentStepIndex]);

  const goToStep = useCallback((step: OnboardingStepId) => {
    const idx = ONBOARDING_STEPS.indexOf(step);
    if (idx !== -1) setCurrentStepIndex(idx);
  }, []);

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    goNext,
    goPrev,
    goToStep,
    updateProfile,
    canGoNext,
    profile,
  };
}
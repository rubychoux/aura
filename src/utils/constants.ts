import type { SkinType, Climate, DietType, OptimizationGoal } from '@/types';

export const SKIN_TYPES: { value: SkinType; label: string; description: string }[] = [
  { value: 'oily', label: 'Oily', description: 'Excess sebum, prone to shine and breakouts' },
  { value: 'dry', label: 'Dry', description: 'Tight, flaky, lacks moisture' },
  { value: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
  { value: 'normal', label: 'Normal', description: 'Balanced, minimal issues' },
  { value: 'sensitive', label: 'Sensitive', description: 'Reactive, easily irritated' },
];

export const CLIMATES: { value: Climate; label: string; emoji: string }[] = [
  { value: 'humid', label: 'Humid', emoji: '💧' },
  { value: 'dry', label: 'Dry', emoji: '🏜️' },
  { value: 'temperate', label: 'Temperate', emoji: '🌤️' },
  { value: 'cold', label: 'Cold', emoji: '❄️' },
  { value: 'tropical', label: 'Tropical', emoji: '🌴' },
];

export const DIET_TYPES: { value: DietType; label: string }[] = [
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'keto', label: 'Keto' },
  { value: 'omnivore', label: 'Omnivore' },
];

export const OPTIMIZATION_GOALS: { value: OptimizationGoal; label: string; emoji: string }[] = [
  { value: 'glow', label: 'Skin Glow', emoji: '✨' },
  { value: 'acne_reduction', label: 'Acne Reduction', emoji: '🎯' },
  { value: 'anti_aging', label: 'Anti-Aging', emoji: '⏳' },
  { value: 'fat_loss', label: 'Fat Loss', emoji: '🔥' },
  { value: 'muscle_tone', label: 'Muscle Tone', emoji: '💪' },
  { value: 'energy_optimization', label: 'Energy', emoji: '⚡' },
  { value: 'sleep_quality', label: 'Sleep Quality', emoji: '🌙' },
  { value: 'stress_reduction', label: 'Stress Reduction', emoji: '🧘' },
];

export const ONBOARDING_STEPS = ['skin', 'lifestyle', 'fitness', 'goals', 'review'] as const;
export type OnboardingStepId = typeof ONBOARDING_STEPS[number];
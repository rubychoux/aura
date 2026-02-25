export type SkinType = 'oily' | 'dry' | 'combination' | 'normal' | 'sensitive';
export type Climate = 'humid' | 'dry' | 'temperate' | 'cold' | 'tropical';
export type DietType = 'omnivore' | 'vegetarian' | 'vegan' | 'keto' | 'mediterranean';
export type StressLevel = 1 | 2 | 3 | 4 | 5;
export type WorkoutFrequency = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type OptimizationGoal =
  | 'glow'
  | 'acne_reduction'
  | 'anti_aging'
  | 'fat_loss'
  | 'muscle_tone'
  | 'energy_optimization'
  | 'sleep_quality'
  | 'stress_reduction';

export interface Biometrics {
  heightCm: number;
  weightKg: number;
  age: number;
  biologicalSex: 'male' | 'female' | 'other';
}

export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  skinType: SkinType;
  climate: Climate;
  sleepHours: number;
  stressLevel: StressLevel;
  workoutFrequency: WorkoutFrequency;
  dietType: DietType;
  waterIntakeLiters: number;
  goals: OptimizationGoal[];
  biometrics: Biometrics | null;
}

export type PartialProfile = Partial<UserProfile>;
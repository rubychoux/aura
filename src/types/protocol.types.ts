import type { OptimizationGoal } from './profile.types';

export type TimeOfDay = 'morning' | 'midday' | 'evening' | 'night';

export interface RoutineStep {
  id: string;
  timeOfDay: TimeOfDay;
  title: string;
  description: string;
  durationMinutes: number;
  category: 'skincare' | 'fitness' | 'nutrition' | 'mindfulness' | 'sleep';
  priority: 'essential' | 'recommended' | 'optional';
  goalAlignment: OptimizationGoal[];
}

export interface ProductCategory {
  id: string;
  category: string;
  purpose: string;
  relevanceScore: number;
  frequency: string;
  rationale: string;
}

export interface ProtocolInsight {
  type: 'warning' | 'tip' | 'achievement' | 'priority';
  title: string;
  body: string;
  relatedGoals: OptimizationGoal[];
}

export interface OptimizationProtocol {
  userId: string;
  generatedAt: string;
  dailyRoutine: RoutineStep[];
  weeklySchedule: Record<string, RoutineStep[]>;
  productStack: ProductCategory[];
  insights: ProtocolInsight[];
}
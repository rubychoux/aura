import type { UserProfile } from '@/types';
import type { RoutineStep } from '@/types/protocol.types';

let idCounter = 0;
const genId = () => `step_${++idCounter}_${Date.now()}`;

const TIME_ORDER: Record<string, number> = { morning: 0, midday: 1, evening: 2, night: 3 };

export function generateDailyRoutine(profile: UserProfile): RoutineStep[] {
  const steps: RoutineStep[] = [];

  // Morning hydration — always included
  steps.push({
    id: genId(),
    timeOfDay: 'morning',
    title: 'Hydration Protocol',
    description: `Start with ${profile.waterIntakeLiters < 2 ? '500ml' : '300ml'} of water. Your current daily intake requires front-loading in the morning.`,
    durationMinutes: 5,
    category: 'nutrition',
    priority: 'essential',
    goalAlignment: ['glow', 'energy_optimization'],
  });

  // AM skincare
  steps.push({
    id: genId(),
    timeOfDay: 'morning',
    title: 'AM Skin Protocol',
    description: buildSkinDescription(profile, 'morning'),
    durationMinutes: 8,
    category: 'skincare',
    priority: 'essential',
    goalAlignment: ['glow', 'acne_reduction'],
  });

  // Morning fitness
  if (profile.workoutFrequency >= 3) {
    steps.push({
      id: genId(),
      timeOfDay: 'morning',
      title: 'Morning Activation',
      description: `10-minute mobility warmup before your ${profile.goals.includes('muscle_tone') ? 'resistance' : 'cardio'} session.`,
      durationMinutes: 10,
      category: 'fitness',
      priority: 'recommended',
      goalAlignment: ['fat_loss', 'muscle_tone', 'energy_optimization'],
    });
  }

  // Midday check
  if (profile.stressLevel >= 3) {
    steps.push({
      id: genId(),
      timeOfDay: 'midday',
      title: 'Stress Reset',
      description: '5-minute box breathing or walk. Cortisol peaks midday — a brief reset prevents afternoon energy crashes.',
      durationMinutes: 5,
      category: 'mindfulness',
      priority: profile.stressLevel >= 4 ? 'essential' : 'recommended',
      goalAlignment: ['stress_reduction', 'energy_optimization'],
    });
  }

  // PM skincare
  steps.push({
    id: genId(),
    timeOfDay: 'evening',
    title: 'PM Skin Protocol',
    description: buildSkinDescription(profile, 'evening'),
    durationMinutes: 12,
    category: 'skincare',
    priority: 'essential',
    goalAlignment: ['glow', 'acne_reduction', 'anti_aging'],
  });

  // Sleep optimization
  if (profile.sleepHours < 7 || profile.stressLevel >= 3) {
    steps.push({
      id: genId(),
      timeOfDay: 'night',
      title: 'Sleep Optimization Protocol',
      description: 'Dim lights 60 min before bed. Screen cutoff 45 min before sleep. Magnesium glycinate 30 min before target sleep time.',
      durationMinutes: 20,
      category: 'sleep',
      priority: profile.sleepHours < 6 ? 'essential' : 'recommended',
      goalAlignment: ['sleep_quality', 'stress_reduction', 'glow'],
    });
  }

  return steps.sort((a, b) => TIME_ORDER[a.timeOfDay] - TIME_ORDER[b.timeOfDay]);
}

function buildSkinDescription(profile: UserProfile, time: 'morning' | 'evening'): string {
  const protocols: Record<string, Record<string, string>> = {
    oily: {
      morning: 'Gentle foaming cleanser → niacinamide toner → lightweight SPF moisturizer.',
      evening: 'Double cleanse → BHA exfoliant (3x/week) → oil-control serum → gel moisturizer.',
    },
    dry: {
      morning: 'Cream cleanser → hyaluronic acid serum → rich SPF moisturizer.',
      evening: 'Oil cleanse → ceramide essence → retinol (2x/week) → occlusive night cream.',
    },
    combination: {
      morning: 'Balancing cleanser → hydrating toner → zone-specific moisturizer → SPF.',
      evening: 'Micellar cleanse → niacinamide serum → lightweight moisturizer.',
    },
    sensitive: {
      morning: 'Micellar water → centella serum → mineral SPF moisturizer.',
      evening: 'Gentle cleanse → barrier repair serum → fragrance-free cream.',
    },
    normal: {
      morning: 'Balanced cleanser → antioxidant serum → SPF moisturizer.',
      evening: 'Double cleanse → treatment serum → balanced moisturizer.',
    },
  };

  return protocols[profile.skinType]?.[time] ?? 'Personalized protocol generating...';
}

export function buildWeeklySchedule(
  dailyRoutine: RoutineStep[],
  profile: UserProfile
): Record<string, RoutineStep[]> {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const workoutDays = days.slice(0, profile.workoutFrequency);

  return days.reduce((acc, day) => {
    acc[day] = dailyRoutine.filter(step => {
      if (step.category === 'fitness') return workoutDays.includes(day);
      return true;
    });
    return acc;
  }, {} as Record<string, RoutineStep[]>);
}
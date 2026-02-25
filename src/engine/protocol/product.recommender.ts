import type { UserProfile } from '@/types';
import type { ProductCategory } from '@/types/protocol.types';

let idCounter = 0;
const genId = () => `product_${++idCounter}_${Date.now()}`;

export function recommendProductStack(profile: UserProfile): ProductCategory[] {
  const stack: ProductCategory[] = [];

  // SPF — always
  stack.push({
    id: genId(),
    category: profile.climate === 'tropical' || profile.climate === 'humid'
      ? 'Water-Resistant SPF 50+'
      : 'Broad-Spectrum SPF 30+',
    purpose: 'UV protection — the single highest ROI skincare intervention.',
    relevanceScore: 100,
    frequency: 'Daily AM',
    rationale: 'UV exposure is the primary accelerant of skin aging regardless of skin type or goals.',
  });

  // Hydration
  if (profile.waterIntakeLiters < 2 || profile.skinType === 'dry' || profile.skinType === 'sensitive') {
    stack.push({
      id: genId(),
      category: 'Hyaluronic Acid Serum (Multi-Weight)',
      purpose: 'Topical hydration support.',
      relevanceScore: profile.skinType === 'dry' ? 95 : 75,
      frequency: 'Daily AM + PM',
      rationale: `${profile.skinType} skin type combined with ${profile.waterIntakeLiters}L daily intake creates a topical hydration deficit.`,
    });
  }

  // Stress support
  if (profile.stressLevel >= 3) {
    stack.push({
      id: genId(),
      category: 'Adaptogen Complex (Ashwagandha / Rhodiola)',
      purpose: 'Cortisol modulation — impacts skin, sleep, and recovery systemically.',
      relevanceScore: Math.round(profile.stressLevel * 18),
      frequency: 'Daily with morning meal',
      rationale: `Stress level ${profile.stressLevel}/5 indicates cortisol elevation affecting skin barrier, sleep depth, and metabolism.`,
    });
  }

  // Fitness recovery
  if (profile.workoutFrequency >= 3) {
    stack.push({
      id: genId(),
      category: 'Magnesium Glycinate',
      purpose: 'Sleep quality, muscle recovery, cortisol regulation.',
      relevanceScore: 85,
      frequency: 'Nightly, 30 min before sleep',
      rationale: 'High training frequency depletes magnesium — this closes the loop between fitness output and recovery quality.',
    });
  }

  // Anti-aging
  if (profile.goals.includes('anti_aging')) {
    stack.push({
      id: genId(),
      category: 'Retinol / Retinoid (0.025% start)',
      purpose: 'Collagen synthesis, cell turnover optimization.',
      relevanceScore: 90,
      frequency: '2–3x weekly PM',
      rationale: 'Gold-standard anti-aging intervention with the deepest evidence base — buffer with moisturizer to minimize irritation.',
    });
  }

  // Acne support
  if (profile.goals.includes('acne_reduction') || profile.skinType === 'oily') {
    stack.push({
      id: genId(),
      category: 'Niacinamide Serum (10%)',
      purpose: 'Sebum regulation, pore minimization, barrier support.',
      relevanceScore: 88,
      frequency: 'Daily AM + PM',
      rationale: 'Niacinamide addresses sebum overproduction and inflammation without disrupting the skin barrier.',
    });
  }

  return stack.sort((a, b) => b.relevanceScore - a.relevanceScore);
}
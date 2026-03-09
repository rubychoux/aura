import { useState } from 'react';
import type { SkinType, Climate, OptimizationGoal } from '@/types';
import type { PartialProfile } from '@/types';

interface Props {
  onComplete: (profile: PartialProfile) => void;
  onDismiss: () => void;
}

const SKIN_TYPES: { value: SkinType; label: string; desc: string }[] = [
  { value: 'oily', label: 'Oily', desc: 'Shiny, enlarged pores' },
  { value: 'dry', label: 'Dry', desc: 'Tight, flaky, dull' },
  { value: 'combination', label: 'Combo', desc: 'Oily T-zone, dry cheeks' },
  { value: 'sensitive', label: 'Sensitive', desc: 'Reacts easily, redness' },
  { value: 'normal', label: 'Normal', desc: 'Balanced, few concerns' },
];

const CONCERNS: { value: OptimizationGoal; label: string; emoji: string }[] = [
  { value: 'glow', label: 'Glow & Radiance', emoji: '✦' },
  { value: 'acne_reduction', label: 'Acne & Breakouts', emoji: '◎' },
  { value: 'anti_aging', label: 'Anti-Aging', emoji: '◈' },
  { value: 'stress_reduction', label: 'Sensitivity & Calm', emoji: '○' },
];

const CLIMATES: { value: Climate; label: string }[] = [
  { value: 'humid', label: 'Humid' },
  { value: 'dry', label: 'Dry' },
  { value: 'temperate', label: 'Temperate' },
  { value: 'cold', label: 'Cold' },
  { value: 'tropical', label: 'Tropical' },
];

export function MiniProfile({ onComplete, onDismiss }: Props) {
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [concern, setConcern] = useState<OptimizationGoal | null>(null);
  const [climate, setClimate] = useState<Climate | null>(null);

  const canSubmit = skinType && concern && climate;

  const handleSubmit = () => {
    if (!skinType || !concern || !climate) return;
    onComplete({
      skinType,
      climate,
      goals: [concern],
    });
  };

  return (
    <div className="bg-blush-50 border border-blush-200 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-medium text-blush-500 uppercase tracking-widest mb-1">
          Personalize your results
        </p>
        <h3 className="font-display text-lg font-light text-warm-900">
          One quick thing — tell us about your skin
        </h3>
        <p className="text-sm text-warm-500 mt-1">
          20 seconds. Saves to your profile for future scans.
        </p>
      </div>

      {/* Q1: Skin type */}
      <div>
        <p className="text-xs font-medium text-warm-500 mb-2">What's your skin type?</p>
        <div className="flex flex-wrap gap-2">
          {SKIN_TYPES.map((st) => (
            <button
              key={st.value}
              onClick={() => setSkinType(st.value)}
              className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                skinType === st.value
                  ? 'bg-warm-900 text-white border-warm-900'
                  : 'bg-white text-warm-600 border-cream-300 hover:border-cream-400'
              }`}
            >
              <span className="font-medium">{st.label}</span>
              <span className={`block text-xs mt-0.5 ${skinType === st.value ? 'text-white/70' : 'text-warm-400'}`}>
                {st.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Main concern */}
      <div>
        <p className="text-xs font-medium text-warm-500 mb-2">Your main skin concern?</p>
        <div className="grid grid-cols-2 gap-2">
          {CONCERNS.map((c) => (
            <button
              key={c.value}
              onClick={() => setConcern(c.value)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all text-left ${
                concern === c.value
                  ? 'bg-warm-900 text-white border-warm-900'
                  : 'bg-white text-warm-600 border-cream-300 hover:border-cream-400'
              }`}
            >
              <span>{c.emoji}</span>
              <span className="font-medium">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Q3: Climate */}
      <div>
        <p className="text-xs font-medium text-warm-500 mb-2">Your climate?</p>
        <div className="flex flex-wrap gap-2">
          {CLIMATES.map((cl) => (
            <button
              key={cl.value}
              onClick={() => setClimate(cl.value)}
              className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                climate === cl.value
                  ? 'bg-warm-900 text-white border-warm-900'
                  : 'bg-white text-warm-600 border-cream-300 hover:border-cream-400'
              }`}
            >
              {cl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex-1 py-3 bg-warm-900 text-white text-sm font-medium rounded-xl hover:bg-warm-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Personalize my results
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-3 text-warm-400 text-sm hover:text-warm-600 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

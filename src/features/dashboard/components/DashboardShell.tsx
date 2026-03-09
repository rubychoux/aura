import { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { OptimizationScoreCard } from './OptimizationScoreCard';
import { CategoryScoreGrid } from './CategoryScoreGrid';
import { InsightsFeed } from './InsightsFeed';
import { WhatIfSimulator } from './WhatIfSimulator';
import { formatGoal } from '@/utils/format';

type Tab = 'dashboard' | 'simulator';

export function DashboardShell() {
  const { profile, score, isReady } = useDashboard();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!isReady || !score) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 pt-8">
        <div>
          <h1 className="font-display text-2xl font-light text-warm-900">Optimization Dashboard</h1>
          <p className="text-warm-400 text-sm mt-1">Your personalized health and skin scores, live.</p>
        </div>
        <div className="bg-white border border-cream-200 rounded-2xl p-10 shadow-soft text-center space-y-6">
          <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl text-warm-500">◎</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-light text-warm-900 mb-2">
              Your dashboard lives here
            </h2>
            <p className="text-warm-500 text-sm leading-relaxed max-w-sm mx-auto">
              Complete your skin profile to unlock your personalized optimization score — sleep, stress, fitness, and skin health all in one view.
            </p>
          </div>
          <a
            href="/profile/setup"
            className="inline-block px-8 py-3 bg-warm-900 text-white text-sm font-medium rounded-xl hover:bg-warm-800 transition-colors"
          >
            Set up my profile →
          </a>
          <p className="text-xs text-warm-400">Takes about 2 minutes · Saves automatically</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-light text-warm-900">Your Optimization Dashboard</h1>
          <p className="text-warm-400 text-sm mt-1">
            Based on your profile — updated in real time as you adjust inputs.
          </p>
        </div>
      </div>

      {/* Goals */}
      {profile.goals && profile.goals.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {profile.goals.map(goal => (
            <span
              key={goal}
              className="px-3 py-1 bg-blush-50 border border-blush-200 text-blush-600 text-xs rounded-full font-medium"
            >
              {formatGoal(goal)}
            </span>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-100 border border-cream-300 rounded-xl p-1 w-fit">
        {([
          { id: 'dashboard', label: '✦ Dashboard' },
          { id: 'simulator', label: '◎ What If Simulator' },
        ] as { id: Tab; label: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-warm-900 text-white'
                : 'text-warm-500 hover:text-warm-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* Score + Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <OptimizationScoreCard score={score} />
            </div>
            <div className="lg:col-span-2">
              <InsightsFeed categories={score.categories} profile={profile} />
            </div>
          </div>

          {/* Category Breakdown */}
          <div>
            <h2 className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-4">
              Category Breakdown
            </h2>
            <CategoryScoreGrid categories={score.categories} />
          </div>
        </>
      )}

      {activeTab === 'simulator' && (
        <WhatIfSimulator baseProfile={profile} baseScore={score.composite} />
      )}
    </div>
  );
}
import { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { OptimizationScoreCard } from './OptimizationScoreCard';
import { CategoryScoreGrid } from './CategoryScoreGrid';
import { InsightsFeed } from './InsightsFeed';
import { WhatIfSimulator } from './WhatIfSimulator';
import { formatGoal } from '@/utils/format';

type Tab = 'dashboard' | 'simulator';

export function DashboardShell() {
  const { profile, score, protocol, isReady } = useDashboard();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!isReady || !score) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-zinc-500">Complete your profile to see your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Optimization Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-1">
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
              className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs rounded-full font-medium"
            >
              {formatGoal(goal)}
            </span>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit">
        {([
          { id: 'dashboard', label: '⚡ Dashboard' },
          { id: 'simulator', label: '🧪 What If Simulator' },
        ] as { id: Tab; label: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-violet-600 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
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
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">
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
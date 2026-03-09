import { useState } from 'react';
import { useProtocol } from '../hooks/useProtocol';
import { DailyRoutineCard } from './DailyRoutineCard';
import { ProductStackPanel } from './ProductStackPanel';
import { cn } from '@/utils/cn';

type Tab = 'routine' | 'products';

export function ProtocolShell() {
  const { protocol, isReady } = useProtocol();
  const [activeTab, setActiveTab] = useState<Tab>('routine');

  if (!isReady || !protocol) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 pt-8">
        <div>
          <h1 className="font-display text-2xl font-light text-warm-900">My Protocol</h1>
          <p className="text-warm-400 text-sm mt-1">Your personalized daily routine and product stack.</p>
        </div>
        <div className="bg-white border border-cream-200 rounded-2xl p-10 shadow-soft text-center space-y-6">
          <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl text-warm-500">◈</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-light text-warm-900 mb-2">
              Your protocol is waiting
            </h2>
            <p className="text-warm-500 text-sm leading-relaxed max-w-sm mx-auto">
              Complete your skin profile and we'll generate a personalized daily routine and curated product stack tailored to your goals.
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
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-light text-warm-900">Your Optimization Protocol</h1>
        <p className="text-warm-400 text-sm mt-1">
          Generated {new Date(protocol.generatedAt).toLocaleDateString()} · Personalized to your profile
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-100 border border-cream-300 rounded-xl p-1 w-fit">
        {(['routine', 'products'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 capitalize',
              activeTab === tab
                ? 'bg-warm-900 text-white'
                : 'text-warm-500 hover:text-warm-800'
            )}
          >
            {tab === 'routine' ? 'Daily Routine' : 'Product Stack'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'routine' && (
        <DailyRoutineCard steps={protocol.dailyRoutine} />
      )}
      {activeTab === 'products' && (
        <ProductStackPanel products={protocol.productStack} />
      )}
    </div>
  );
}
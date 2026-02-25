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
      <div className="flex items-center justify-center h-96">
        <p className="text-zinc-500">Complete your profile to generate your protocol.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Your Optimization Protocol</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Generated {new Date(protocol.generatedAt).toLocaleDateString()} · Personalized to your profile
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 w-fit">
        {(['routine', 'products'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150 capitalize',
              activeTab === tab
                ? 'bg-violet-600 text-white'
                : 'text-zinc-400 hover:text-zinc-200'
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
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { IngredientInput } from './IngredientInput';
import { AnalysisResult } from './AnalysisResult';
import { SkinTypeExplorer } from './SkinTypeExplorer';
import { MiniProfile } from './MiniProfile';
import { useScanner } from '../hooks/useScanner';
import { useProfileContext } from '@/store/profile/ProfileContext';
import { PROFILE_ACTIONS } from '@/store/profile/profile.actions';
import type { PartialProfile } from '@/types';

type Tab = 'scan' | 'explore';

export function ScannerShell() {
  const [activeTab, setActiveTab] = useState<Tab>('scan');
  const [miniProfileDismissed, setMiniProfileDismissed] = useState(false);
  const { dispatch } = useProfileContext();
  const {
    rawInput,
    result,
    isAnalyzing,
    error,
    estimatedIngredientCount,
    setRawInput,
    analyze,
    reanalyzeWithProfile,
    reset,
  } = useScanner();

  const handleMiniProfileComplete = (miniProfileData: PartialProfile) => {
    // Save to ProfileContext (persists to localStorage)
    dispatch({ type: PROFILE_ACTIONS.UPDATE_FIELD, payload: miniProfileData });
    // Re-run analysis with the new profile data immediately
    reanalyzeWithProfile(miniProfileData);
  };

  const showMiniProfile =
    result !== null &&
    !result.isPersonalized &&
    !miniProfileDismissed;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-light text-warm-900">Ingredient Scanner</h1>
        <p className="text-warm-400 text-sm mt-1">
          Paste any product's ingredient list for an instant compatibility check
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-100 border border-cream-300 rounded-xl p-1 w-fit">
        {(['scan', 'explore'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
              activeTab === tab
                ? 'bg-warm-900 text-white'
                : 'text-warm-500 hover:text-warm-800',
            )}
          >
            {tab === 'scan' ? 'Scan Product' : 'Browse by Skin Type'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'scan' && (
        <div className="space-y-6">
          {result ? (
            <>
              <AnalysisResult result={result} onReset={() => { reset(); setMiniProfileDismissed(false); }} />
              {showMiniProfile && (
                <MiniProfile
                  onComplete={handleMiniProfileComplete}
                  onDismiss={() => setMiniProfileDismissed(true)}
                />
              )}
            </>
          ) : (
            <div className="bg-white border border-cream-200 rounded-2xl p-6 shadow-soft">
              <IngredientInput
                rawInput={rawInput}
                estimatedIngredientCount={estimatedIngredientCount}
                isAnalyzing={isAnalyzing}
                error={error}
                onChange={setRawInput}
                onAnalyze={analyze}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'explore' && <SkinTypeExplorer />}
    </div>
  );
}

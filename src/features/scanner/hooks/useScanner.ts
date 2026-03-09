import { useState, useCallback } from 'react';
import { useProfileContext } from '@/store/profile/ProfileContext';
import {
  parseIngredientList,
  matchIngredients,
  analyzeCompatibility,
} from '@/engine/ingredients/ingredient.analyzer';
import type { IngredientAnalysisResult } from '@/engine/ingredients/ingredient.analyzer';
import type { PartialProfile } from '@/types';

interface ScannerState {
  rawInput: string;
  result: IngredientAnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
}

export function useScanner() {
  const { profile } = useProfileContext();
  const [state, setState] = useState<ScannerState>({
    rawInput: '',
    result: null,
    isAnalyzing: false,
    error: null,
  });

  const setRawInput = useCallback((rawInput: string) => {
    setState((prev) => ({ ...prev, rawInput, error: null }));
  }, []);

  const runAnalysis = useCallback(
    (rawInput: string, overrideProfile?: PartialProfile) => {
      if (!rawInput.trim()) {
        setState((prev) => ({ ...prev, error: 'Please paste an ingredient list.' }));
        return;
      }

      setState((prev) => ({ ...prev, isAnalyzing: true, error: null }));

      setTimeout(() => {
        const parsed = parseIngredientList(rawInput);
        const { matched, unmatched } = matchIngredients(parsed);
        // Use override profile (e.g. from MiniProfile) or fall back to context profile
        const effectiveProfile = overrideProfile ?? (profile?.skinType ? profile : null);
        const result = analyzeCompatibility(matched, effectiveProfile, unmatched);
        setState((prev) => ({ ...prev, result, isAnalyzing: false }));
      }, 400);
    },
    [profile],
  );

  const analyze = useCallback(() => {
    runAnalysis(state.rawInput);
  }, [runAnalysis, state.rawInput]);

  const reanalyzeWithProfile = useCallback(
    (miniProfile: PartialProfile) => {
      runAnalysis(state.rawInput, miniProfile);
    },
    [runAnalysis, state.rawInput],
  );

  const reset = useCallback(() => {
    setState({ rawInput: '', result: null, isAnalyzing: false, error: null });
  }, []);

  const estimatedIngredientCount = state.rawInput.trim()
    ? state.rawInput.split(/[,\n\/;]+/).filter((s) => s.trim().length > 1).length
    : 0;

  return {
    rawInput: state.rawInput,
    result: state.result,
    isAnalyzing: state.isAnalyzing,
    error: state.error,
    estimatedIngredientCount,
    setRawInput,
    analyze,
    reanalyzeWithProfile,
    reset,
  };
}

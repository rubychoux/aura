import { INGREDIENTS, INGREDIENT_ALIASES } from '@/data/ingredients';
import type { Ingredient } from '@/data/ingredients';
import type { PartialProfile, SkinType } from '@/types';

// ─── Result Types ─────────────────────────────────────────────────────────────

export interface FlaggedIngredient {
  ingredient: Ingredient;
  reason: string;
  severity: 'warning' | 'caution';
}

export interface BeneficialIngredient {
  ingredient: Ingredient;
  reason: string;
}

export interface IngredientAnalysisResult {
  overallScore: number;
  verdict: 'great_match' | 'use_caution' | 'not_recommended';
  flagged: FlaggedIngredient[];
  beneficial: BeneficialIngredient[];
  matched: Ingredient[];
  unmatched: string[];
  summary: string;
  matchRate: number;
  isPersonalized: boolean;
}

// ─── Parse ────────────────────────────────────────────────────────────────────

/**
 * Parses a raw ingredient list string (comma, newline, or slash separated)
 * into a normalized array of ingredient name strings.
 */
export function parseIngredientList(rawText: string): string[] {
  return rawText
    .split(/[,\n\/;]+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 1);
}

// ─── Match ────────────────────────────────────────────────────────────────────

function normalizeForMatch(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Matches parsed ingredient name strings against the INGREDIENTS database.
 * Returns matched Ingredient objects and unmatched raw strings.
 */
export function matchIngredients(parsed: string[]): {
  matched: Ingredient[];
  unmatched: string[];
} {
  const matched: Ingredient[] = [];
  const unmatched: string[] = [];
  const seenIds = new Set<string>();

  for (const raw of parsed) {
    const normalized = normalizeForMatch(raw);

    // Try alias map first
    const aliasId = INGREDIENT_ALIASES[normalized];
    if (aliasId) {
      const ing = INGREDIENTS.find((i) => i.id === aliasId);
      if (ing && !seenIds.has(ing.id)) {
        matched.push(ing);
        seenIds.add(ing.id);
        continue;
      }
    }

    // Try direct match against inci_name, english_name, id
    const directMatch = INGREDIENTS.find((i) => {
      if (seenIds.has(i.id)) return false;
      return (
        normalizeForMatch(i.inci_name) === normalized ||
        normalizeForMatch(i.english_name) === normalized ||
        normalizeForMatch(i.id) === normalized
      );
    });

    if (directMatch) {
      matched.push(directMatch);
      seenIds.add(directMatch.id);
      continue;
    }

    // Try partial / contains match (ingredient name appears in raw or vice versa)
    const partialMatch = INGREDIENTS.find((i) => {
      if (seenIds.has(i.id)) return false;
      const inciNorm = normalizeForMatch(i.inci_name);
      const engNorm = normalizeForMatch(i.english_name);
      return (
        normalized.includes(inciNorm) ||
        inciNorm.includes(normalized) ||
        normalized.includes(engNorm) ||
        engNorm.includes(normalized)
      );
    });

    if (partialMatch) {
      matched.push(partialMatch);
      seenIds.add(partialMatch.id);
    } else {
      unmatched.push(raw);
    }
  }

  return { matched, unmatched };
}

// ─── Analyze ──────────────────────────────────────────────────────────────────

/**
 * Scores the compatibility of a matched ingredient list against the user profile.
 * Accepts a PartialProfile or null — when no skinType is set, produces a generic
 * (non-personalized) analysis based on universal irritancy and comedogenicity.
 */
export function analyzeCompatibility(
  ingredients: Ingredient[],
  profile: PartialProfile | null,
  unmatchedRaw: string[] = [],
): IngredientAnalysisResult {
  const skinType = profile?.skinType as SkinType | undefined;
  const isPersonalized = Boolean(skinType);
  const goals = profile?.goals ?? [];
  const flagged: FlaggedIngredient[] = [];
  const beneficial: BeneficialIngredient[] = [];

  let score = 100;

  if (!isPersonalized) {
    // ── Generic analysis (no skin type known) ────────────────────────────────
    for (const ing of ingredients) {
      if (ing.irritancy === 'high') {
        flagged.push({
          ingredient: ing,
          reason: 'High irritancy — commonly problematic across many skin types',
          severity: 'warning',
        });
        score -= 8;
      } else if (ing.comedogenicity >= 4) {
        flagged.push({
          ingredient: ing,
          reason: `Comedogenicity ${ing.comedogenicity}/5 — high risk of clogging pores`,
          severity: 'warning',
        });
        score -= 8;
      } else if (ing.comedogenicity === 3) {
        flagged.push({
          ingredient: ing,
          reason: 'Moderate comedogenicity — may clog pores in some skin types',
          severity: 'caution',
        });
        score -= 5;
      } else if (ing.irritancy === 'low' && (ing.category === 'humectant' || ing.category === 'soothing')) {
        beneficial.push({
          ingredient: ing,
          reason: ing.good_for[0] ?? 'Generally well-tolerated and beneficial',
        });
      }
    }
  } else {
    // ── Personalized analysis (skin type known) ───────────────────────────────
    for (const ing of ingredients) {
      const skinCompatible = ing.skin_type_compatibility[skinType!];
      let isFlagged = false;

      // High irritancy on sensitive skin
      if (skinType === 'sensitive' && ing.irritancy === 'high') {
        flagged.push({
          ingredient: ing,
          reason: `High irritancy — not ideal for ${skinType} skin`,
          severity: 'warning',
        });
        score -= 15;
        isFlagged = true;
      }

      // Comedogenic on oily/combination
      if (
        !isFlagged &&
        (skinType === 'oily' || skinType === 'combination') &&
        ing.comedogenicity >= 3
      ) {
        flagged.push({
          ingredient: ing,
          reason: `Comedogenicity ${ing.comedogenicity}/5 — may clog pores on ${skinType} skin`,
          severity: ing.comedogenicity >= 4 ? 'warning' : 'caution',
        });
        score -= ing.comedogenicity >= 4 ? 15 : 8;
        isFlagged = true;
      }

      // Skin type incompatibility
      if (!isFlagged && !skinCompatible) {
        if (ing.irritancy === 'high') {
          flagged.push({
            ingredient: ing,
            reason: `Not recommended for ${skinType} skin and high irritancy`,
            severity: 'warning',
          });
          score -= 15;
          isFlagged = true;
        } else if (ing.irritancy === 'medium') {
          flagged.push({
            ingredient: ing,
            reason: `Not typically recommended for ${skinType} skin`,
            severity: 'caution',
          });
          score -= 8;
          isFlagged = true;
        }
      }

      // Goal-specific concerns
      if (!isFlagged) {
        if (goals.includes('acne_reduction') && ing.concern_flags.includes('acne')) {
          flagged.push({
            ingredient: ing,
            reason: 'Known to trigger breakouts — conflicts with acne reduction goal',
            severity: 'caution',
          });
          score -= 8;
          isFlagged = true;
        }

        if (
          !isFlagged &&
          goals.includes('glow') &&
          ing.concern_flags.includes('redness') &&
          skinType === 'sensitive'
        ) {
          flagged.push({
            ingredient: ing,
            reason: 'Can cause redness — monitor if targeting glow',
            severity: 'caution',
          });
          score -= 8;
          isFlagged = true;
        }
      }

      // Beneficial logic
      if (!isFlagged && skinCompatible) {
        const benefitReasons: string[] = [];

        if (goals.includes('anti_aging') && ing.concern_flags.includes('aging')) {
          benefitReasons.push('targets aging');
        }
        if (goals.includes('glow') && ing.concern_flags.includes('dryness') && ing.category === 'humectant') {
          benefitReasons.push('boosts hydration for glow');
        }
        if (goals.includes('acne_reduction') && ing.category === 'exfoliant') {
          benefitReasons.push('helps clear congestion');
        }
        if (skinType === 'dry' && (ing.category === 'emollient' || ing.category === 'occlusive')) {
          benefitReasons.push('excellent for dry skin moisture barrier');
        }
        if (skinType === 'oily' && ing.category === 'humectant' && ing.comedogenicity === 0) {
          benefitReasons.push('lightweight hydration safe for oily skin');
        }
        if (ing.category === 'soothing' && (skinType === 'sensitive' || skinType === 'combination')) {
          benefitReasons.push('soothes and calms');
        }

        const hasGoodFor = ing.good_for.some((g) =>
          g.toLowerCase().includes(skinType!) ||
          (skinType === 'oily' && g.toLowerCase().includes('acne')) ||
          (skinType === 'dry' && g.toLowerCase().includes('dry')) ||
          (skinType === 'sensitive' && g.toLowerCase().includes('sensitiv'))
        );

        if (benefitReasons.length > 0 || hasGoodFor) {
          const reason =
            benefitReasons.length > 0
              ? benefitReasons.join(', ')
              : ing.good_for[0] ?? `Works well for ${skinType} skin`;
          beneficial.push({ ingredient: ing, reason });
        }
      }
    }
  }

  // Apply beneficial score boost (capped at +15)
  const beneficialBoost = Math.min(beneficial.length * 3, 15);
  score = Math.min(100, Math.max(0, score + beneficialBoost));

  const verdict: IngredientAnalysisResult['verdict'] =
    score >= 80 ? 'great_match' : score >= 60 ? 'use_caution' : 'not_recommended';

  const matchRate =
    ingredients.length + unmatchedRaw.length > 0
      ? Math.round((ingredients.length / (ingredients.length + unmatchedRaw.length)) * 100)
      : 0;

  const summary = buildSummary(
    score, verdict, flagged, beneficial, skinType ?? null, ingredients.length, isPersonalized,
  );

  return {
    overallScore: score,
    verdict,
    flagged,
    beneficial,
    matched: ingredients,
    unmatched: unmatchedRaw,
    summary,
    matchRate,
    isPersonalized,
  };
}

// ─── Summary Builder ──────────────────────────────────────────────────────────

function buildSummary(
  score: number,
  verdict: IngredientAnalysisResult['verdict'],
  flagged: FlaggedIngredient[],
  beneficial: BeneficialIngredient[],
  skinType: SkinType | null,
  totalMatched: number,
  isPersonalized: boolean,
): string {
  if (totalMatched === 0) {
    return 'No recognized ingredients found. Try pasting the full ingredient list from the product packaging.';
  }

  if (!isPersonalized) {
    const warningCount = flagged.filter((f) => f.severity === 'warning').length;
    if (warningCount > 0) {
      return `General scan found ${warningCount} potentially problematic ingredient${warningCount > 1 ? 's' : ''}. Tell us your skin type below for a personalized read.`;
    }
    if (flagged.length > 0) {
      return `General scan flagged ${flagged.length} ingredient${flagged.length > 1 ? 's' : ''} to watch. Add your skin type for a personalized analysis.`;
    }
    return `Formula looks generally clean (${score}/100). Tell us about your skin below to see how it works for you specifically.`;
  }

  const warningCount = flagged.filter((f) => f.severity === 'warning').length;
  const cautionCount = flagged.filter((f) => f.severity === 'caution').length;

  if (verdict === 'great_match') {
    if (beneficial.length >= 3) {
      return `Great news — this formula is highly compatible with your ${skinType} skin. We found ${beneficial.length} ingredients that actively benefit your skin profile${flagged.length === 0 ? ' with no red flags' : ''}.`;
    }
    return `This product scores ${score}/100 for your ${skinType} skin. The formula looks clean and well-suited to your goals.`;
  }

  if (verdict === 'use_caution') {
    if (warningCount > 0) {
      return `Use with caution — ${warningCount} ingredient${warningCount > 1 ? 's' : ''} flagged as potentially problematic for ${skinType} skin. Patch test recommended before full use.`;
    }
    return `Moderate compatibility with your ${skinType} skin (${score}/100). ${cautionCount} ingredient${cautionCount > 1 ? 's' : ''} to watch. Consider patch testing.`;
  }

  return `This formula has ${warningCount + cautionCount} ingredient${warningCount + cautionCount > 1 ? 's' : ''} that conflict with your ${skinType} skin profile or goals. We recommend looking for an alternative.`;
}

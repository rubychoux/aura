export { calculateOptimizationScore } from './scoring/composite.scorer';
export { generateDailyRoutine, buildWeeklySchedule } from './protocol/routine.generator';
export { recommendProductStack } from './protocol/product.recommender';
export {
  parseIngredientList,
  matchIngredients,
  analyzeCompatibility,
} from './ingredients/ingredient.analyzer';
export type {
  FlaggedIngredient,
  BeneficialIngredient,
  IngredientAnalysisResult,
} from './ingredients/ingredient.analyzer';
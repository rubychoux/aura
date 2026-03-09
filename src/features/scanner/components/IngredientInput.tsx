const SAMPLE_INGREDIENT_LIST = `Water, Niacinamide, Glycerin, Butylene Glycol, Dimethicone, Pentylene Glycol, Phenoxyethanol, Sodium Hyaluronate, Panthenol, Allantoin, Centella Asiatica Extract, Adenosine, Tocopherol, Ethanol, Fragrance`;

interface Props {
  rawInput: string;
  estimatedIngredientCount: number;
  isAnalyzing: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onAnalyze: () => void;
}

export function IngredientInput({
  rawInput,
  estimatedIngredientCount,
  isAnalyzing,
  error,
  onChange,
  onAnalyze,
}: Props) {
  const handleSample = () => {
    onChange(SAMPLE_INGREDIENT_LIST);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={rawInput}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your ingredient list here…&#10;&#10;e.g. Water, Niacinamide, Glycerin, Butylene Glycol, Sodium Hyaluronate..."
          className="w-full h-48 px-4 py-3 text-sm text-warm-800 placeholder-warm-300 bg-white border border-cream-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blush-300 focus:border-blush-300 leading-relaxed"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {estimatedIngredientCount > 0 && (
            <span className="text-xs text-warm-400 bg-cream-100 px-2 py-0.5 rounded-full">
              ~{estimatedIngredientCount} ingredients
            </span>
          )}
          <span className="text-xs text-warm-300">{rawInput.length} chars</span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !rawInput.trim()}
          className="flex-1 py-3 bg-warm-900 text-white text-sm font-medium rounded-xl hover:bg-warm-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing…' : 'Analyze Ingredients'}
        </button>
        <button
          onClick={handleSample}
          className="px-4 py-3 bg-cream-100 text-warm-600 text-sm font-medium rounded-xl hover:bg-cream-200 transition-colors border border-cream-300 whitespace-nowrap"
        >
          Try Sample
        </button>
      </div>

      <p className="text-xs text-warm-400 text-center leading-relaxed">
        Copy the ingredient list from the product packaging or official brand website.
        Comma, slash, or line-break separated formats all work.
      </p>
    </div>
  );
}

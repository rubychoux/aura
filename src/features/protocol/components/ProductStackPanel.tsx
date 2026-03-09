import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { ProductCategory } from '@/types/protocol.types';

interface Props {
  products: ProductCategory[];
}

export function ProductStackPanel({ products }: Props) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <p className="text-sm font-semibold text-warm-800 mb-1">{product.category}</p>
              <p className="text-xs text-warm-500">{product.purpose}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-black text-blush-500">{product.relevanceScore}</p>
              <p className="text-xs text-warm-400">relevance</p>
            </div>
          </div>

          <div className="mb-3">
            <ProgressBar
              value={product.relevanceScore}
              color="blush"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-warm-500 bg-cream-100 px-2 py-1 rounded-lg">
              {product.frequency}
            </span>
          </div>

          <p className="text-xs text-warm-500 mt-3 leading-relaxed border-t border-cream-200 pt-3">
            {product.rationale}
          </p>
        </Card>
      ))}
    </div>
  );
}
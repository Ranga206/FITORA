import type { FoodItem } from '../../types/food'

interface FoodCardProps {
  food: FoodItem
  onSelect: (food: FoodItem) => void
}

function getCategoryIcon(category: string): string {
  const normalized = category.toLowerCase()
  if (normalized.includes('dairy') || normalized.includes('egg')) return '🥛'
  if (normalized.includes('fruit')) return '🍎'
  if (normalized.includes('grain') || normalized.includes('cereal')) return '🌾'
  if (normalized.includes('legume') || normalized.includes('pulse')) return '🫘'
  if (normalized.includes('nut') || normalized.includes('seed')) return '🌰'
  if (normalized.includes('poultry') || normalized.includes('meat')) return '🍗'
  if (normalized.includes('vegetable')) return '🥦'
  return '🥗'
}

function formatReferenceBasis(basis: string): string {
  switch (basis) {
    case 'per_100g':
      return 'per 100 g'
    case 'per_100ml':
      return 'per 100 ml'
    case 'per_serving':
      return 'per serving'
    default:
      return basis.replace('_', ' ')
  }
}

export function FoodCard({ food, onSelect }: FoodCardProps) {
  const categoryIcon = getCategoryIcon(food.category)
  const referenceLabel = formatReferenceBasis(food.nutrition_reference_basis)

  return (
    <article
      className="catalog-food-card"
      onClick={() => onSelect(food)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(food)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View nutritional details for ${food.name}`}
    >
      <div className="food-card-header">
        <div className="food-card-badge-row">
          <span className="food-category-pill" title={`Category: ${food.category}`}>
            <span className="category-emoji" aria-hidden="true">{categoryIcon}</span>
            <span>{food.category}</span>
          </span>
          <span className={`prep-state-pill prep-${food.preparation_state.toLowerCase()}`} title={`State: ${food.preparation_state}`}>
            {food.preparation_state}
          </span>
        </div>
        <h3 className="food-card-title" title={food.name}>
          {food.name}
        </h3>
        <div className="food-card-meta">
          <span className="reference-basis-tag">
            <span className="basis-dot" aria-hidden="true" />
            {referenceLabel}
          </span>
          {food.serving_unit && (
            <span className="serving-info-tag">
              Serving: {food.serving_size} {food.serving_unit}
              {food.serving_weight_g ? ` (${food.serving_weight_g} g)` : ''}
              {food.serving_volume_ml ? ` (${food.serving_volume_ml} ml)` : ''}
            </span>
          )}
        </div>
      </div>

      <div className="food-card-nutrients">
        <div className="nutrient-cell nutrient-calories">
          <span className="nutrient-label">Calories</span>
          <span className="nutrient-value">
            {Number(food.calories).toFixed(0)}
            <small className="nutrient-unit">kcal</small>
          </span>
        </div>

        <div className="nutrient-cell nutrient-protein">
          <span className="nutrient-label">Protein</span>
          <span className="nutrient-value">
            {Number(food.protein).toFixed(1)}
            <small className="nutrient-unit">g</small>
          </span>
        </div>

        <div className="nutrient-cell nutrient-carbs">
          <span className="nutrient-label">Carbs</span>
          <span className="nutrient-value">
            {Number(food.carbohydrates).toFixed(1)}
            <small className="nutrient-unit">g</small>
          </span>
        </div>

        <div className="nutrient-cell nutrient-fat">
          <span className="nutrient-label">Fat</span>
          <span className="nutrient-value">
            {Number(food.fat).toFixed(1)}
            <small className="nutrient-unit">g</small>
          </span>
        </div>
      </div>

      <div className="food-card-footer">
        <span className="source-citation" title={`Source: ${food.source_name}${food.source_code ? ` (ID: ${food.source_code})` : ''}`}>
          <span className="verified-icon" aria-hidden="true">✓</span>
          <span className="source-name">{food.source_name}</span>
          {food.source_code && <span className="source-code">#{food.source_code}</span>}
        </span>
        <span className="inspect-prompt">
          <span>Details</span>
          <span className="arrow-icon" aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  )
}

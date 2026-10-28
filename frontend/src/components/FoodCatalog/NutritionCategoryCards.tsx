import {
  NUTRITION_CATEGORIES,
  type NutritionCategory,
} from '../../services/nutritionClassifier'
import './NutritionCategoryCards.css'

interface NutritionCategoryCardsProps {
  categoryCounts: Record<NutritionCategory, number>
  selectedCategory: NutritionCategory | 'all'
  onSelectCategory: (category: NutritionCategory | 'all') => void
}

export function NutritionCategoryCards({
  categoryCounts,
  selectedCategory,
  onSelectCategory,
}: NutritionCategoryCardsProps) {
  const categories: NutritionCategory[] = [
    'weight_gain',
    'weight_loss',
    'diabetic_friendly',
  ]

  return (
    <section
      className="nutrition-categories-section"
      aria-label="Nutrition Goal Categories"
    >
      <div className="nutrition-categories-header">
        <div>
          <span className="categories-kicker">GOAL-BASED NUTRITION</span>
          <h2 className="categories-title">Nutrition Categories</h2>
          <p className="categories-subtitle">
            Targeted food selections tailored to your specific wellness and metabolic goals.
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            type="button"
            className="view-all-pill-btn"
            onClick={() => onSelectCategory('all')}
            aria-label="View all nutrition foods"
          >
            <span>View All Foods</span>
            <span aria-hidden="true">↺</span>
          </button>
        )}
      </div>

      <div className="nutrition-cards-grid">
        {categories.map((catKey) => {
          const meta = NUTRITION_CATEGORIES[catKey]
          const count = categoryCounts[catKey] || 0
          const isSelected = selectedCategory === catKey

          return (
            <article
              key={catKey}
              className={`nutrition-goal-card goal-${catKey} ${
                isSelected ? 'is-selected' : ''
              }`}
              onClick={() => onSelectCategory(isSelected ? 'all' : catKey)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectCategory(isSelected ? 'all' : catKey)
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`${meta.name}: ${meta.description}. ${count} foods available.`}
            >
              <div className="goal-card-top">
                <span className="goal-card-icon" aria-hidden="true">
                  {meta.icon}
                </span>
                <span className="goal-card-count-badge">
                  <strong>{count}</strong> foods
                </span>
              </div>

              <div className="goal-card-body">
                <span className="goal-card-tag">{meta.tag}</span>
                <h3 className="goal-card-title">{meta.name}</h3>
                <p className="goal-card-desc">{meta.description}</p>
              </div>

              <div className="goal-card-footer">
                <span className="goal-action-text">
                  {isSelected ? 'Viewing Category' : 'Explore Foods'}
                </span>
                <span className="goal-action-arrow" aria-hidden="true">
                  {isSelected ? '✓' : '→'}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

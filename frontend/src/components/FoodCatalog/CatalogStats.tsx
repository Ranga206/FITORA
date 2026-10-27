import type { FoodItem } from '../../types/food'

interface CatalogStatsProps {
  totalPublished: number
  allFoods: FoodItem[]
  categories: string[]
  displayedCount: number
}

export function CatalogStats({
  totalPublished,
  allFoods,
  categories,
  displayedCount,
}: CatalogStatsProps) {
  // Compute accurate nutrient statistics from actual API records
  const sampleSize = allFoods.length
  const hasSample = sampleSize > 0

  const avgCalories = hasSample
    ? allFoods.reduce((acc, f) => acc + Number(f.calories), 0) / sampleSize
    : null

  const avgProtein = hasSample
    ? allFoods.reduce((acc, f) => acc + Number(f.protein), 0) / sampleSize
    : null

  const avgCarbs = hasSample
    ? allFoods.reduce((acc, f) => acc + Number(f.carbohydrates), 0) / sampleSize
    : null

  const avgFat = hasSample
    ? allFoods.reduce((acc, f) => acc + Number(f.fat), 0) / sampleSize
    : null

  return (
    <section className="catalog-summary-section" aria-label="Catalog Summary Statistics">
      <div className="summary-cards-grid">
        {/* Total Published Food Items */}
        <div className="summary-stat-card">
          <div className="stat-card-icon stat-icon-items" aria-hidden="true">
            🥗
          </div>
          <div className="stat-card-content">
            <span className="stat-kicker">DATABASE SCOPE</span>
            <div className="stat-main-row">
              <strong className="stat-number">{totalPublished}</strong>
              <span className="stat-sublabel">Published Foods</span>
            </div>
            <p className="stat-detail">
              100% verified & production-eligible records
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="summary-stat-card">
          <div className="stat-card-icon stat-icon-categories" aria-hidden="true">
            📂
          </div>
          <div className="stat-card-content">
            <span className="stat-kicker">TAXONOMY</span>
            <div className="stat-main-row">
              <strong className="stat-number">{categories.length}</strong>
              <span className="stat-sublabel">Distinct Categories</span>
            </div>
            <p className="stat-detail">
              Grains, Fruits, Legumes, Dairy, Meat & more
            </p>
          </div>
        </div>

        {/* Four Tracked Nutrients Overview */}
        <div className="summary-stat-card summary-nutrients-card">
          <div className="stat-card-icon stat-icon-nutrients" aria-hidden="true">
            ⚖️
          </div>
          <div className="stat-card-content">
            <span className="stat-kicker">CORE TRACKING</span>
            <div className="stat-main-row">
              <strong className="stat-number">4</strong>
              <span className="stat-sublabel">Tracked Nutrients</span>
            </div>
            <div className="nutrients-tag-row">
              <span className="nutrient-chip chip-cal">Calories (kcal)</span>
              <span className="nutrient-chip chip-pro">Protein (g)</span>
              <span className="nutrient-chip chip-carb">Carbs (g)</span>
              <span className="nutrient-chip chip-fat">Fat (g)</span>
            </div>
          </div>
        </div>

        {/* Real Average Macro Profile */}
        {hasSample && avgCalories !== null && (
          <div className="summary-stat-card summary-averages-card">
            <div className="stat-card-icon stat-icon-averages" aria-hidden="true">
              📊
            </div>
            <div className="stat-card-content">
              <span className="stat-kicker">CATALOG MACRO PROFILE</span>
              <span className="stat-sublabel">Averages Across {sampleSize} Verified Foods</span>
              <div className="averages-mini-grid">
                <div className="avg-item">
                  <span className="avg-label">Avg Cal</span>
                  <strong className="avg-val">{avgCalories.toFixed(0)} <small>kcal</small></strong>
                </div>
                <div className="avg-item">
                  <span className="avg-label">Avg Pro</span>
                  <strong className="avg-val">{avgProtein?.toFixed(1)} <small>g</small></strong>
                </div>
                <div className="avg-item">
                  <span className="avg-label">Avg Carb</span>
                  <strong className="avg-val">{avgCarbs?.toFixed(1)} <small>g</small></strong>
                </div>
                <div className="avg-item">
                  <span className="avg-label">Avg Fat</span>
                  <strong className="avg-val">{avgFat?.toFixed(1)} <small>g</small></strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="summary-substrip">
        <span className="substrip-pill">
          <span className="substrip-dot" aria-hidden="true" />
          <span>Active View: <strong>{displayedCount}</strong> matching foods</span>
        </span>
        <span className="substrip-divider" aria-hidden="true">·</span>
        <span className="substrip-text">
          Direct PostgreSQL read-only query · Strictly non-negative nutritional data
        </span>
      </div>
    </section>
  )
}

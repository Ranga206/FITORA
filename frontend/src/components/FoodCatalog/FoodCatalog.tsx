import { useEffect, useMemo, useState } from 'react'
import type { FoodItem, FoodCatalogListResponse } from '../../types/food'
import { FoodCard } from './FoodCard'
import { FoodDetailModal } from './FoodDetailModal'
import { CatalogStats } from './CatalogStats'
import { CatalogFilters } from './CatalogFilters'
import './FoodCatalog.css'

interface FoodCatalogProps {
  onBackToDashboard: () => void
}

export function FoodCatalog({ onBackToDashboard }: FoodCatalogProps) {
  // Master catalog state loaded from the real backend API
  const [allFoods, setAllFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Interactive filtering & search state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [prepStateFilter, setPrepStateFilter] = useState<'all' | 'raw' | 'cooked'>('all')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  // Detail Modal inspection state
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)

  // Fetch full published catalog from API on mount
  useEffect(() => {
    let active = true

    async function loadCatalog() {
      try {
        // Query the existing Nutrition Food Catalog endpoint with maximum allowed limit (100)
        const response = await fetch('/api/v1/nutrition/foods?limit=100&offset=0')
        if (!response.ok) {
          throw new Error(`Failed to load food catalog (HTTP ${response.status}). Ensure the backend is running.`)
        }

        const data: FoodCatalogListResponse = await response.json()
        if (!active) return

        // Verify and set real records
        setAllFoods(data.items)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load food catalog.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadCatalog()

    return () => {
      active = false
    }
  }, [])

  // Calculate real categories and counts directly from loaded API records
  const categoryCounts = useMemo(() => {
    const countsMap = new Map<string, number>()
    allFoods.forEach((food) => {
      countsMap.set(food.category, (countsMap.get(food.category) || 0) + 1)
    })

    return Array.from(countsMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [allFoods])

  const categoryNames = useMemo(() => categoryCounts.map((c) => c.name), [categoryCounts])

  // Filtered items based on current search, category, and preparation state
  const filteredFoods = useMemo(() => {
    let result = allFoods

    if (selectedCategory) {
      const catLower = selectedCategory.toLowerCase()
      result = result.filter((f) => f.category.toLowerCase() === catLower)
    }

    if (searchQuery.trim()) {
      const queryLower = searchQuery.trim().toLowerCase()
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(queryLower) ||
          f.category.toLowerCase().includes(queryLower) ||
          (f.source_code && f.source_code.includes(queryLower)),
      )
    }

    if (prepStateFilter !== 'all') {
      result = result.filter((f) => f.preparation_state.toLowerCase() === prepStateFilter)
    }

    return result
  }, [allFoods, selectedCategory, searchQuery, prepStateFilter])

  // Explicit handlers that reset page index when filters change
  function handleSearchChange(query: string) {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  function handleCategoryChange(category: string | null) {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  function handlePrepStateChange(state: 'all' | 'raw' | 'cooked') {
    setPrepStateFilter(state)
    setCurrentPage(1)
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setCurrentPage(1)
  }

  // Paginated slice for current page
  const totalFiltered = filteredFoods.length
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize))
  const displayedFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredFoods.slice(startIndex, startIndex + pageSize)
  }, [filteredFoods, currentPage, pageSize])

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== null || prepStateFilter !== 'all'

  function handleResetFilters() {
    setSearchQuery('')
    setSelectedCategory(null)
    setPrepStateFilter('all')
    setCurrentPage(1)
  }

  // Check if any displayed record has USDA provenance
  const hasUsdaRecords = useMemo(() => {
    return displayedFoods.some((f) => f.source_name.toLowerCase().includes('usda'))
  }, [displayedFoods])

  return (
    <div className="food-catalog-page">
      {/* Page Header */}
      <header className="catalog-hero-header">
        <div className="catalog-header-top">
          <button
            type="button"
            className="back-nav-button"
            onClick={onBackToDashboard}
            aria-label="Back to Nutrition Dashboard"
          >
            <span className="back-arrow" aria-hidden="true">←</span>
            <span>Back to Dashboard</span>
          </button>

          <div className="catalog-header-badges">
            <span className="live-api-badge">
              <span className="badge-live-pulse" aria-hidden="true" />
              <span>PostgreSQL · Live Catalog</span>
            </span>
            <span className="verified-provenance-badge">
              <span className="badge-shield-icon" aria-hidden="true">✓</span>
              <span>100% Verified Foods</span>
            </span>
          </div>
        </div>

        <div className="catalog-hero-content">
          <div className="hero-text-block">
            <div className="catalog-kicker-row">
              <span className="kicker-leaf" aria-hidden="true">🥗</span>
              <span className="catalog-kicker">NUTRITION PILLAR SHOWCASE</span>
            </div>
            <h1 className="catalog-hero-title">
              Fitora Food Catalog
            </h1>
            <p className="catalog-hero-subtitle">
              Explore the verified foods powering your nutrition tracking and energy balance.
            </p>
          </div>

          <div className="hero-accent-card" aria-hidden="true">
            <div className="accent-circle-art" />
            <div className="accent-inner-badge">
              <span className="accent-badge-icon">🌿</span>
              <div className="accent-badge-copy">
                <strong>USDA FDC CC0</strong>
                <small>Open Nutrition Data</small>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Statistics Section */}
      <CatalogStats
        totalPublished={allFoods.length}
        allFoods={allFoods}
        categories={categoryNames}
        displayedCount={filteredFoods.length}
      />

      {/* Search & Filter Toolbar */}
      <CatalogFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        prepStateFilter={prepStateFilter}
        onPrepStateChange={handlePrepStateChange}
        categoryCounts={categoryCounts}
        totalItems={allFoods.length}
        displayedCount={filteredFoods.length}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Catalog Content Area */}
      <main className="catalog-main-grid" id="catalog-grid">
        {loading ? (
          <div className="catalog-loading-state" role="status" aria-label="Loading food catalog">
            <div className="catalog-loading-spinner" aria-hidden="true" />
            <h3>Loading verified food records…</h3>
            <p>Querying <code>/api/v1/nutrition/foods</code> from the backend database.</p>
          </div>
        ) : error ? (
          <div className="catalog-error-state" role="alert">
            <div className="error-icon" aria-hidden="true">⚠️</div>
            <h3>Unable to retrieve food records</h3>
            <p>{error}</p>
            <button
              type="button"
              className="primary-button"
              onClick={() => window.location.reload()}
            >
              Retry Connection
            </button>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="catalog-empty-state">
            <div className="empty-catalog-icon" aria-hidden="true">🔍</div>
            <h3>No matching food items found</h3>
            <p>
              No food items match your current search criteria or category filter.
            </p>
            <button
              type="button"
              className="primary-button"
              onClick={handleResetFilters}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="catalog-cards-grid">
              {displayedFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onSelect={setSelectedFood}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav className="catalog-pagination-bar" aria-label="Food catalog pagination">
                <div className="pagination-info">
                  Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to{' '}
                  <strong>{Math.min(currentPage * pageSize, totalFiltered)}</strong> of{' '}
                  <strong>{totalFiltered}</strong> foods
                </div>

                <div className="pagination-buttons">
                  <button
                    type="button"
                    className="pagination-btn prev-btn"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                  >
                    ← Previous
                  </button>

                  <div className="pagination-pages-list">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        className={`page-num-btn ${pageNum === currentPage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                        aria-current={pageNum === currentPage ? 'page' : undefined}
                        aria-label={`Page ${pageNum}`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="pagination-btn next-btn"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next Page"
                  >
                    Next →
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </main>

      {/* Details Inspection Modal */}
      <FoodDetailModal
        food={selectedFood}
        onClose={() => setSelectedFood(null)}
      />

      {/* Professional USDA Attribution Footer */}
      <footer className="catalog-attribution-footer">
        <div className="attribution-content">
          <div className="attribution-badge">
            <span className="attribution-shield" aria-hidden="true">📜</span>
            <strong>Data Attribution & Provenance</strong>
          </div>
          <p className="attribution-text">
            {hasUsdaRecords
              ? 'Nutrient values for USDA-sourced catalog items are derived from USDA FoodData Central (Public Domain / CC0 1.0). Fitora strictly enforces nutritional integrity validation, non-negative nutrient constraints, and unambiguous mass-volume reference standards.'
              : 'Nutrient catalog items are verified according to Fitora strict nutritional integrity standards.'}
          </p>
        </div>
        <div className="attribution-links">
          <span className="attribution-tag">Verified Public Domain Database</span>
          <span className="attribution-tag">CC0 1.0 Universal</span>
        </div>
      </footer>
    </div>
  )
}

interface CategoryCount {
  name: string
  count: number
}

interface CatalogFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  prepStateFilter: 'all' | 'raw' | 'cooked'
  onPrepStateChange: (state: 'all' | 'raw' | 'cooked') => void
  categoryCounts: CategoryCount[]
  totalItems: number
  displayedCount: number
  pageSize: number
  onPageSizeChange: (size: number) => void
  onReset: () => void
  hasActiveFilters: boolean
}

export function CatalogFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  prepStateFilter,
  onPrepStateChange,
  categoryCounts,
  totalItems,
  displayedCount,
  pageSize,
  onPageSizeChange,
  onReset,
  hasActiveFilters,
}: CatalogFiltersProps) {
  return (
    <div className="catalog-filters-container">
      {/* Search Bar & Primary Actions Row */}
      <div className="filters-top-bar">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="catalog-search-input"
            placeholder="Search foods (e.g. Rice, Apple, Chicken, Almonds, Spinach)…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search food catalog records"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-controls-group">
          {/* Preparation State Filter */}
          <div className="select-control-wrapper">
            <label htmlFor="prep-state-select" className="control-label">
              State:
            </label>
            <select
              id="prep-state-select"
              className="catalog-select"
              value={prepStateFilter}
              onChange={(e) => onPrepStateChange(e.target.value as 'all' | 'raw' | 'cooked')}
              aria-label="Filter by preparation state"
            >
              <option value="all">All States</option>
              <option value="raw">Raw</option>
              <option value="cooked">Cooked</option>
            </select>
          </div>

          {/* Page Size Selector */}
          <div className="select-control-wrapper">
            <label htmlFor="page-size-select" className="control-label">
              Per Page:
            </label>
            <select
              id="page-size-select"
              className="catalog-select"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label="Items per page"
            >
              <option value={12}>12 cards</option>
              <option value={24}>24 cards</option>
              <option value={50}>All 50 foods</option>
            </select>
          </div>

          {/* Reset Filters Action */}
          {hasActiveFilters && (
            <button
              type="button"
              className="reset-filters-button"
              onClick={onReset}
              aria-label="Reset all search queries and filters"
            >
              <span className="reset-icon" aria-hidden="true">↺</span>
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-pills-bar" role="toolbar" aria-label="Category Filters">
        <button
          type="button"
          className={`category-pill ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onCategoryChange(null)}
          aria-pressed={selectedCategory === null}
        >
          <span>All Foods</span>
          <span className="pill-count">{totalItems}</span>
        </button>

        {categoryCounts.map((cat) => (
          <button
            key={cat.name}
            type="button"
            className={`category-pill ${selectedCategory?.toLowerCase() === cat.name.toLowerCase() ? 'active' : ''}`}
            onClick={() => {
              if (selectedCategory?.toLowerCase() === cat.name.toLowerCase()) {
                onCategoryChange(null)
              } else {
                onCategoryChange(cat.name)
              }
            }}
            aria-pressed={selectedCategory?.toLowerCase() === cat.name.toLowerCase()}
          >
            <span>{cat.name}</span>
            <span className="pill-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Filter Feedback Strip */}
      <div className="active-filter-status" aria-live="polite">
        <span className="results-count-text">
          Showing <strong>{displayedCount}</strong> {displayedCount === 1 ? 'food' : 'foods'}
          {selectedCategory && (
            <span> in <strong>{selectedCategory}</strong></span>
          )}
          {searchQuery && (
            <span> matching <em>&ldquo;{searchQuery}&rdquo;</em></span>
          )}
          {prepStateFilter !== 'all' && (
            <span> ({prepStateFilter})</span>
          )}
        </span>

        {hasActiveFilters && (
          <span className="filter-active-indicator">
            <span className="indicator-dot" aria-hidden="true" />
            Filtered view
          </span>
        )}
      </div>
    </div>
  )
}

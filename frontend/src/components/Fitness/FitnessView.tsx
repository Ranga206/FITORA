import { useState, useEffect, useMemo } from 'react'
import type { Exercise, CompletedSessionRecord, CompletedSessionExercise } from '../../types/fitness'
import {
  STATIC_EXERCISES,
  SAMPLE_WORKOUT_ROUTINE,
  WORKOUT_HISTORY_STORAGE_KEY,
  loadWorkoutHistory,
  saveWorkoutSession,
  clearWorkoutHistory
} from './fitnessData'
import './Fitness.css'

interface FitnessViewProps {
  onBackToDashboard: () => void
  onWorkoutActiveChange: (active: boolean) => void
  isWorkoutActive: boolean
}

type FitnessTab = 'overview' | 'active-tracker' | 'history'

function getInitialFitnessTab(): FitnessTab {
  if (typeof window === 'undefined') return 'overview'
  const hash = window.location.hash.toLowerCase()
  if (hash.includes('history')) return 'history'
  return 'overview'
}

export function FitnessView({
  onBackToDashboard,
  onWorkoutActiveChange,
  isWorkoutActive
}: FitnessViewProps) {
  // Navigation tabs within Fitness
  const [activeTab, setActiveTab] = useState<FitnessTab>(getInitialFitnessTab)
  const [storageError, setStorageError] = useState<string | null>(null)

  // Selected exercise for viewing instruction modal
  const [inspectedExercise, setInspectedExercise] = useState<Exercise | null>(null)

  // Exercise library category filter
  const [categoryFilter, setCategoryFilter] = useState<string>('All')

  // Active workout state
  const [activeChecklist, setActiveChecklist] = useState<CompletedSessionExercise[]>([])
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)
  const [isFinishing, setIsFinishing] = useState<boolean>(false)

  // Workout completion summary modal state
  const [summaryRecord, setSummaryRecord] = useState<CompletedSessionRecord | null>(null)

  // History state loaded safely from localStorage
  const [historyRecords, setHistoryRecords] = useState<CompletedSessionRecord[]>(() => loadWorkoutHistory())

  // Synchronize elapsed timer with active workout status
  useEffect(() => {
    if (!isWorkoutActive) return

    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isWorkoutActive])

  // Derive effective tab: active-tracker is only active while a workout is ongoing
  const currentTab: FitnessTab = !isWorkoutActive && activeTab === 'active-tracker'
    ? 'overview'
    : activeTab

  // Synchronize across windows/tabs if storage changes externally
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === WORKOUT_HISTORY_STORAGE_KEY) {
        setHistoryRecords(loadWorkoutHistory())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Synchronize active tab and history with URL hash changes
  useEffect(() => {
    function handleHashSync() {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('history')) {
        setActiveTab('history')
        setHistoryRecords(loadWorkoutHistory())
      } else if (hash === '#fitness' || hash === '#/fitness') {
        if (!isWorkoutActive) {
          setActiveTab('overview')
        }
      }
    }
    window.addEventListener('hashchange', handleHashSync)
    return () => window.removeEventListener('hashchange', handleHashSync)
  }, [isWorkoutActive])

  // Format seconds to mm:ss display
  function formatDuration(totalSeconds: number): string {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle Tab Navigation with internal active workout confirmation
  function handleTabChange(tab: FitnessTab) {
    if (tab === activeTab) {
      if (tab === 'history') {
        setHistoryRecords(loadWorkoutHistory())
      }
      return
    }

    if (isWorkoutActive && tab !== 'active-tracker') {
      const confirmLeave = window.confirm(
        'You have a workout in progress. Leaving this screen will discard your active session. Do you want to leave?'
      )
      if (!confirmLeave) {
        return
      }
      // User confirmed discard
      onWorkoutActiveChange(false)
      setActiveChecklist([])
    }

    setActiveTab(tab)
    if (tab === 'history') {
      setHistoryRecords(loadWorkoutHistory())
      window.location.hash = 'fitness/history'
    } else if (tab === 'overview') {
      window.location.hash = 'fitness'
    }
  }

  // Step 4: Start Sample Workout
  function handleStartSampleWorkout() {
    // Populate checklist with routine exercises
    const initialChecklist: CompletedSessionExercise[] = SAMPLE_WORKOUT_ROUTINE.exercises.map((item) => {
      const found = STATIC_EXERCISES.find((e) => e.id === item.exercise_id)
      return {
        id: item.exercise_id,
        name: found ? found.name : 'Exercise',
        completed: false
      }
    })

    setActiveChecklist(initialChecklist)
    setElapsedSeconds(0)
    setIsFinishing(false)
    onWorkoutActiveChange(true)
    setActiveTab('active-tracker')
  }

  // Step 5: Toggle Exercise Complete State
  function handleToggleExercise(exerciseId: string) {
    setActiveChecklist((prev) =>
      prev.map((item) =>
        item.id === exerciseId ? { ...item, completed: !item.completed } : item
      )
    )
  }

  // Step 5: Discard / Cancel Active Workout
  function handleCancelWorkout() {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this workout? Unfinished progress will be discarded.'
    )
    if (!confirmCancel) return

    onWorkoutActiveChange(false)
    setActiveChecklist([])
    setActiveTab('overview')
  }

  // Step 6: Finish Workout & Record Session
  function handleFinishWorkout() {
    // Guard against repeated rapid clicks
    if (isFinishing) return

    const completedCount = activeChecklist.filter((e) => e.completed).length
    // Do not save workouts that were abandoned before completing at least one exercise
    if (completedCount === 0) return

    setIsFinishing(true)

    const newRecord: CompletedSessionRecord = {
      id: `workout-${Date.now()}`,
      workout_title: SAMPLE_WORKOUT_ROUTINE.title,
      completed_at: new Date().toISOString(),
      duration_seconds: elapsedSeconds,
      total_exercises: activeChecklist.length,
      completed_exercises_count: completedCount,
      exercises: [...activeChecklist]
    }

    // Save to localStorage with failure handling
    const saveSuccess = saveWorkoutSession(newRecord)
    if (saveSuccess) {
      setStorageError(null)
      // Refresh history records state from storage
      setHistoryRecords(loadWorkoutHistory())
    } else {
      setStorageError(
        'Your workout was completed, but could not be saved to your browser storage. Storage may be full, disabled, or restricted.'
      )
      // Keep in local state so the current session remains visible in UI
      setHistoryRecords((prev) => [newRecord, ...prev])
    }

    // Stop active timer and workout
    onWorkoutActiveChange(false)

    // Show completion summary
    setSummaryRecord(newRecord)
  }

  function handleCloseSummary() {
    setSummaryRecord(null)
    setActiveChecklist([])
    setIsFinishing(false)
    setActiveTab('history')
    window.location.hash = 'fitness/history'
  }

  function handleClearHistory() {
    const confirmed = window.confirm('Clear all saved workout history from this browser?')
    if (confirmed) {
      clearWorkoutHistory()
      setHistoryRecords([])
    }
  }

  // Filtered exercises for the library
  const filteredExercises = useMemo(() => {
    if (categoryFilter === 'All') return STATIC_EXERCISES
    return STATIC_EXERCISES.filter((ex) => ex.category === categoryFilter)
  }, [categoryFilter])

  // Completion calculation for active tracker
  const completedExercisesCount = activeChecklist.filter((e) => e.completed).length
  const totalExercisesCount = activeChecklist.length
  const progressPercent = totalExercisesCount > 0
    ? Math.round((completedExercisesCount / totalExercisesCount) * 100)
    : 0

  return (
    <div className="fitness-page">
      {storageError && (
        <div className="notice error" role="alert">
          <span className="notice-icon" aria-hidden="true">⚠</span>
          <span>{storageError}</span>
        </div>
      )}

      {/* Fitness Hero Header */}
      <header className="fitness-hero-header">
        <div className="fitness-header-top">
          <button
            type="button"
            className="back-dashboard-btn"
            onClick={onBackToDashboard}
            aria-label="Back to Dashboard"
          >
            <span aria-hidden="true">←</span>
            <span>Back to Dashboard</span>
          </button>

          <div className="fitness-badges">
            <span className="demo-mode-badge">
              <span aria-hidden="true">✦</span>
              <span>Demo Mode</span>
            </span>
            <span className="history-count-badge">
              <span>{historyRecords.length} Saved {historyRecords.length === 1 ? 'Session' : 'Sessions'}</span>
            </span>
          </div>
        </div>

        <div className="fitness-header-body">
          <div className="fitness-header-icon" aria-hidden="true">↗</div>
          <div className="fitness-header-titles">
            <p className="eyebrow">PILLAR 02 · MOVE</p>
            <h1>Fitness &amp; Movement</h1>
            <p className="fitness-header-subtitle">
              Demystifying exercise with structured guidance, form cues, and distraction-free workout tracking.
            </p>
          </div>
        </div>
      </header>

      {/* Fitness Navigation Tabs */}
      <nav className="fitness-nav-tabs" aria-label="Fitness sub navigation">
        <button
          type="button"
          className={`fitness-tab-btn ${currentTab === 'overview' ? 'active' : ''}`}
          onClick={() => handleTabChange('overview')}
        >
          <span>Exercise Library &amp; Routine</span>
        </button>

        {isWorkoutActive && (
          <button
            type="button"
            className={`fitness-tab-btn ${currentTab === 'active-tracker' ? 'active' : ''}`}
            onClick={() => handleTabChange('active-tracker')}
          >
            <span className="active-pulse-dot" aria-hidden="true" />
            <span>Active Workout</span>
            <span className="tab-badge">{completedExercisesCount}/{totalExercisesCount}</span>
          </button>
        )}

        <button
          type="button"
          className={`fitness-tab-btn ${currentTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabChange('history')}
        >
          <span>Workout History</span>
          {historyRecords.length > 0 && (
            <span className="tab-badge">{historyRecords.length}</span>
          )}
        </button>
      </nav>

      {/* ====================================================================
          TAB 1: OVERVIEW & EXERCISE LIBRARY
          ==================================================================== */}
      {currentTab === 'overview' && (
        <>
          {/* Sample Routine Launcher Card */}
          <section className="routine-featured-card" aria-labelledby="routine-heading">
            <div className="routine-card-header">
              <div className="routine-card-info">
                <span className="exercise-category-tag">Curated Starter</span>
                <h2 id="routine-heading">{SAMPLE_WORKOUT_ROUTINE.title}</h2>
                <p>{SAMPLE_WORKOUT_ROUTINE.description}</p>
                <div className="routine-meta-pills">
                  <span className="routine-meta-pill">⏱ ~{SAMPLE_WORKOUT_ROUTINE.estimated_minutes} mins</span>
                  <span className="routine-meta-pill">🏋️ {SAMPLE_WORKOUT_ROUTINE.exercises.length} Exercises</span>
                  <span className="routine-meta-pill">✨ {SAMPLE_WORKOUT_ROUTINE.difficulty}</span>
                  <span className="routine-meta-pill">🏠 No Equipment Needed</span>
                </div>
              </div>

              <button
                type="button"
                className="routine-start-btn"
                onClick={handleStartSampleWorkout}
              >
                <span>{isWorkoutActive ? 'Resume Active Workout' : 'Start Workout Demo'}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="routine-exercises-preview">
              <h3 className="preview-title">Included Movements</h3>
              <div className="preview-chips-list">
                {SAMPLE_WORKOUT_ROUTINE.exercises.map((item) => {
                  const ex = STATIC_EXERCISES.find((e) => e.id === item.exercise_id)
                  if (!ex) return null
                  return (
                    <button
                      key={item.exercise_id}
                      type="button"
                      className="preview-chip"
                      onClick={() => setInspectedExercise(ex)}
                      title="Click to view form instructions"
                    >
                      <span>{ex.name}</span>
                      <span className="preview-chip-target">({item.recommended_target})</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Exercise Library Catalog */}
          <section className="exercise-library-section" aria-labelledby="library-heading">
            <div className="library-section-header">
              <div>
                <h3 id="library-heading">Foundational Exercise Library</h3>
                <p className="fitness-header-subtitle">
                  Inspect proper execution cues, breathing, and safe beginner modifications.
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="category-filter-chips" role="group" aria-label="Exercise category filters">
                {['All', 'Strength', 'Core', 'Mobility & Activation'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`filter-chip-btn ${categoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="exercise-grid">
              {filteredExercises.map((exercise) => (
                <article key={exercise.id} className="exercise-card">
                  <div className="exercise-card-top">
                    <div className="exercise-card-meta">
                      <span className="exercise-category-tag">{exercise.category}</span>
                      <span className="exercise-difficulty-pill">{exercise.difficulty}</span>
                    </div>
                    <h4>{exercise.name}</h4>
                    <p className="exercise-muscles">Targets: {exercise.target_muscle}</p>
                    <p className="exercise-desc">{exercise.short_description}</p>
                  </div>

                  <button
                    type="button"
                    className="exercise-view-instructions-btn"
                    onClick={() => setInspectedExercise(exercise)}
                  >
                    <span>View Form Instructions</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ====================================================================
          TAB 2: ACTIVE WORKOUT TRACKER
          ==================================================================== */}
      {currentTab === 'active-tracker' && isWorkoutActive && (
        <section className="active-tracker-card" aria-label="Active workout session">
          <div className="tracker-header">
            <div className="tracker-title-group">
              <span className="exercise-category-tag">Session in Progress</span>
              <h2>{SAMPLE_WORKOUT_ROUTINE.title}</h2>
              <p className="fitness-header-subtitle">
                Mark each movement complete as you finish. Keep good form over speed.
              </p>
            </div>

            <div className="tracker-timer-badge" aria-label={`Elapsed time: ${formatDuration(elapsedSeconds)}`}>
              <span aria-hidden="true">⏱</span>
              <span>{formatDuration(elapsedSeconds)}</span>
            </div>
          </div>

          {/* Progress Bar & Indicators */}
          <div className="tracker-progress-section">
            <div className="progress-labels">
              <span>Overall Progress</span>
              <span>{completedExercisesCount} of {totalExercisesCount} completed ({progressPercent}%)</span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Checklist */}
          <div className="checklist-container" role="list" aria-label="Workout exercise checklist">
            {activeChecklist.map((item) => {
              const staticEx = STATIC_EXERCISES.find((e) => e.id === item.id)
              const routineConfig = SAMPLE_WORKOUT_ROUTINE.exercises.find((e) => e.exercise_id === item.id)

              return (
                <div
                  key={item.id}
                  className={`checklist-item ${item.completed ? 'is-completed' : ''}`}
                  role="listitem"
                >
                  <div
                    className="checklist-left"
                    onClick={() => handleToggleExercise(item.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault()
                        handleToggleExercise(item.id)
                      }
                    }}
                    aria-label={`Toggle completion for ${item.name}`}
                  >
                    <div className="check-box-btn" aria-hidden="true">
                      {item.completed ? '✓' : ''}
                    </div>
                    <div className="item-text-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-target">Target: {routineConfig?.recommended_target || 'Self-paced'}</span>
                    </div>
                  </div>

                  {staticEx && (
                    <button
                      type="button"
                      className="item-cue-btn"
                      onClick={() => setInspectedExercise(staticEx)}
                      title="Review exercise instructions"
                    >
                      Instructions
                    </button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Tracker Actions */}
          <div className="tracker-actions">
            <button
              type="button"
              className="cancel-workout-btn"
              onClick={handleCancelWorkout}
            >
              Discard Workout
            </button>
            <button
              type="button"
              className="finish-workout-btn"
              onClick={handleFinishWorkout}
              disabled={isFinishing || completedExercisesCount === 0}
              title={
                completedExercisesCount === 0
                  ? 'Complete at least 1 exercise before finishing'
                  : 'Finish and record session'
              }
            >
              <span>{isFinishing ? 'Saving Session…' : 'Finish Workout'}</span>
              <span aria-hidden="true">✓</span>
            </button>
          </div>
        </section>
      )}

      {/* ====================================================================
          TAB 3: WORKOUT HISTORY
          ==================================================================== */}
      {currentTab === 'history' && (
        <section className="history-container" aria-label="Workout history">
          <div className="history-header">
            <div>
              <h3>Completed Workout History</h3>
              <p className="fitness-header-subtitle">
                Logged sessions saved to your local browser storage.
              </p>
            </div>

            {historyRecords.length > 0 && (
              <button
                type="button"
                className="clear-history-btn"
                onClick={handleClearHistory}
                title="Clear local workout history"
              >
                Clear History
              </button>
            )}
          </div>

          {historyRecords.length === 0 ? (
            <div className="empty-history-panel">
              <span className="empty-icon" aria-hidden="true">📋</span>
              <h4>No workout sessions recorded yet</h4>
              <p>
                Complete your first workout routine to record your session here. Your records survive page refreshes.
              </p>
              <button
                type="button"
                className="routine-start-btn"
                onClick={() => {
                  setActiveTab('overview')
                  handleStartSampleWorkout()
                }}
              >
                <span>Start Sample Workout</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <div className="history-list">
              {historyRecords.map((record) => {
                const dateObj = new Date(record.completed_at)
                const dateStr = !isNaN(dateObj.getTime())
                  ? dateObj.toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })
                  : 'Recent'
                const timeStr = !isNaN(dateObj.getTime())
                  ? dateObj.toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : ''

                return (
                  <article key={record.id} className="history-card">
                    <div className="history-card-top">
                      <h4 className="history-card-title">{record.workout_title}</h4>
                      <span className="history-time">{dateStr} {timeStr}</span>
                    </div>

                    <div className="history-stats-row">
                      <span className="history-stat-chip">
                        ⏱ Duration: {formatDuration(record.duration_seconds)}
                      </span>
                      <span className="history-stat-chip success">
                        ✓ {record.completed_exercises_count} of {record.total_exercises} exercises completed
                      </span>
                    </div>

                    {record.exercises && record.exercises.length > 0 && (
                      <div className="history-exercises-done">
                        {record.exercises.map((ex) => (
                          <span
                            key={ex.id}
                            className={`history-exercise-mini-pill ${ex.completed ? 'completed' : ''}`}
                          >
                            {ex.completed ? '✓ ' : '— '}{ex.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>
      )}

      {/* ====================================================================
          EXERCISE INSTRUCTIONS MODAL
          ==================================================================== */}
      {inspectedExercise && (
        <div
          className="fitness-modal-backdrop"
          onClick={() => setInspectedExercise(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exercise-modal-title"
        >
          <div
            className="fitness-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fitness-modal-header">
              <h3 id="exercise-modal-title">{inspectedExercise.name}</h3>
              <button
                type="button"
                className="fitness-modal-close-btn"
                onClick={() => setInspectedExercise(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="fitness-modal-body">
              <div className="modal-meta-row">
                <span className="exercise-category-tag">{inspectedExercise.category}</span>
                <span className="exercise-difficulty-pill">{inspectedExercise.difficulty}</span>
                <span className="exercise-difficulty-pill">Equipment: {inspectedExercise.equipment}</span>
              </div>

              <div>
                <h4 className="modal-section-title">Overview</h4>
                <p className="exercise-desc">{inspectedExercise.short_description}</p>
                <p className="exercise-muscles">Target Muscles: {inspectedExercise.target_muscle}</p>
              </div>

              <div>
                <h4 className="modal-section-title">Step-by-Step Instructions</h4>
                <ol className="instructions-numbered-list">
                  {inspectedExercise.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="form-tips-box">
                <p className="tips-title">💡 Form Cues &amp; Common Mistakes</p>
                <ul>
                  {inspectedExercise.form_tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="fitness-modal-footer">
              <button
                type="button"
                className="back-dashboard-btn"
                onClick={() => setInspectedExercise(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          WORKOUT COMPLETION SUMMARY MODAL
          ==================================================================== */}
      {summaryRecord && (
        <div
          className="fitness-modal-backdrop"
          onClick={handleCloseSummary}
          role="dialog"
          aria-modal="true"
          aria-labelledby="summary-modal-title"
        >
          <div
            className="fitness-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="summary-celebration-header">
              <span className="celebration-icon" aria-hidden="true">🎉</span>
              <h3 id="summary-modal-title">Workout Completed!</h3>
              <p>Great job finishing your training session. Your progress has been saved.</p>
            </div>

            <div className="summary-metrics-grid">
              <div className="summary-stat-box">
                <span>Routine</span>
                <strong>{summaryRecord.workout_title}</strong>
              </div>
              <div className="summary-stat-box">
                <span>Total Time</span>
                <strong>{formatDuration(summaryRecord.duration_seconds)}</strong>
              </div>
              <div className="summary-stat-box">
                <span>Exercises Completed</span>
                <strong>{summaryRecord.completed_exercises_count} of {summaryRecord.total_exercises}</strong>
              </div>
              <div className="summary-stat-box">
                <span>Status</span>
                <strong style={{ color: storageError ? 'var(--error-text)' : 'var(--success-text)' }}>
                  {storageError ? 'Storage Error (Not Saved to Browser) ⚠' : 'Saved to History ✓'}
                </strong>
              </div>
            </div>

            {storageError && (
              <p style={{ color: 'var(--error-text)', fontSize: '12px', margin: '0 24px 12px', textAlign: 'center' }}>
                {storageError}
              </p>
            )}

            <div className="fitness-modal-footer">
              <button
                type="button"
                className="routine-start-btn"
                onClick={handleCloseSummary}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>View in Workout History</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

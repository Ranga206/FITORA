import type { Exercise, WorkoutTemplate, CompletedSessionRecord, CompletedSessionExercise } from '../../types/fitness'

export const WORKOUT_HISTORY_STORAGE_KEY = 'fitora_workout_history'

export const STATIC_EXERCISES: Exercise[] = [
  {
    id: 'ex-squat',
    name: 'Bodyweight Squat',
    category: 'Strength',
    target_muscle: 'Quadriceps, Glutes, Hamstrings',
    equipment: 'Bodyweight only',
    difficulty: 'Beginner',
    short_description: 'A fundamental lower-body movement building strength in the quads, hamstrings, and glutes.',
    instructions: [
      'Stand upright with feet shoulder-width apart, toes pointing slightly outward (about 10–15 degrees).',
      'Brace your core and keep your chest elevated with shoulders back.',
      'Hinge at the hips and bend your knees to lower your body, as if sitting back into an imaginary chair.',
      'Descend until your thighs are roughly parallel to the floor, ensuring knees track over toes.',
      'Push evenly through your midfoot and heels to drive back up to the starting position.'
    ],
    form_tips: [
      'Keep your heels flat on the floor throughout the entire movement.',
      'Avoid letting your knees collapse inward during either descent or ascent.'
    ]
  },
  {
    id: 'ex-pushup',
    name: 'Standard / Incline Push-Up',
    category: 'Strength',
    target_muscle: 'Chest, Shoulders, Triceps, Core',
    equipment: 'Bodyweight only',
    difficulty: 'Beginner',
    short_description: 'An essential upper-body compound movement developing chest, arm, and anterior core stability.',
    instructions: [
      'Assume a high plank position with hands planted slightly wider than shoulder-width.',
      'Keep your body aligned in a straight line from heels to head with glutes and core engaged.',
      'Lower your chest toward the floor by bending your elbows at roughly a 45-degree angle from your torso.',
      'Lower until your chest is a few inches above the floor.',
      'Press firmly through your palms to return to the starting plank position.'
    ],
    form_tips: [
      'Do not let your hips sag down or pike upward; maintain a rigid torso.',
      'If standard push-ups feel too demanding, place hands on an elevated surface like a bench or wall.'
    ]
  },
  {
    id: 'ex-glute-bridge',
    name: 'Glute Bridge',
    category: 'Mobility & Activation',
    target_muscle: 'Glutes, Hamstrings, Lower Back',
    equipment: 'Bodyweight only',
    difficulty: 'Beginner',
    short_description: 'An accessible posterior-chain exercise that activates the gluteal muscles and promotes hip extension.',
    instructions: [
      'Lie flat on your back on a mat with knees bent and feet flat on the floor, about hip-width apart.',
      'Place arms alongside your torso with palms facing down for stability.',
      'Squeeze your glutes and push through your heels to raise your hips upward.',
      'Lift until your knees, hips, and shoulders form a straight diagonal line.',
      'Hold the peak contraction for 1–2 seconds, then lower your hips back to the floor with control.'
    ],
    form_tips: [
      'Avoid hyperextending or arching your lower back at the top; focus the tension in your glutes.',
      'Drive primarily through your heels rather than your toes.'
    ]
  },
  {
    id: 'ex-plank',
    name: 'Forearm Plank',
    category: 'Core',
    target_muscle: 'Transverse Abdominis, Rectus Abdominis, Shoulders',
    equipment: 'Bodyweight only',
    difficulty: 'Beginner',
    short_description: 'An isometric core hold that builds endurance, spinal stability, and postural strength.',
    instructions: [
      'Place forearms on the floor with elbows positioned directly beneath your shoulders.',
      'Extend both legs straight back with feet hip-width apart, balancing on the balls of your feet.',
      'Brace your abdominal muscles as if anticipating an impact, squeeze your glutes, and keep thighs firm.',
      'Maintain a neutral neck by looking down at the floor between your hands.',
      'Hold this position while breathing smoothly and rhythmically throughout.'
    ],
    form_tips: [
      'Avoid holding your breath; steady breathing helps maintain core tension.',
      'Stop or rest if your lower back begins to sag downward.'
    ]
  },
  {
    id: 'ex-reverse-lunge',
    name: 'Reverse Lunge',
    category: 'Strength',
    target_muscle: 'Quadriceps, Glutes, Calves',
    equipment: 'Bodyweight only',
    difficulty: 'Beginner',
    short_description: 'A unilateral lower-body exercise that enhances balance, hip coordination, and single-leg strength.',
    instructions: [
      'Stand upright with feet together and hands placed comfortably on hips or clasped at your chest.',
      'Step backward with your left foot and lower your hips until both knees are bent at roughly 90 degrees.',
      'Ensure your front (right) knee stays positioned over your ankle, without drifting excessively forward.',
      'Press firmly through your front heel to step your left leg forward back to the starting stance.',
      'Repeat on the opposite side, alternating legs in a steady rhythm.'
    ],
    form_tips: [
      'Keep your torso upright and tall rather than leaning forward over your front thigh.',
      'Step back far enough so your front shin remains nearly vertical.'
    ]
  },
  {
    id: 'ex-bird-dog',
    name: 'Bird-Dog Stability Hold',
    category: 'Mobility & Activation',
    target_muscle: 'Core, Glutes, Upper & Lower Back',
    equipment: 'Bodyweight only',
    difficulty: 'Beginner',
    short_description: 'A low-impact balance and spine-stabilizing exercise targeting cross-body coordination.',
    instructions: [
      'Start on all fours (tabletop position) with wrists beneath shoulders and knees beneath hips.',
      'Brace your core muscles and maintain a flat, neutral spine.',
      'Simultaneously reach your right arm straight forward and extend your left leg straight back.',
      'Hold at peak extension for 1–2 seconds, keeping hips and shoulders parallel to the floor.',
      'Return with control to tabletop, then alternate to your left arm and right leg.'
    ],
    form_tips: [
      'Focus on slow, deliberate control rather than speed.',
      'Do not allow your lower back to dip or your hips to tilt toward either side.'
    ]
  }
]

export const SAMPLE_WORKOUT_ROUTINE: WorkoutTemplate = {
  id: 'workout-beginner-full-body',
  title: 'Beginner Full-Body Starter Routine',
  description: 'A gentle, structured 15-minute bodyweight routine targeting all major muscle groups with safe movement patterns.',
  estimated_minutes: 15,
  difficulty: 'Beginner',
  exercises: [
    { exercise_id: 'ex-squat', recommended_target: '10–12 repetitions' },
    { exercise_id: 'ex-pushup', recommended_target: '8–10 repetitions' },
    { exercise_id: 'ex-glute-bridge', recommended_target: '12–15 repetitions' },
    { exercise_id: 'ex-plank', recommended_target: '20–30 second hold' },
    { exercise_id: 'ex-reverse-lunge', recommended_target: '8 repetitions per leg' },
    { exercise_id: 'ex-bird-dog', recommended_target: '6 repetitions per side' }
  ]
}

/**
 * Safely parses raw stored string, attempting object-level recovery if the overall array JSON is malformed.
 */
function safeParseRawHistory(raw: string): unknown[] {
  if (!raw || !raw.trim()) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    if (parsed && typeof parsed === 'object') return [parsed]
    return []
  } catch {
    // If the full array string is malformed (e.g. truncated or bad syntax),
    // attempt to salvage individual JSON objects matching { ... } so valid records are not lost
    const recovered: unknown[] = []
    const objectRegex = /\{[\s\S]*?\}(?=\s*[,\]]|\s*$)/g
    const matches = raw.match(objectRegex) || []
    for (const chunk of matches) {
      try {
        const obj = JSON.parse(chunk)
        if (obj && typeof obj === 'object') {
          recovered.push(obj)
        }
      } catch {
        // Skip unparseable chunks
      }
    }
    return recovered
  }
}

/**
 * Normalizes an unknown item into a valid CompletedSessionRecord or returns null if unrecoverable.
 */
function normalizeRecord(item: unknown): CompletedSessionRecord | null {
  if (!item || typeof item !== 'object') return null
  const obj = item as Record<string, unknown>

  // Workout title or name
  const title = typeof obj.workout_title === 'string' && obj.workout_title.trim()
    ? obj.workout_title.trim()
    : typeof obj.workout_name === 'string' && obj.workout_name.trim()
      ? obj.workout_name.trim()
      : typeof obj.title === 'string' && obj.title.trim()
        ? obj.title.trim()
        : null

  if (!title) return null

  // Record ID
  const id = typeof obj.id === 'string' && obj.id.trim()
    ? obj.id.trim()
    : `workout-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

  // Date / timestamp
  const rawDate = typeof obj.completed_at === 'string'
    ? obj.completed_at
    : typeof obj.date === 'string'
      ? obj.date
      : null
  const dateValid = rawDate && !isNaN(new Date(rawDate).getTime())
  const completed_at = dateValid ? rawDate : new Date().toISOString()

  // Duration
  const rawDuration = typeof obj.duration_seconds === 'number'
    ? obj.duration_seconds
    : typeof obj.duration === 'number'
      ? obj.duration
      : 0
  const duration_seconds = Number.isFinite(rawDuration) && rawDuration >= 0 ? rawDuration : 0

  // Exercises
  let exercises: CompletedSessionExercise[] = []
  if (Array.isArray(obj.exercises)) {
    exercises = obj.exercises
      .map((ex, idx): CompletedSessionExercise | null => {
        if (typeof ex === 'string' && ex.trim()) {
          return { id: `ex-${idx}`, name: ex.trim(), completed: true }
        }
        if (ex && typeof ex === 'object') {
          const exObj = ex as Record<string, unknown>
          const name = typeof exObj.name === 'string' && exObj.name.trim()
            ? exObj.name.trim()
            : `Exercise ${idx + 1}`
          const exId = typeof exObj.id === 'string' && exObj.id.trim()
            ? exObj.id.trim()
            : `ex-${idx}`
          const completed = typeof exObj.completed === 'boolean' ? exObj.completed : true
          return { id: exId, name, completed }
        }
        return null
      })
      .filter((ex): ex is CompletedSessionExercise => ex !== null)
  }

  const total_exercises = typeof obj.total_exercises === 'number' && Number.isFinite(obj.total_exercises) && obj.total_exercises > 0
    ? obj.total_exercises
    : exercises.length > 0 ? exercises.length : 1

  const completed_exercises_count = typeof obj.completed_exercises_count === 'number' && Number.isFinite(obj.completed_exercises_count)
    ? obj.completed_exercises_count
    : exercises.filter((e) => e.completed).length

  return {
    id,
    workout_title: title,
    completed_at,
    duration_seconds,
    total_exercises,
    completed_exercises_count,
    exercises
  }
}

export function loadWorkoutHistory(): CompletedSessionRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(WORKOUT_HISTORY_STORAGE_KEY)
    if (!raw) return []

    const parsedItems = safeParseRawHistory(raw)
    const normalized = parsedItems
      .map(normalizeRecord)
      .filter((r): r is CompletedSessionRecord => r !== null)

    // Sort descending by completion date (newest first)
    return normalized.sort((a, b) => {
      const timeA = new Date(a.completed_at).getTime()
      const timeB = new Date(b.completed_at).getTime()
      return timeB - timeA
    })
  } catch {
    return []
  }
}

export function saveWorkoutSession(record: CompletedSessionRecord): boolean {
  if (typeof window === 'undefined') return false
  try {
    const current = loadWorkoutHistory()
    // Prevent duplicate records with the same ID
    const deduplicated = current.filter((item) => item.id !== record.id)
    const updated = [record, ...deduplicated]
    localStorage.setItem(WORKOUT_HISTORY_STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch {
    return false
  }
}

export function clearWorkoutHistory(): boolean {
  if (typeof window === 'undefined') return false
  try {
    localStorage.removeItem(WORKOUT_HISTORY_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}


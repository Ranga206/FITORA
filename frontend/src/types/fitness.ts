export interface Exercise {
  id: string
  name: string
  category: 'Strength' | 'Core' | 'Mobility & Activation'
  target_muscle: string
  equipment: string
  difficulty: 'Beginner' | 'Intermediate'
  short_description: string
  instructions: string[]
  form_tips: string[]
}

export interface WorkoutTemplate {
  id: string
  title: string
  description: string
  estimated_minutes: number
  difficulty: string
  exercises: {
    exercise_id: string
    recommended_target: string
  }[]
}

export interface CompletedSessionExercise {
  id: string
  name: string
  completed: boolean
}

export interface CompletedSessionRecord {
  id: string
  workout_title: string
  completed_at: string
  duration_seconds: number
  total_exercises: number
  completed_exercises_count: number
  exercises: CompletedSessionExercise[]
}

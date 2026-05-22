export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export type Category = 'network' | 'coding' | 'hardware'

export interface VocabularyTerm {
  id: string
  term: string
  definition: string
  category: Category
  difficulty: DifficultyLevel
  example: string
  synonyms?: string[]
  relatedTerms?: string[]
}

export interface QuizQuestion {
  id: string
  term: VocabularyTerm
  type: 'multiple-choice' | 'matching' | 'fill-in-blank'
  options?: string[]
  correctAnswer: string
}

export interface UserProgress {
  userId: string
  category: Category
  level: DifficultyLevel
  correctAnswers: number
  totalQuestions: number
  streak: number
  lastStudied: Date
  masteredTerms: string[]
}

export interface QuizResult {
  questionId: string
  termId: string
  isCorrect: boolean
  userAnswer: string
  correctAnswer: string
  timeSpent: number
}

export interface LearningSession {
  id: string
  category: Category
  level: DifficultyLevel
  startTime: Date
  endTime?: Date
  results: QuizResult[]
  score: number
}

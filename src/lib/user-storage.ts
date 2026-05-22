// localStorage-based user & progress system
// Works without a database — all data persisted in browser

import { vocabularyDatabase } from './vocabulary-data'

// ─── Types ───────────────────────────────────────────────

export interface UserProfile {
  id: string
  username: string
  createdAt: string
}

export interface QuizSessionRecord {
  id: string
  category: string
  level: string
  score: number
  totalQuestions: number
  correctAnswers: number
  date: string
  results: QuizResultRecord[]
}

export interface QuizResultRecord {
  termId: string
  isCorrect: boolean
  userAnswer: string
  correctAnswer: string
}

export interface CategoryProgressData {
  category: string
  name: string
  termsLearned: number
  totalTerms: number
  averageScore: number
  quizzesTaken: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string | null
  condition: (stats: OverallStats) => boolean
}

export interface OverallStats {
  totalTermsLearned: number
  totalQuizzesTaken: number
  averageScore: number
  currentStreak: number
  bestStreak: number
  totalCorrectAnswers: number
  totalQuestions: number
  categoryStats: Record<string, { termsLearned: number; quizzesTaken: number; avgScore: number }>
}

// ─── Storage Keys ────────────────────────────────────────

const KEYS = {
  USER_PROFILE: 'vocab_user_profile',
  QUIZ_SESSIONS: 'vocab_quiz_sessions',
  MASTERED_TERMS: 'vocab_mastered_terms',
  STREAK_DATA: 'vocab_streak_data',
  ACHIEVEMENTS: 'vocab_achievements',
} as const

// ─── Helpers ─────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

// ─── User Profile ────────────────────────────────────────

export function getUser(): UserProfile | null {
  return getFromStorage<UserProfile | null>(KEYS.USER_PROFILE, null)
}

export function getOrCreateUser(username?: string): UserProfile {
  const existing = getUser()
  if (existing) return existing

  const user: UserProfile = {
    id: generateId(),
    username: username || 'Learner',
    createdAt: new Date().toISOString(),
  }
  setToStorage(KEYS.USER_PROFILE, user)
  return user
}

export function updateUsername(username: string): UserProfile {
  const user = getOrCreateUser()
  user.username = username
  setToStorage(KEYS.USER_PROFILE, user)
  return user
}

// ─── Quiz Sessions ───────────────────────────────────────

export function getSessions(): QuizSessionRecord[] {
  return getFromStorage<QuizSessionRecord[]>(KEYS.QUIZ_SESSIONS, [])
}

export function saveQuizResult(
  category: string,
  level: string,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  results: QuizResultRecord[]
): QuizSessionRecord {
  const sessions = getSessions()

  const session: QuizSessionRecord = {
    id: generateId(),
    category,
    level,
    score,
    totalQuestions,
    correctAnswers,
    date: new Date().toISOString(),
    results,
  }

  sessions.push(session)
  setToStorage(KEYS.QUIZ_SESSIONS, sessions)

  // Update mastered terms
  const mastered = getMasteredTermIds()
  results.forEach((r) => {
    if (r.isCorrect && !mastered.includes(r.termId)) {
      mastered.push(r.termId)
    }
  })
  setToStorage(KEYS.MASTERED_TERMS, mastered)

  // Update streak
  updateStreak()

  // Recalculate achievements
  recalculateAchievements()

  return session
}

export function getRecentSessions(limit: number = 10): QuizSessionRecord[] {
  const sessions = getSessions()
  return sessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// ─── Mastered Terms ──────────────────────────────────────

export function getMasteredTermIds(): string[] {
  return getFromStorage<string[]>(KEYS.MASTERED_TERMS, [])
}

export function getMasteredTermsByCategory(category: string): string[] {
  const allMastered = getMasteredTermIds()
  const categoryTermIds = vocabularyDatabase
    .filter((t) => t.category === category)
    .map((t) => t.id)
  return allMastered.filter((id) => categoryTermIds.includes(id))
}

// ─── Streak ──────────────────────────────────────────────

interface StreakData {
  currentStreak: number
  bestStreak: number
  lastActiveDate: string | null
}

function getStreakData(): StreakData {
  return getFromStorage<StreakData>(KEYS.STREAK_DATA, {
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
  })
}

function updateStreak(): void {
  const data = getStreakData()
  const today = new Date().toISOString().split('T')[0]

  if (data.lastActiveDate === today) {
    // Already active today, no change
    return
  }

  if (data.lastActiveDate) {
    const lastDate = new Date(data.lastActiveDate)
    const todayDate = new Date(today)
    const diffDays = Math.floor(
      (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays === 1) {
      // Consecutive day
      data.currentStreak += 1
    } else if (diffDays > 1) {
      // Streak broken
      data.currentStreak = 1
    }
  } else {
    // First ever activity
    data.currentStreak = 1
  }

  data.bestStreak = Math.max(data.bestStreak, data.currentStreak)
  data.lastActiveDate = today

  setToStorage(KEYS.STREAK_DATA, data)
}

export function getStreak(): { current: number; best: number } {
  const data = getStreakData()

  // Check if streak is still active (last active was today or yesterday)
  if (data.lastActiveDate) {
    const lastDate = new Date(data.lastActiveDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const diffDays = Math.floor(
      (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays > 1) {
      // Streak is broken
      return { current: 0, best: data.bestStreak }
    }
  }

  return { current: data.currentStreak, best: data.bestStreak }
}

// ─── Overall Stats ───────────────────────────────────────

export function getOverallStats(): OverallStats {
  const sessions = getSessions()
  const mastered = getMasteredTermIds()
  const streak = getStreak()

  const categoryStats: Record<string, { termsLearned: number; quizzesTaken: number; avgScore: number }> = {}

  const categories = ['network', 'coding', 'hardware']
  categories.forEach((cat) => {
    const catSessions = sessions.filter((s) => s.category === cat)
    const catMastered = getMasteredTermsByCategory(cat)
    const avgScore =
      catSessions.length > 0
        ? Math.round(catSessions.reduce((sum, s) => sum + s.score, 0) / catSessions.length)
        : 0

    categoryStats[cat] = {
      termsLearned: catMastered.length,
      quizzesTaken: catSessions.length,
      avgScore,
    }
  })

  const totalQuizzesTaken = sessions.length
  const averageScore =
    totalQuizzesTaken > 0
      ? Math.round(sessions.reduce((sum, s) => sum + s.score, 0) / totalQuizzesTaken)
      : 0

  const totalCorrectAnswers = sessions.reduce((sum, s) => sum + s.correctAnswers, 0)
  const totalQuestions = sessions.reduce((sum, s) => sum + s.totalQuestions, 0)

  return {
    totalTermsLearned: mastered.length,
    totalQuizzesTaken,
    averageScore,
    currentStreak: streak.current,
    bestStreak: streak.best,
    totalCorrectAnswers,
    totalQuestions,
    categoryStats,
  }
}

// ─── Category Progress ───────────────────────────────────

export function getCategoryProgress(): CategoryProgressData[] {
  const stats = getOverallStats()

  const categoryMeta: Record<string, { name: string; totalTerms: number }> = {
    network: { name: 'Network', totalTerms: vocabularyDatabase.filter((t) => t.category === 'network').length },
    coding: { name: 'Coding', totalTerms: vocabularyDatabase.filter((t) => t.category === 'coding').length },
    hardware: { name: 'Hardware', totalTerms: vocabularyDatabase.filter((t) => t.category === 'hardware').length },
  }

  return Object.entries(categoryMeta).map(([cat, meta]) => ({
    category: cat,
    name: meta.name,
    termsLearned: stats.categoryStats[cat]?.termsLearned || 0,
    totalTerms: meta.totalTerms,
    averageScore: stats.categoryStats[cat]?.avgScore || 0,
    quizzesTaken: stats.categoryStats[cat]?.quizzesTaken || 0,
  }))
}

// ─── Achievements ────────────────────────────────────────

const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt'>[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    condition: (s) => s.totalQuizzesTaken >= 1,
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Complete 5 quizzes',
    icon: '🏅',
    condition: (s) => s.totalQuizzesTaken >= 5,
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: '💯',
    condition: (_s) => {
      const sessions = getSessions()
      return sessions.some((s) => s.score === 100)
    },
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: '7 day learning streak',
    icon: '🔥',
    condition: (s) => s.currentStreak >= 7 || s.bestStreak >= 7,
  },
  {
    id: 'network_explorer',
    title: 'Network Explorer',
    description: 'Learn 5+ network terms',
    icon: '🌐',
    condition: (s) => (s.categoryStats['network']?.termsLearned || 0) >= 5,
  },
  {
    id: 'code_ninja',
    title: 'Code Ninja',
    description: 'Learn 5+ coding terms',
    icon: '💻',
    condition: (s) => (s.categoryStats['coding']?.termsLearned || 0) >= 5,
  },
  {
    id: 'hardware_hero',
    title: 'Hardware Hero',
    description: 'Learn 5+ hardware terms',
    icon: '🔧',
    condition: (s) => (s.categoryStats['hardware']?.termsLearned || 0) >= 5,
  },
  {
    id: 'vocabulary_king',
    title: 'Vocabulary King',
    description: 'Learn 20+ terms total',
    icon: '👑',
    condition: (s) => s.totalTermsLearned >= 20,
  },
  {
    id: 'dedicated_learner',
    title: 'Dedicated Learner',
    description: 'Complete 10+ quizzes',
    icon: '📚',
    condition: (s) => s.totalQuizzesTaken >= 10,
  },
]

function recalculateAchievements(): void {
  const stats = getOverallStats()
  const stored = getFromStorage<Record<string, string>>(KEYS.ACHIEVEMENTS, {})

  ACHIEVEMENT_DEFINITIONS.forEach((def) => {
    if (!stored[def.id] && def.condition(stats)) {
      stored[def.id] = new Date().toISOString()
    }
  })

  setToStorage(KEYS.ACHIEVEMENTS, stored)
}

export function getAchievements(): Achievement[] {
  const stored = getFromStorage<Record<string, string>>(KEYS.ACHIEVEMENTS, {})
  const stats = getOverallStats()

  return ACHIEVEMENT_DEFINITIONS.map((def) => {
    // Re-check in case achievement wasn't previously detected
    const isUnlocked = !!stored[def.id] || def.condition(stats)
    return {
      ...def,
      unlockedAt: stored[def.id] || (isUnlocked ? new Date().toISOString() : null),
    }
  })
}

export function getUnlockedAchievements(): Achievement[] {
  return getAchievements().filter((a) => a.unlockedAt !== null)
}

// ─── Reset (for testing) ─────────────────────────────────

export function resetAllData(): void {
  if (typeof window === 'undefined') return
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}

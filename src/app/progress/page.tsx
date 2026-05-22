'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, Award, Target, BookOpen, Network, Code, HardDrive, Sparkles, Clock, Flame, Trophy, Zap } from 'lucide-react'
import {
  getOverallStats,
  getCategoryProgress,
  getUnlockedAchievements,
  getRecentSessions,
  getOrCreateUser,
  type OverallStats,
  type CategoryProgressData,
  type Achievement,
  type QuizSessionRecord,
  type UserProfile,
} from '@/lib/user-storage'

const categoryIcons: Record<string, typeof Network> = {
  network: Network,
  coding: Code,
  hardware: HardDrive,
}

const categoryColors: Record<string, string> = {
  network: 'from-blue-500 to-cyan-500',
  coding: 'from-purple-500 to-pink-500',
  hardware: 'from-orange-500 to-red-500',
}

export default function ProgressPage() {
  const [stats, setStats] = useState<OverallStats | null>(null)
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgressData[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [recentSessions, setRecentSessions] = useState<QuizSessionRecord[]>([])
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const u = getOrCreateUser()
    setUser(u)
    setStats(getOverallStats())
    setCategoryProgress(getCategoryProgress())
    setAchievements(getUnlockedAchievements())
    setRecentSessions(getRecentSessions(10))
    setIsLoaded(true)
  }, [])

  if (!isLoaded || !stats) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Sparkles className="w-12 h-12 text-primary-600" />
        </motion.div>
        <p className="mt-4 text-gray-600">Loading your progress...</p>
      </div>
    )
  }

  const hasData = stats.totalQuizzesTaken > 0

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">Your Progress</h1>
            <p className="text-xl text-gray-600">
              {user?.username ? `Welcome back, ${user.username}!` : 'Track your learning journey'}
            </p>
          </div>
          {stats.currentStreak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-5 py-3 rounded-2xl border-2 border-orange-200"
            >
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="text-2xl font-bold text-orange-600">{stats.currentStreak}</span>
              <span className="text-orange-700 font-medium">day streak!</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Empty State */}
      {!hasData && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-20 glass-effect rounded-3xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Trophy className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-700 mb-4">No Progress Yet</h2>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            Start your first quiz to see your progress, earn achievements, and track your learning journey!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="w-5 h-5" />
              Start Learning Now
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Stats Overview */}
      {hasData && (
        <>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-primary-600" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="text-3xl font-bold"
                >
                  {stats.totalTermsLearned}
                </motion.span>
              </div>
              <p className="text-gray-600 font-medium">Terms Learned</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-secondary-600" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="text-3xl font-bold"
                >
                  {stats.totalQuizzesTaken}
                </motion.span>
              </div>
              <p className="text-gray-600 font-medium">Quizzes Taken</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="text-3xl font-bold"
                >
                  {stats.averageScore}%
                </motion.span>
              </div>
              <p className="text-gray-600 font-medium">Average Score</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-yellow-600" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="text-3xl font-bold"
                >
                  {stats.currentStreak}
                </motion.span>
              </div>
              <p className="text-gray-600 font-medium">Day Streak 🔥</p>
            </motion.div>
          </div>

          {/* Category Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Category Progress</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {categoryProgress.map((category, index) => {
                const progress = category.totalTerms > 0
                  ? (category.termsLearned / category.totalTerms) * 100
                  : 0
                const IconComponent = categoryIcons[category.category] || BookOpen
                const color = categoryColors[category.category] || 'from-gray-500 to-gray-600'

                return (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="glass-effect rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`bg-gradient-to-r ${color} p-3 rounded-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{category.termsLearned} / {category.totalTerms} terms</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                          className={`h-full bg-gradient-to-r ${color}`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Avg. Score:</span>
                      <span className="font-semibold text-primary-600">
                        {category.averageScore > 0 ? `${category.averageScore}%` : '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-600">Quizzes:</span>
                      <span className="font-semibold text-gray-800">{category.quizzesTaken}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-effect rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Achievements
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({achievements.length} unlocked)
              </span>
            </h2>
            {achievements.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + (index * 0.05) }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border-2 border-primary-100"
                  >
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 truncate">{achievement.description}</p>
                      {achievement.unlockedAt && (
                        <p className="text-xs text-primary-500 mt-0.5">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Complete quizzes to unlock achievements!</p>
              </div>
            )}
          </motion.div>

          {/* Recent Sessions */}
          {recentSessions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="glass-effect rounded-xl p-8 mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-600" />
                Recent Quiz Sessions
              </h2>
              <div className="space-y-3">
                {recentSessions.map((session, index) => {
                  const IconComponent = categoryIcons[session.category] || BookOpen
                  const color = categoryColors[session.category] || 'from-gray-500 to-gray-600'
                  return (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + (index * 0.05) }}
                      className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all"
                    >
                      <div className={`bg-gradient-to-r ${color} p-2.5 rounded-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-800 capitalize">{session.category}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                            {session.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {session.correctAnswers}/{session.totalQuestions} correct
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${
                          session.score >= 80 ? 'text-green-600' :
                          session.score >= 50 ? 'text-yellow-600' : 'text-red-500'
                        }`}>
                          {session.score}%
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Motivational Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: hasData ? 1.2 : 0.4 }}
        className="text-center glass-effect rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold mb-4">
          {hasData ? 'Keep Going! 💪' : 'Start Your Journey! 🚀'}
        </h3>
        <p className="text-gray-600 mb-6">
          {hasData
            ? 'You\'re making great progress! Continue learning to unlock more achievements.'
            : 'Begin with any category and difficulty level. Every expert was once a beginner!'}
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/learn"
            className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Continue Learning
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

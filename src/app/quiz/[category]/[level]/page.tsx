'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Check, X, Trophy, RotateCcw, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { getTermsByCategoryAndDifficulty, vocabularyDatabase } from '@/lib/vocabulary-data'
import { generateQuiz, calculateScore, getPerformanceFeedback } from '@/lib/quiz-generator'
import { QuizQuestion, QuizResult } from '@/types'
import { saveQuizResult as saveToStorage, getOrCreateUser, getAdaptiveTerms } from '@/lib/user-storage'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string
  const level = params.level as string

  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let terms;
    if (level === 'adaptive') {
      terms = getAdaptiveTerms(category).terms;
    } else {
      terms = getTermsByCategoryAndDifficulty(category, level);
    }
    const shuffledTerms = [...terms].sort(() => Math.random() - 0.5)
    const quiz = generateQuiz(shuffledTerms, vocabularyDatabase, 10)
    setQuestions(quiz)
    setStartTime(Date.now())
  }, [category, level])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer && !userAnswer) return

    const answer = currentQuestion.type === 'fill-in-blank' ? userAnswer : selectedAnswer
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim()
    const timeSpent = Date.now() - startTime

    const result: QuizResult = {
      questionId: currentQuestion.id,
      termId: currentQuestion.term.id,
      isCorrect,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      timeSpent,
    }

    setQuizResults([...quizResults, result])
    setShowResult(true)
  }

  const saveQuizSession = async () => {
    setIsSaving(true)
    try {
      // Ensure user exists
      getOrCreateUser()

      const score = calculateScore(quizResults)
      const correctCount = quizResults.filter(r => r.isCorrect).length

      // Save to localStorage (always works)
      saveToStorage(
        category,
        level,
        score,
        quizResults.length,
        correctCount,
        quizResults.map(r => ({
          termId: r.termId,
          isCorrect: r.isCorrect,
          userAnswer: r.userAnswer,
          correctAnswer: r.correctAnswer,
        }))
      )
      console.log('✅ Quiz session saved to localStorage')

      // Also try saving to DB (optional, may fail silently)
      try {
        await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category,
            level,
            score,
            totalQuestions: quizResults.length,
            results: quizResults,
          }),
        })
      } catch {
        // DB save is optional
      }
    } catch (error) {
      console.error('❌ Failed to save quiz session:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer('')
      setUserAnswer('')
      setShowResult(false)
      setStartTime(Date.now())
    } else {
      setIsQuizComplete(true)
      saveQuizSession()
    }
  }

  const handleRetry = () => {
    const terms = getTermsByCategoryAndDifficulty(category, level)
    const shuffledTerms = [...terms].sort(() => Math.random() - 0.5)
    const quiz = generateQuiz(shuffledTerms, vocabularyDatabase, 10)
    setQuestions(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setUserAnswer('')
    setShowResult(false)
    setQuizResults([])
    setIsQuizComplete(false)
    setStartTime(Date.now())
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <Sparkles className="w-12 h-12 text-primary-600" />
        </motion.div>
        <p className="mt-4 text-gray-600">Loading quiz...</p>
      </div>
    )
  }

  if (isQuizComplete) {
    const score = calculateScore(quizResults)
    const feedback = getPerformanceFeedback(score)

    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass-effect rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <Trophy className="w-24 h-24 text-yellow-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold mb-2"
            >
              Quiz Complete! {feedback.emoji}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`text-xl ${feedback.color} font-semibold`}
            >
              {feedback.message}
            </motion.p>
            
            {isSaving && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 mt-2"
              >
                Saving your progress...
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="text-7xl font-bold gradient-text mb-2"
              >
                {score}%
              </motion.div>
              <div className="text-gray-600 text-lg">
                {quizResults.filter(r => r.isCorrect).length} out of {quizResults.length} correct
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              Review Your Answers
            </h3>
            {quizResults.map((result, index) => {
              const question = questions.find(q => q.id === result.questionId)
              return (
                <motion.div
                  key={result.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                  className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                    result.isCorrect
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold flex-1">
                      {index + 1}. {question?.term.term}
                    </span>
                    {result.isCorrect ? (
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                  {!result.isCorrect && (
                    <div className="text-sm space-y-1">
                      <div className="text-red-700">
                        <span className="font-medium">Your answer:</span> {result.userAnswer}
                      </div>
                      <div className="text-green-700">
                        <span className="font-medium">Correct answer:</span> {result.correctAnswer}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </motion.button>
            
            <Link href="/learn" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-4 rounded-full font-semibold transition-all"
              >
                Back to Learn
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href={`/learn/${category}/${level}`}
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Terms
        </Link>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-bold text-primary-600">{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 shadow-lg"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="glass-effect rounded-2xl p-8 shadow-2xl"
          >
            <div className="mb-6">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-4 text-gray-800"
              >
                {currentQuestion.type === 'fill-in-blank'
                  ? 'Fill in the blank:'
                  : `What is "${currentQuestion.term.term}"?`}
              </motion.h2>
              
              {currentQuestion.type === 'fill-in-blank' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-primary-500"
                >
                  {currentQuestion.term.example}
                </motion.p>
              )}
            </div>

            {/* Answer Options */}
            {currentQuestion.type === 'fill-in-blank' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showResult}
                  placeholder="Type your answer..."
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none disabled:bg-gray-100 text-lg transition-all"
                />
              </motion.div>
            ) : (
              <div className="space-y-3 mb-6">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === currentQuestion.correctAnswer
                  const showCorrect = showResult && isCorrect
                  const showWrong = showResult && isSelected && !isCorrect

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                      whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                      className={`w-full p-5 rounded-xl text-left transition-all border-2 font-medium ${
                        showCorrect
                          ? 'bg-green-100 border-green-400 shadow-lg shadow-green-200'
                          : showWrong
                          ? 'bg-red-100 border-red-400 shadow-lg shadow-red-200'
                          : isSelected
                          ? 'bg-primary-100 border-primary-500 shadow-lg'
                          : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex-1 pr-4">{option}</span>
                        {showCorrect && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring' }}
                          >
                            <Check className="w-6 h-6 text-green-600" />
                          </motion.div>
                        )}
                        {showWrong && (
                          <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring' }}
                          >
                            <X className="w-6 h-6 text-red-600" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!showResult ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer && !userAnswer}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Submit Answer
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextQuestion}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
                </motion.button>
              )}
            </div>

            {/* Feedback */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring' }}
                className={`mt-6 p-5 rounded-xl shadow-lg ${
                  quizResults[quizResults.length - 1]?.isCorrect
                    ? 'bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300'
                    : 'bg-gradient-to-r from-red-100 to-red-50 border-2 border-red-300'
                }`}
              >
                <p className="font-bold text-lg mb-2 flex items-center gap-2">
                  {quizResults[quizResults.length - 1]?.isCorrect ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span className="text-green-800">Correct! Well done! 🎉</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" />
                      <span className="text-red-800">Not quite right</span>
                    </>
                  )}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">Definition:</span> {currentQuestion.term.definition}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

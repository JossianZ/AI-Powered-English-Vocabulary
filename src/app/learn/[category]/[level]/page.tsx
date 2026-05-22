'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Play, BookOpen, Trophy, Sparkles, Zap, Star } from 'lucide-react'
import Link from 'next/link'
import { getTermsByCategoryAndDifficulty } from '@/lib/vocabulary-data'
import { getAdaptiveTerms } from '@/lib/user-storage'
import { VocabularyTerm } from '@/types'

export default function CategoryLevelPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string
  const level = params.level as string
  
  const [terms, setTerms] = useState<VocabularyTerm[]>([])
  const [selectedTermIndex, setSelectedTermIndex] = useState<number | null>(null)

  useEffect(() => {
    if (level === 'adaptive') {
      const { terms: adaptiveTerms } = getAdaptiveTerms(category)
      setTerms(adaptiveTerms)
    } else {
      const fetchedTerms = getTermsByCategoryAndDifficulty(category, level)
      setTerms(fetchedTerms)
    }
  }, [category, level])

  const categoryInfo = {
    network: { title: 'Network', color: 'from-blue-500 to-cyan-500', icon: '🌐' },
    coding: { title: 'Coding', color: 'from-purple-500 to-pink-500', icon: '💻' },
    hardware: { title: 'Hardware', color: 'from-orange-500 to-red-500', icon: '🔧' },
  }

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-r ${currentCategory?.color} rounded-full blur-3xl`}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/learn"
              className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Categories
            </Link>
          </motion.div>
          
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 mb-3"
              >
                <span className="text-4xl">{currentCategory?.icon}</span>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                  {currentCategory?.title}
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                {level === 'adaptive' ? (
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Adaptive ✨</span>
                  </div>
                ) : (
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r ${currentCategory?.color} text-white shadow-lg`}>
                    {level.charAt(0).toUpperCase() + level.slice(1)} Level
                  </span>
                )}
                <span className="text-gray-600 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{terms.length} terms</span>
                </span>
              </motion.div>
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(`/quiz/${category}/${level}`)}
              className={`bg-gradient-to-r ${currentCategory?.color} text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center space-x-3 group`}
            >
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Start Quiz</span>
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term, index) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setSelectedTermIndex(index)}
              className="glass-effect rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors pr-2">
                    {term.term}
                  </h3>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BookOpen className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  </motion.div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{term.definition}</p>
                
                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                  <span className="text-primary-600 font-semibold group-hover:text-primary-700 flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>View Details</span>
                  </span>
                  {term.synonyms && term.synonyms.length > 0 && (
                    <span className="text-gray-400 flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>+{term.synonyms.length} synonyms</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTermIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTermIndex(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{terms[selectedTermIndex].term}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${currentCategory?.color} text-white`}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTermIndex(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Definition</h3>
                  <p className="text-gray-600">{terms[selectedTermIndex].definition}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Example</h3>
                  <p className="text-gray-600 italic bg-gray-50 p-4 rounded-lg">
                    &ldquo;{terms[selectedTermIndex].example}&rdquo;
                  </p>
                </div>

                {terms[selectedTermIndex].synonyms && terms[selectedTermIndex].synonyms!.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Synonyms</h3>
                    <div className="flex flex-wrap gap-2">
                      {terms[selectedTermIndex].synonyms!.map((synonym, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                        >
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {terms[selectedTermIndex].relatedTerms && terms[selectedTermIndex].relatedTerms!.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Related Terms</h3>
                    <div className="flex flex-wrap gap-2">
                      {terms[selectedTermIndex].relatedTerms!.map((related, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setSelectedTermIndex(Math.max(0, selectedTermIndex - 1))}
                  disabled={selectedTermIndex === 0}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedTermIndex(Math.min(terms.length - 1, selectedTermIndex + 1))}
                  disabled={selectedTermIndex === terms.length - 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {terms.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No terms available</h3>
          <p className="text-gray-500">Check back later for more content!</p>
        </motion.div>
      )}
      </div>
    </div>
  )
}

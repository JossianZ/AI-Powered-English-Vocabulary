'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Network, Code, HardDrive, ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react'

const categories = [
  {
    id: 'network',
    title: 'Network',
    description: 'Master networking terminology, protocols, and infrastructure concepts',
    icon: Network,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    terms: 10,
    levels: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: 'coding',
    title: 'Coding',
    description: 'Learn programming concepts, languages, and software development terms',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    terms: 10,
    levels: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: 'hardware',
    title: 'Hardware',
    description: 'Understand computer components, architecture, and physical systems',
    icon: HardDrive,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    terms: 10,
    levels: ['Beginner', 'Intermediate', 'Advanced'],
  },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">AI-Powered Learning</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select a category to start learning IT terminology. Each category has three difficulty levels tailored to your expertise.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-effect rounded-3xl overflow-hidden hover:shadow-2xl transition-all group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side - Category info */}
                <div className="md:w-2/5 p-8 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${category.color.includes('blue') ? 'rgba(59, 130, 246, 0.05)' : category.color.includes('purple') ? 'rgba(168, 85, 247, 0.05)' : 'rgba(249, 115, 22, 0.05)'} 100%)`
                    }}
                  />
                  
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-gradient-to-r ${category.color} p-5 rounded-2xl inline-block mb-6 shadow-lg relative z-10`}
                  >
                    <category.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold mb-3 relative z-10">{category.title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed relative z-10">{category.description}</p>
                  
                  <div className="flex items-center space-x-2 text-sm relative z-10">
                    <div className={`bg-gradient-to-r ${category.color} p-1.5 rounded-lg`}>
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-primary-600 text-lg">{category.terms}</span>
                    <span className="text-gray-500">terms available</span>
                  </div>
                </div>

                {/* Right side - Difficulty levels */}
                <div className="md:w-3/5 p-8 bg-gradient-to-br from-gray-50/50 to-white/50">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-bold text-gray-800">Select Difficulty Level</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.levels.map((level, levelIndex) => (
                      <motion.div
                        key={level}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.15) + (levelIndex * 0.1), duration: 0.5 }}
                        whileHover={{ x: 8, transition: { duration: 0.2 } }}
                      >
                        <Link
                          href={`/learn/${category.id}/${level.toLowerCase()}`}
                          className="flex items-center justify-between p-5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 border-2 border-gray-100 hover:border-primary-300 transition-all group/level shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-center space-x-4">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className={`w-4 h-4 rounded-full shadow-lg ${
                                levelIndex === 0 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                levelIndex === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                'bg-gradient-to-r from-red-400 to-pink-600'
                              }`}
                            />
                            <div>
                              <span className="font-bold text-gray-800 group-hover/level:text-primary-700 text-lg block">
                                {level}
                              </span>
                              <span className="text-xs text-gray-500">
                                {levelIndex === 0 ? 'Perfect for beginners' : levelIndex === 1 ? 'Build on basics' : 'Master advanced concepts'}
                              </span>
                            </div>
                          </div>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-6 h-6 text-gray-400 group-hover/level:text-primary-600 transition-colors" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-5xl mx-auto glass-effect rounded-3xl p-10 relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl"
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold">Learning Tips</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { text: 'Start with Beginner level to build a solid foundation', icon: '🎯' },
                { text: 'Practice regularly for better retention and progress', icon: '📅' },
                { text: 'Review related terms to understand connections', icon: '🔗' },
                { text: 'AI adapts to your performance for efficient learning', icon: '🤖' },
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (index * 0.1) }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex items-start space-x-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-all"
                >
                  <span className="text-2xl">{tip.icon}</span>
                  <p className="text-gray-700 leading-relaxed">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

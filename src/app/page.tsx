'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Code, Network, HardDrive, TrendingUp, Award, Zap, Target, Brain, Sparkles } from 'lucide-react'

const categories = [
  {
    id: 'network',
    title: 'Network',
    description: 'Master networking terminology, protocols, and infrastructure concepts',
    icon: Network,
    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
    terms: 10,
    iconBg: 'bg-blue-100',
  },
  {
    id: 'coding',
    title: 'Coding',
    description: 'Learn programming concepts, languages, and software development terms',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    terms: 10,
    iconBg: 'bg-purple-100',
  },
  {
    id: 'hardware',
    title: 'Hardware',
    description: 'Understand computer components, architecture, and physical systems',
    icon: HardDrive,
    color: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    terms: 10,
    iconBg: 'bg-orange-100',
  },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Intelligent system adapts to your learning pace and style',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Target,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed statistics and insights',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Zap,
    title: 'Interactive Quizzes',
    description: 'Engage with multiple quiz types and instant feedback',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: Award,
    title: 'Achievements',
    description: 'Earn badges and track your mastery of IT terminology',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
]

const stats = [
  { value: '30', label: 'IT Terms', icon: BookOpen },
  { value: '3', label: 'Categories', icon: Target },
  { value: '3', label: 'Difficulty Levels', icon: TrendingUp },
  { value: '100%', label: 'Free', icon: Sparkles },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative"
      >
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-200 rounded-full blur-3xl opacity-30"
          />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-xl opacity-50"
          />
          <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-2xl shadow-2xl">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight"
        >
          AI-Powered Vocabulary Trainer
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Master IT terminology with our intelligent learning platform. 
          Tailored for professionals in network, coding, and hardware fields.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Start Learning Now
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/progress"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
            >
              <TrendingUp className="w-5 h-5" />
              View Progress
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + (index * 0.1) }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Choose Your Learning Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Select a category to start mastering IT terminology
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + (index * 0.15), duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href={`/learn/${category.id}/beginner`}>
                <div className={`glass-effect rounded-2xl p-8 hover:shadow-2xl transition-all cursor-pointer h-full bg-gradient-to-br ${category.bgGradient}`}>
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-gradient-to-r ${category.color} p-5 rounded-xl inline-block mb-6 shadow-lg`}
                  >
                    <category.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{category.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span className="text-sm font-semibold text-gray-700">
                        {category.terms} terms
                      </span>
                    </div>
                    <motion.span
                      className="text-gray-400 group-hover:text-primary-600 transition-colors font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Start →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Why Choose Our Platform?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Powerful features designed for effective learning
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + (index * 0.1) }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className={`${feature.bgColor} p-4 rounded-full inline-block mb-4`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="glass-effect rounded-3xl p-12 text-center relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
        
        <div className="relative z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-primary-600" />
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Boost Your IT Vocabulary?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of IT professionals improving their English vocabulary with AI-powered learning.
            Start your journey today and master technical terminology!
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="w-5 h-5" />
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Menu, X, Home, GraduationCap, BarChart3, Flame, User, LogIn } from 'lucide-react'
import { getUser, getOrCreateUser, updateUsername, getStreak, type UserProfile } from '@/lib/user-storage'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [streak, setStreak] = useState(0)
  const [showNameModal, setShowNameModal] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const existingUser = getUser()
    if (existingUser) {
      setUser(existingUser)
      setStreak(getStreak().current)
    }
  }, [])

  const handleSetUsername = () => {
    const trimmed = nameInput.trim()
    if (trimmed) {
      const u = getOrCreateUser(trimmed)
      updateUsername(trimmed)
      setUser(u)
      setShowNameModal(false)
      setNameInput('')
    }
  }

  const handleQuickStart = () => {
    if (!user) {
      setShowNameModal(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg"
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                AI Vocabulary
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Info + Streak */}
            <div className="hidden md:flex items-center space-x-3">
              {isClient && streak > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-1 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200"
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold text-orange-600">{streak}</span>
                </motion.div>
              )}

              {isClient && user ? (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200 cursor-pointer"
                  onClick={() => setShowNameModal(true)}
                >
                  <User className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-semibold text-primary-700">{user.username}</span>
                </motion.div>
              ) : isClient ? (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleQuickStart}
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Set Name</span>
                </motion.button>
              ) : null}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary-600" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  {/* Mobile User Info */}
                  {isClient && (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      {user ? (
                        <div className="flex items-center justify-between px-4 py-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-primary-600" />
                            <span className="font-semibold">{user.username}</span>
                          </div>
                          {streak > 0 && (
                            <div className="flex items-center space-x-1">
                              <Flame className="w-4 h-4 text-orange-500" />
                              <span className="text-sm font-bold text-orange-600">{streak}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setIsMenuOpen(false)
                            setShowNameModal(true)
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-medium"
                        >
                          <LogIn className="w-5 h-5" />
                          <span>Set Your Name</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Username Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNameModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-4"
                >
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-2xl inline-block">
                    <User className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-bold gradient-text">
                  {user ? 'Update Your Name' : 'Welcome! 👋'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {user ? 'Change your display name' : 'Enter your name to personalize your learning experience'}
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSetUsername()}
                  placeholder={user?.username || 'Your name...'}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:outline-none text-lg transition-all"
                  autoFocus
                />

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSetUsername}
                    disabled={!nameInput.trim()}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {user ? 'Update' : 'Get Started'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowNameModal(false)
                      if (!user) {
                        getOrCreateUser('Learner')
                        setUser(getUser())
                      }
                    }}
                    className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all"
                  >
                    Skip
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

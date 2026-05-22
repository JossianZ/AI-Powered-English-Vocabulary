'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/20 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-600 mb-4 md:mb-0"
          >
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>© 2026 AI Vocabulary Trainer</span>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-gray-600 hover:text-primary-600 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

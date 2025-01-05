"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  const features = [
    {
      title: "Educational Micro-Loans",
      description: "Secure blockchain-based loans with AI-driven verification.",
      icon: "🎓",
    },
    {
      title: "Performance-Based Repayment",
      description: "Flexible repayment plans based on academic performance.",
      icon: "📊",
    },
    {
      title: "Tokenized Rewards",
      description: "Earn tokens for high grades and course completions.",
      icon: "🏆",
    },
    {
      title: "AI Integration",
      description: "Advanced verification, evaluation, and fraud detection.",
      icon: "🤖",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            About EduInfinity-X
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          EduInfinity-X is a revolutionary blockchain platform for education micro-loans management, 
          combining the power of blockchain and AI to transform the educational landscape.
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="bg-white rounded-lg shadow-lg p-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {feature.title}
                </span>
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <p className="text-gray-600 mb-4">
            EduInfinity-X aims to revolutionize education financing by combining blockchain and AI to empower 
            students and educators. We ensure transparent and secure micro-loan management, provide incentives 
            for academic excellence through tokenized rewards, and mitigate risks via AI-driven early warnings 
            and dynamic adjustments.
          </p>
          <p className="text-gray-600">
            By addressing challenges such as loan defaults and institutional inefficiencies, EduInfinity-X 
            fosters an inclusive and sustainable educational ecosystem that rewards achievement and ensures 
            equal opportunities for quality education.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Integration
              </span>
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Advanced verification of student and teacher profiles</li>
              <li>Performance evaluation for repayment terms and rewards</li>
              <li>Fraud detection and warning system</li>
              <li>Dynamic pricing based on demand and completion rates</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Platform Revenue Model
              </span>
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Minimal transaction fees on course enrollments and loans</li>
              <li>Tokenized rewards marketplace for resource exchange</li>
              <li>Partnerships with educational institutions</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


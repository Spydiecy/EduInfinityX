"use client"

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import t from '../../../public/tanishq.jpg';
export default function ContactPage() {
  const developers = [
    {
      name: 'Tanishq Gupta',
      role: 'Blockchain Developer',
      avatar: t.src, // Replace with actual image path
      linkedin: 'https://www.linkedin.com/in/tanishqgupta-tech/',
      github: 'https://github.com/spydiecy',
    },
    {
      name: 'Naman Bansal',
      role: 'Web Developer',
      avatar: 'https://avatars.githubusercontent.com/u/131576334?v=4', // Replace with actual image path
      linkedin: 'https://www.linkedin.com/in/naman-bansal-b780b3255/',
      github: 'https://github.com/namanbansal102',
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
            Contact EduInfinityX
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          EduInfinityX is a revolutionary blockchain-based platform designed to transform the educational landscape. 
          We provide decentralized learning opportunities and innovative financial solutions for students worldwide.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {developers.map((dev, index) => (
            <motion.div 
              key={dev.name}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div 
                className="w-48 h-48 rounded-full overflow-hidden mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={dev.avatar} 
                  alt={dev.name} 
                  width={192} 
                  height={192} 
                  className="object-cover"
                />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-2">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {dev.name}
                </span>
              </h2>
              <p className="text-gray-600 mb-4">{dev.role}</p>
              <div className="flex space-x-4">
                <motion.a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin className="text-3xl text-blue-600" />
                </motion.a>
                <motion.a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub className="text-3xl text-gray-800" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-600 mb-4">
            Have questions or want to learn more about EduInfinityX? We'd love to hear from you!
          </p>
          <a 
            href="mailto:contact@eduinfinityx.com" 
            className="inline-block bg-gradient-to-r from-emerald-400 to-blue-400 text-white font-bold py-2 px-6 rounded-full hover:from-emerald-500 hover:to-blue-500 transition duration-300"
          >
            Email Us
          </a>
        </motion.div>
      </div>
    </div>
  )
}

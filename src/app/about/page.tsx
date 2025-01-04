import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Award, Lock, FileCheck, Coins } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About EduInfinity-X</h1>
          <p className="text-lg text-gray-600 mb-8">
            EduInfinity-X combines the transformative potential of blockchain and AI to create a comprehensive ecosystem for education. Our platform focuses on performance-based educational micro-loans and transparent, secure management of educational resources.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8 text-green-500" />}
              title="Educational Micro-Loans"
              description="Secure, blockchain-based loans with AI-driven verification for accurate identity checks and academic record validation."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-blue-500" />}
              title="Performance-Based Repayment"
              description="Flexible repayment plans based on academic performance, with rewards for high achievers."
            />
            <FeatureCard 
              icon={<Award className="w-8 h-8 text-yellow-500" />}
              title="Tokenized Rewards"
              description="Incentives for high grades and course completions, fostering motivation and excellence."
            />
            <FeatureCard 
              icon={<Lock className="w-8 h-8 text-red-500" />}
              title="Data Security"
              description="Tamper-proof blockchain storage for university and institutional data, ensuring transparency and trust."
            />
            <FeatureCard 
              icon={<FileCheck className="w-8 h-8 text-purple-500" />}
              title="Document Verification"
              description="AI-powered assessment of academic documents using GitHub-hosted models and Pinata Cloud."
            />
            <FeatureCard 
              icon={<Coins className="w-8 h-8 text-orange-500" />}
              title="Smart Contracts"
              description="Immutable blockchain-based agreements for secure and transparent loan management."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }:any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-4 text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}


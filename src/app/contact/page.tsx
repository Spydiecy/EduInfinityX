import React from 'react';
import { GitlabIcon as GitHub, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            EduInfinity-X is built on the EDU Chain Network, leveraging blockchain technology for secure and transparent educational finance management.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <TeamMember 
              name="Tanishq Gupta"
              role="Blockchain Developer"
              github="https://github.com/tanishqgupta"
              linkedin="https://linkedin.com/in/tanishqgupta"
              email="tanishq@eduinfinityx.com"
            />
            <TeamMember 
              name="Naman Bansal"
              role="Frontend Developer"
              github="https://github.com/namanbansal"
              linkedin="https://linkedin.com/in/namanbansal"
              email="naman@eduinfinityx.com"
            />
          </div>

          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}

function TeamMember({ name, role, github, linkedin, email }:any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4">{role}</p>
      <div className="flex space-x-4">
        <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
          <GitHub className="w-6 h-6" />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-800">
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
      </div>
      <div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Send Message
        </motion.button>
      </div>
    </form>
  );
}


"use client"
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const searchLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Loan Request', href: '/loan-request' },
  { name: 'Stake Loans', href: '/stake-loans' },
  { name: 'Repayment Loan', href: '/repayment-loan' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Chatbot', href: '/chatbot' },
]

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLinks, setFilteredLinks] = useState(searchLinks)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const filtered = searchLinks.filter(link =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredLinks(filtered)
  }, [searchTerm])

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center space-x-2 rounded-md bg-neutral-900 px-3 py-1.5">
        <svg
          className="h-4 w-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          placeholder="Search"
          className="w-48 bg-transparent text-base text-neutral-200 placeholder-neutral-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
        <kbd className="hidden rounded border border-neutral-700 px-1.5 text-xs text-neutral-400 sm:block">
          Ctrl K
        </kbd>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-64 rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="py-1">
              {filteredLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                >
                  <span className="font-medium bg-gradient-to-r ">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


  "use client"
  import { useState } from 'react'
  import { ethers } from 'ethers'
  import { getWeb3Provider, getContractFunctions } from '@/lib/contract';
  import { useRouter } from 'next/navigation';
  import toast from 'react-hot-toast';
import { SearchBar } from './Searchbar';
import ConnectWallet from './ConnectWallet';

  export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [account, setAccount] = useState('')
    const [isConnecting, setIsConnecting] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState("")
      const [connecting, setConnecting] = useState(false);
        const router = useRouter();
      

    
        async function handleConnect() {
            try {
                setConnecting(true);
                const provider = await getWeb3Provider();
                // Request accounts *before* getting the signer
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                localStorage.setItem('walletAddress', address);
    
                const contract = await getContractFunctions();
                  
                const isAdmin = await contract.hasRole('ADMIN_ROLE', address);
    
                if (isAdmin) {
                    router.push('/admin');
                } else {
                    router.push('/register');
                }
    
            } catch (error: any) {
                console.error("Connection error:", error);
                if (error.code === 4001) {
                  toast.error("User rejected the request")
                  
                } else {
                  toast.error("Failed to connect. Please check your wallet.")
                
                }
    
            } finally {
                setConnecting(false)
            }
        }

    const toggleDropdown = (name:any) => {
      setActiveDropdown(activeDropdown === name ? null : name)
    }

    return (
      <nav className="border-b border-neutral-800 bg-black font-semibold">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/">

                <span className="text-[20px] font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent" >
                  EduInfinityX
                </span>
                </a>
              </div>

              {/* Search bar */}
              <div className="hidden md:block ml-4">
                <SearchBar></SearchBar>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <a
                  href="/"
                  className="text-lg text-neutral-300 transition-colors hover:text-green-400 hover:[text-shadow:0_0_10px_#c084fc]"
                >
                  Home
                </a>
                <a
                  href="/loan-request"
                  className="text-lg text-neutral-300 transition-colors hover:text-green-400 hover:[text-shadow:0_0_10px_#c084fc]"
                >
                  Loan Request  
                </a>
                
                {/* Plugins Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('plugins')}
                  onMouseLeave={() => setActiveDropdown('')}
                >
                  <button
                    className="flex items-center text-lg text-neutral-300 transition-colors hover:text-green-400 hover:[text-shadow:0_0_10px_#c084fc] "
                    aria-expanded={activeDropdown === 'plugins'}
                    aria-haspopup="true"
                  >
                    Details
                    <svg
                      className={`ml-1 h-4 w-4 transform transition-transform ${
                        activeDropdown === 'plugins' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'plugins' && (
                    <div className="absolute right-0  w-48 rounded-md bg-neutral-900 py-2 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <a
                        href="/stake-loans"
                        className="block px-4 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                      >
                        Stake 
                      </a>
                      <a
                        href="/repayment-loan"
                        className="block px-4 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                      >
                        Repayment Loan
                      </a>
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                      >
                        Dashboard
                      </a>
                    </div>
                  )}
                </div>

                {/* Resources Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown('')}
                >
                  <button
                    className="flex items-center text-lg text-neutral-300 transition-colors hover:text-green-400 hover:[text-shadow:0_0_10px_#c084fc]"
                    aria-expanded={activeDropdown === 'resources'}
                    aria-haspopup="true"
                  >
                    Record
                    <svg
                      className={`ml-1 h-4 w-4 transform transition-transform ${
                        activeDropdown === 'resources' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'resources' && (
                    <div className="absolute right-0 mt-0 w-48 rounded-md bg-neutral-900 py-2 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <a
                        href="/about"
                        className="block px-4 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                      >
                        About
                      </a>
                      <a
                        href="/contact"
                        className="block px-4 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                      >
                        Contact
                      </a>
                      <a
                        href="/chatbot"
                        className="block px-4 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                      >
                        Chatbot
                      </a>
                      
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-4 border-l border-neutral-800 pl-6">
                  <a
                    href="https://github.com/Spydiecy/EduInfinityX"
                    className="text-neutral-400 transition-colors hover:text-green-400 hover:[text-shadow:0_0_10px_#c084fc]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://x.com/EduInfinityX/status/1875875913042477271"
                    className="text-neutral-400 transition-colors hover:text-green-400 hover:[text-shadow:0_0_10px_#c084fc]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </a>
              
                  <ConnectWallet></ConnectWallet>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
            >
              Guide
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
            >
              Config
            </a>
            <button
              onClick={() => toggleDropdown('mobile-plugins')}
              className="flex w-full items-center rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
            >
              Plugins
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform ${
                  activeDropdown === 'mobile-plugins' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'mobile-plugins' && (
              <div className="ml-4 space-y-1 z-50z-50">
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400 z-50"
                >
                  Official Plugins
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                >
                  Community Plugins
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                >
                  Plugin Guide
                </a>
              </div>
            )}
            <button
              onClick={() => toggleDropdown('mobile-resources')}
              className="flex w-full items-center rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
            >
              Resources
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform ${
                  activeDropdown === 'mobile-resources' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'mobile-resources' && (
              <div className="ml-4 space-y-1">
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                >
                  Blog
                </a>
                <a
                  href="/chatbot"
                  className="block rounded-md px-3 py-2 text-lg text-neutral-300 hover:bg-neutral-800 hover:text-green-400"
                >
                  Chatbot
                </a>
                
              </div>
            )}
            <div className="border-t border-neutral-800 pt-4">
              <button
                onClick={handleConnect}
                className="block w-full rounded-md bg-purple-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-purple-700"
              >
                {isConnecting
                  ? 'Connecting...'
                  : account
                  ? `${account.slice(0, 6)}...${account.slice(-4)}`
                  : 'Connect Wallet'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
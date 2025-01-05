"use client"

import { useState } from 'react'
import { ethers } from 'ethers'
import { getWeb3Provider, getContractFunctions } from '@/lib/contract'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  async function handleConnect() {
    try {
      setConnecting(true)
      const provider = await getWeb3Provider()
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      setAccount(address)
      localStorage.setItem('walletAddress', address)

      const contract = await getContractFunctions()
      const isAdmin = await contract.hasRole('ADMIN_ROLE', address)

      if (isAdmin) {
        router.push('/admin')
      } else {
        setIsDropdownOpen(true)
      }
    } catch (error: any) {
      console.error("Connection error:", error)
      if (error.code === 4001) {
        toast.error("User rejected the request")
      } else {
        toast.error("Failed to connect. Please check your wallet.")
      }
    } finally {
      setConnecting(false)
    }
  }

  function handleLogout() {
    setAccount(null)
    localStorage.removeItem('walletAddress')
    setIsDropdownOpen(false)
    toast.success("Logged out successfully")
  }

  function handleRegisterAsStudent() {
    router.push('/admin')
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={account ? () => setIsDropdownOpen(!isDropdownOpen) : handleConnect}
        style={{
          background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
        }}
        className="rounded-md px-4 py-1.5 text-base font-medium text-white transition-colors hover:[text-shadow:0_0_10px_#fff]"
      >
        {connecting
          ? 'Connecting...'
          : account
          ? `${account.slice(0, 6)}...${account.slice(-4)}`
          : 'Connect Wallet'}
      </button>
      {isDropdownOpen && account && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <p className="block px-4 py-2 text-sm text-gray-700">
              Status: {account ? 'Connected' : 'Logged Out'}
            </p>
            <button
              onClick={handleRegisterAsStudent}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Admin
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// src/app/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getWeb3Provider, getContractFunctions } from '@/lib/contract';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import HomeM from './components/HomeMain';
import HomeMain from './components/HomeMain';

export default function Home() {
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
                alert("User rejected the request")
            } else {
                 alert('Failed to connect. Please check your wallet.')
            }

        } finally {
             setConnecting(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-100">
          
         <HomeMain></HomeMain>
        </main>
    );
}
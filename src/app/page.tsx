// src/app/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getWeb3Provider, getContractFunctions } from '@/lib/contract';
import { ethers } from 'ethers';

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
            <div className="h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                    <h1 className="text-3xl font-bold mb-6">EduInfinity-X</h1>
                    <button
                        onClick={handleConnect}
                        disabled={connecting}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {connecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                </div>
            </div>
        </main>
    );
}
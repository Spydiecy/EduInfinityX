// src/app/register/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getContractFunctions } from '@/lib/contract';

export default function Register() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isRegistered, setIsRegistered] = useState(false)
    

    useEffect(() => {
      checkRegistration();
    }, []);

    async function checkRegistration() {
        try {
            const address = localStorage.getItem('walletAddress');
            if (!address) {
              router.push('/');
              return;
            }

            const contract = await getContractFunctions();
            const details = await contract.students(address);
            setIsRegistered(details.isRegistered)
            if (details.isRegistered) {
              router.push('/dashboard');
            } else {
                setLoading(false);
            }

        } catch (error) {
            console.error("Registration check error:", error);
             setLoading(false);
        }
    }


    async function handleRegister() {
        try {
            setLoading(true);
            const contract = await getContractFunctions();
            await contract.registerStudent();
            router.push('/dashboard');
        } catch (error) {
            console.error("Registration error:", error);
            alert('Registration failed');
            setLoading(false);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (isRegistered) return <div>You are already Registered!</div>

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Student Registration</h1>
                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Register as Student
                </button>
            </div>
        </div>
    );
}
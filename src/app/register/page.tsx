// src/app/register/page.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getContractFunctions } from '@/lib/contract';
import { User, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ContractTransaction } from 'ethers';
import '../styles/custom.css';

export default function Register() {
   const [loading, setLoading] = useState(true);
   const [address, setAddress] = useState('');
   const router = useRouter();
   const [isRegistered, setIsRegistered] = useState(false);
   const [transactionInProgress, setTransactionInProgress] = useState(false);

   const checkRegistration = useCallback(async () => {
       try {
           const walletAddress = localStorage.getItem('walletAddress');
           if (!walletAddress) {
               router.push('/');
               return;
           }
           setAddress(walletAddress);

           const contract = await getContractFunctions();
           const details = await contract.students(walletAddress);
           setIsRegistered(details.isRegistered);
           
           if (details.isRegistered) {
               router.push('/dashboard');
           } else {
               setLoading(false);
           }
       } catch (error) {
           console.error("Registration check error:", error);
           toast.error("Failed to check registration status");
           setLoading(false);
       }
   }, [router]);

   useEffect(() => {
       checkRegistration();
   }, [checkRegistration]);

   async function handleRegister() {
       if (transactionInProgress) return;
       
       try {
           setTransactionInProgress(true);
           const contract = await getContractFunctions();
           const tx: ContractTransaction = await contract.registerStudent();
           
           await toast.promise(
               tx.wait(),
               {
                   loading: 'Registering on the blockchain...',
                   success: 'Successfully registered! Redirecting to dashboard...',
                   error: 'Registration failed. Please try again.'
               }
           );

           router.push('/dashboard');
       } catch (error) {
           console.error("Registration error:", error as Error);
           
           const typedError = error as { code?: string; reason?: string };
           if (typedError.code === 'ACTION_REJECTED') {
               toast.error('Transaction was rejected');
           } else if (typedError.reason) {
               toast.error(typedError.reason);
           } else {
               toast.error("Failed to register. Please try again.");
           }
       } finally {
           setTransactionInProgress(false);
       }
   }

   if (loading) {
       return (
           <div className="flex justify-center items-center h-screen bg-gray-100">
               <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.5 }}
                   className="text-gray-800 text-2xl font-bold"
               >
                   <div className="spinner"></div>
               </motion.div>
           </div>
       );
   }

   if (isRegistered) {
       return (
           <div className="min-h-screen bg-gray-100 flex items-center justify-center">
               <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-white p-8 rounded-lg shadow-lg text-center"
               >
                   <h2 className="text-2xl font-bold text-gray-800 mb-4">Already Registered!</h2>
                   <p className="text-gray-600 mb-4">You are already registered as a student.</p>
                   <button
                       onClick={() => router.push('/dashboard')}
                       className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                   >
                       Go to Dashboard
                   </button>
               </motion.div>
           </div>
       );
   }

   return (
       <div className="min-h-screen bg-gray-100">
           <div className="h-screen flex items-center justify-center p-4">
               <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="gradient-box p-8 rounded-lg shadow-lg w-full max-w-md"
               >
                   {/* Header */}
                   <div className="text-center mb-8">
                       <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                       <h1 className="text-3xl font-bold text-gray-800">Student Registration</h1>
                       <p className="text-gray-600 mt-2">Join EduInfinity-X platform</p>
                   </div>

                   {/* Wallet Address */}
                   <div className="mb-8 p-3 bg-gray-50 rounded-lg flex items-center justify-center space-x-2">
                       <User className="text-gray-600" />
                       <span className="text-gray-600 font-medium">{address}</span>
                   </div>

                   {/* Registration Button */}
                   <motion.button
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       onClick={handleRegister}
                       disabled={transactionInProgress}
                       className="w-full px-6 py-3 rounded-lg text-white font-semibold 
                               disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                               bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                   >
                       {transactionInProgress ? (
                           <div className="flex items-center justify-center">
                               <div className="spinner-small mr-2"></div>
                               Registering...
                           </div>
                       ) : (
                           'Register as Student'
                       )}
                   </motion.button>

                   {/* Info Box */}
                   <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                       <p className="font-semibold mb-2">By registering, you&apos;ll get:</p>
                       <ul className="space-y-2">
                           <li>• Access to educational micro-loans</li>
                           <li>• Performance-based rewards</li>
                           <li>• Staking benefits</li>
                           <li>• Course tracking</li>
                       </ul>
                   </div>
               </motion.div>
           </div>
       </div>
   );
}
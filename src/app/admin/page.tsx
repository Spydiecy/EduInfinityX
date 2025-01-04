'use client';
import { useState, useEffect } from 'react';
import { getContractFunctions } from '@/lib/contract';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import type { LoanDetails } from '@/types/student';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, DollarSign, Award, Play, Pause } from 'lucide-react';

interface PendingLoan extends LoanDetails {
    loanId: number;
}

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState('');
    const [pendingLoans, setPendingLoans] = useState<PendingLoan[]>([]);
    const [studentAddress, setStudentAddress] = useState('');
    const [courseId, setCourseId] = useState('');
    const [score, setScore] = useState('');
    const router = useRouter();

    useEffect(() => {
      const init = async () => {
        const addr = localStorage.getItem('walletAddress');
        if (addr) setAddress(addr);
          // await checkAdmin(addr)
        await fetchPendingLoans();
      };
        init();
    }, []);
    async function checkAdmin(addr:string|null) {
        try {
            if (!addr) {
                router.push("/");
                 return;
            }
            const contract = await getContractFunctions();
            const isAdmin = await contract.hasRole('ADMIN_ROLE', addr);
            if (!isAdmin) {
              router.push("/");
            }
         } catch (error) {
             console.error(error)
         } finally {
             setLoading(false);
         }
    }

    async function fetchPendingLoans() {
         try {
              setLoading(true);
              const contract = await getContractFunctions();
              const allLoans: PendingLoan[] = [];
              for (let i = 1; i <= 10; i++) {
                  const loan = await contract.loans(i);
                   if (loan && loan.status === 0) {
                       allLoans.push({
                           ...loan,
                           loanId: i,
                       }
                      );
                  }
              }
              setPendingLoans(allLoans);
          } catch (error) {
              console.error("Failed to fetch pending loans:", error);
              toast.error('Failed to fetch pending loans.');
          } finally {
              setLoading(false);
          }
    }

    async function handleApproveLoan(loanId: number, amount: string) {
        try {
            setLoading(true);
            const contract = await getContractFunctions();
            await contract.approveLoan(loanId, amount);
            toast.success('Loan approved');
            await fetchPendingLoans();
        } catch (error: any) {
            console.error("Approve loan error:", error);
             toast.error('Failed to approve loan');
        } finally {
             setLoading(false);
        }
    }

    async function handleUpdatePerformance(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            const contract = await getContractFunctions();
            await contract.updatePerformance(studentAddress, Number(courseId), Number(score));
            toast.success('Performance updated');
        } catch (error) {
             console.error("Update performance error:", error);
             toast.error('Failed to update performance');
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br bg-gray-200 text-black">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-center mb-6"
                >
                    <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
                    <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-lg rounded-full px-4 py-2">
                        <User className="text-black mr-2" />
                        <p className="text-black">{address}</p>
                    </div>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2">
                   {/* Pending Loans */}
                   <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg"
                    >
                       <h2 className="text-2xl mb-4 text-black font-semibold">Pending Loans</h2>
                        {pendingLoans.length > 0 ? (
                        <div className="space-y-4">
                             {pendingLoans.map((loan) => (
                                  <motion.div 
                                    key={loan.loanId} 
                                    className="p-4 bg-white bg-opacity-20 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <p className="text-black"><span className="font-semibold">Loan ID:</span> {loan.loanId}</p>
                                    <p className="text-black"><span className="font-semibold">Borrower:</span> {loan.borrower}</p>
                                    <p className="text-black"><span className="font-semibold">Principal:</span> {loan.principal} EDU</p>
                                    <motion.button
                                        onClick={() => handleApproveLoan(loan.loanId, ethers.utils.formatEther(loan.principal))}
                                        disabled={loading}
                                        className="w-full mt-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                        style={{
                                            background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                                        }}
                                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(45, 206, 137)" }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                         {loading? "Approving..." : "Approve Loan"}
                                    </motion.button>
                                  </motion.div>
                             ))}
                        </div>
                        ) : (
                            <p className="text-black">No pending loans</p>
                        )}
                   </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg"
                    >
                        <h2 className="text-2xl mb-4 text-black font-semibold">Update Student Performance</h2>
                        <form onSubmit={handleUpdatePerformance} className="space-y-4">
                            <div className="input-focus-effect">
                                <input
                                    type="text"
                                    placeholder="Student Address"
                                    value={studentAddress}
                                    onChange={(e) => setStudentAddress(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 text-gray-800"
                                />
                            </div>
                            <div className="input-focus-effect">
                                <input
                                    type="number"
                                    placeholder="Course ID"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 text-gray-800"
                                />
                            </div>
                            <div className="input-focus-effect">
                                <input
                                    type="number"
                                    placeholder="Score (0-100)"
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                    className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300 text-gray-800"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                style={{
                                    background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(45, 206, 137)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {loading ? 'Updating...' : 'Update Performance'}
                            </motion.button>
                        </form>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg md:col-span-2"
                    >
                        <h2 className="text-2xl mb-4 text-black font-semibold">Platform Controls</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <motion.button
                                onClick={async () => {
                                    try{
                                          setLoading(true);
                                        const contract = await getContractFunctions();
                                        await contract.pause();
                                        toast.success("Platform paused");
                                    }catch(error){
                                        console.error(error)
                                        toast.error("Pause failed");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                disabled={loading}
                                className="w-full px-4 py-2 rounded-lg text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, rgb(239, 68, 68) 0%, rgb(153, 27, 27) 100%)",
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(239, 68, 68)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Pause className="mr-2" />
                                {loading? "Pausing...": "Pause Platform"}
                            </motion.button>
                            <motion.button
                                onClick={async () => {
                                  try {
                                      setLoading(true);
                                      const contract = await getContractFunctions();
                                      await contract.unpause();
                                       toast.success("Platform unpaused");
                                  }catch(error){
                                      console.error(error);
                                       toast.error("Unpause failed");
                                  } finally {
                                        setLoading(false);
                                    }
                                }}
                                 disabled={loading}
                                className="w-full px-4 py-2 rounded-lg text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                                }}
                                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(45, 206, 137)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play className="mr-2" />
                                {loading? "Unpausing...": "Unpause Platform"}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


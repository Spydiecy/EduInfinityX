// src/app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { getContractFunctions } from '@/lib/contract';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import type { LoanDetails } from '@/types/student';
import toast from 'react-hot-toast';

interface  PendingLoan extends LoanDetails {
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
        await checkAdmin(addr)
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
            toast.error('Loan approved');
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
            toast.error('Performance updated');
        } catch (error) {
             console.error("Update performance error:", error);
             toast.error('Failed to update performance');
        } finally {
            setLoading(false);
        }
    }
      if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;


    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-600">Connected: {address}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                   {/* Pending Loans */}
                   <div className="bg-white p-6 rounded shadow">
                       <h2 className="text-xl mb-4">Pending Loans</h2>
                        {pendingLoans.length > 0 ? (
                        <div className="space-y-4">
                             {pendingLoans.map((loan) => (
                                  <div key={loan.loanId} className="p-4 bg-gray-50 rounded">
                                    <p>Loan ID: {loan.loanId}</p>
                                    <p>Borrower: {loan.borrower}</p>
                                    <p>Principal: {loan.principal} EDU</p>
                                    <button
                                    onClick={() => handleApproveLoan(loan.loanId, ethers.utils.formatEther(loan.principal))}
                                    disabled={loading}
                                        className="bg-green-500 text-white px-4 py-2 rounded mt-2 disabled:bg-green-300"
                                        >
                                         {loading? "Approving..." : "Approve Loan"}
                                    </button>
                                  </div>
                             ))}
                        </div>
                        ): (
                            <p>No pending loans</p>
                        )}
                   </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl mb-4">Update Student Performance</h2>
                        <form onSubmit={handleUpdatePerformance} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Student Address"
                                value={studentAddress}
                                onChange={(e) => setStudentAddress(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="Course ID"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="Score (0-100)"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-blue-300"
                            >
                                {loading ? 'Updating...' : 'Update Performance'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl mb-4">Platform Controls</h2>
                        <div className="space-y-4">
                            <button
                                onClick={async () => {
                                    try{
                                          setLoading(true);
                                        const contract = await getContractFunctions();
                                        await contract.pause();
                                        toast.error("Platform paused");
                                    }catch(error){
                                        console.error(error)
                                        toast.error("Pause failed");
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                disabled={loading}
                                className="w-full bg-red-500 text-white py-2 rounded disabled:bg-red-300"
                            >
                            {loading? "Pausing...": "Pause Platform"}
                            </button>
                            <button
                                onClick={async () => {
                                  try {
                                      setLoading(true);
                                      const contract = await getContractFunctions();
                                      await contract.unpause();
                                       toast.error("Platform unpaused");
                                  }catch(error){
                                      console.error(error);
                                       toast.error("Unpause failed");
                                  } finally {
                                        setLoading(false);
                                    }
                                }}
                                 disabled={loading}
                                className="w-full bg-green-500 text-white py-2 rounded disabled:bg-green-300"
                            >
                            {loading? "Unpausing...": "Unpause Platform"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
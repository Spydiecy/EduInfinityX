'use client';
import { useState, useEffect } from 'react';
import { getContractFunctions } from '@/lib/contract';
import type { StudentDetails, LoanDetails } from '@/types/student';

export default function Dashboard() {
 const [loading, setLoading] = useState(false);
 const [address, setAddress] = useState('');
 const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
 const [userLoans, setUserLoans] = useState<LoanDetails[]>([]);
 
 // Form states
 const [loanAmount, setLoanAmount] = useState('');
 const [loanTerm, setLoanTerm] = useState(90);
 const [useCollateral, setUseCollateral] = useState(false);
 const [stakeAmount, setStakeAmount] = useState('');
 const [repaymentId, setRepaymentId] = useState('');
 const [repaymentAmount, setRepaymentAmount] = useState('');

 useEffect(() => {
   const init = async () => {
     const walletAddress = localStorage.getItem('walletAddress');
     if (walletAddress) {
       setAddress(walletAddress);
       await loadUserData(walletAddress);
     }
   };
   init();
 }, []);

 async function loadUserData(userAddress: string) {
  try {
    setLoading(true);
    const contract = await getContractFunctions();
    
    // Get student details
    console.log('Fetching student details for address:', userAddress);
    const details = await contract.students(userAddress);
    setStudentDetails(details);

    // Get all loans
    console.log('Fetching loan IDs for address:', userAddress);
    const loanIds = await contract.getStudentLoans(userAddress);
    const loans = await Promise.all(
      loanIds.map(id => contract.loans(id))
    );
    setUserLoans(loans);
  } catch (error) {
    console.error('Failed to load user data:', error);
  } finally {
    setLoading(false);
  }
}

 async function handleAction(action: () => Promise<void>) {
   try {
     setLoading(true);
     await action();
     await loadUserData(address);
   } catch (error) {
     console.error('Action failed:', error);
     alert('Operation failed');
   } finally {
     setLoading(false);
   }
 }

 if (loading) {
   return <div className="flex justify-center items-center h-screen">Loading...</div>;
 }

 return (
   <div className="p-8">
     <div className="max-w-6xl mx-auto">
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Student Dashboard</h1>
         <p className="text-gray-600">Connected: {address}</p>
       </div>

       <div className="grid gap-6 md:grid-cols-2">
         {/* Student Stats */}
         {studentDetails && (
           <div className="bg-white p-6 rounded shadow">
             <h2 className="text-xl mb-4">Your Details</h2>
             <div className="space-y-2">
               <p>Credit Score: {studentDetails.creditScore}</p>
               <p>Performance Score: {studentDetails.performanceScore}</p>
               <p>Total Borrowed: {studentDetails.totalBorrowed} EDU</p>
               <p>Staked Amount: {studentDetails.stakedAmount} EDU</p>
               <p>Completed Courses: {studentDetails.coursesCount}</p>
             </div>
           </div>
         )}

         {/* Loan Request */}
         <div className="bg-white p-6 rounded shadow">
           <h2 className="text-xl mb-4">Request Loan</h2>
           <div className="space-y-4">
             <input
               type="number"
               placeholder="Amount in EDU"
               value={loanAmount}
               onChange={(e) => setLoanAmount(e.target.value)}
               className="w-full border rounded p-2"
             />
             <input
               type="number"
               placeholder="Term (days)"
               value={loanTerm}
               onChange={(e) => setLoanTerm(Number(e.target.value))}
               className="w-full border rounded p-2"
             />
             <label className="flex items-center gap-2">
               <input
                 type="checkbox"
                 checked={useCollateral}
                 onChange={(e) => setUseCollateral(e.target.checked)}
               />
               Use Collateral
             </label>
             <button
               onClick={() => handleAction(async () => {
                 const contract = await getContractFunctions();
                 await contract.requestLoan(loanAmount, loanTerm, useCollateral);
               })}
               disabled={loading}
               className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:bg-blue-300"
             >
               Request Loan
             </button>
           </div>
         </div>

         {/* Active Loans */}
         {userLoans.length > 0 && (
           <div className="bg-white p-6 rounded shadow">
             <h2 className="text-xl mb-4">Your Loans</h2>
             <div className="space-y-4">
               {userLoans.map((loan, index) => (
                 <div key={index} className="p-4 bg-gray-50 rounded">
                   <p>Principal: {loan.principal} EDU</p>
                   <p>Remaining: {loan.remainingAmount} EDU</p>
                   <p>Interest Rate: {loan.interestRate/100}%</p>
                   <p>Status: {['Pending', 'Active', 'Repaid', 'Defaulted'][loan.status]}</p>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Loan Repayment */}
         <div className="bg-white p-6 rounded shadow">
           <h2 className="text-xl mb-4">Make Repayment</h2>
           <div className="space-y-4">
             <input
               type="number"
               placeholder="Loan ID"
               value={repaymentId}
               onChange={(e) => setRepaymentId(e.target.value)}
               className="w-full border rounded p-2"
             />
             <input
               type="number"
               placeholder="Amount to repay"
               value={repaymentAmount}
               onChange={(e) => setRepaymentAmount(e.target.value)}
               className="w-full border rounded p-2"
             />
             <button
               onClick={() => handleAction(async () => {
                 const contract = await getContractFunctions();
                 await contract.makeRepayment(Number(repaymentId), repaymentAmount);
               })}
               disabled={loading}
               className="bg-green-500 text-white px-4 py-2 rounded w-full disabled:bg-green-300"
             >
               Make Repayment
             </button>
           </div>
         </div>

         {/* Staking */}
         <div className="bg-white p-6 rounded shadow">
           <h2 className="text-xl mb-4">EDU Staking</h2>
           <div className="space-y-4">
             <input
               type="number"
               placeholder="Amount to stake"
               value={stakeAmount}
               onChange={(e) => setStakeAmount(e.target.value)}
               className="w-full border rounded p-2"
             />
             <button
               onClick={() => handleAction(async () => {
                 const contract = await getContractFunctions();
                 await contract.stake(stakeAmount);
               })}
               disabled={loading}
               className="bg-purple-500 text-white px-4 py-2 rounded w-full disabled:bg-purple-300"
             >
               Stake EDU
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}
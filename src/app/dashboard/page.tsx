'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContractFunctions } from '@/lib/contract';
import type { StudentDetails, LoanDetails } from '@/types/student';
import { BookOpen, DollarSign, TrendingUp, Award } from 'lucide-react';
import '../styles/custom.css';
import toast from 'react-hot-toast';

export default function Dashboard() {
 const [loading, setLoading] = useState(false);
 const [address, setAddress] = useState('');
 const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
 const [userLoans, setUserLoans] = useState<LoanDetails[]>([]);
 const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
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

   const handleMouseMove = (e: MouseEvent) => {
     setMousePosition({ x: e.clientX, y: e.clientY });
   };

   window.addEventListener('mousemove', handleMouseMove);

   return () => {
     window.removeEventListener('mousemove', handleMouseMove);
   };
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
     toast.error("Unhandled Error From Backend")
   } finally {
     setLoading(false);
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

 return (
   <div className="min-h-screen p-8 bg-gray-100">
     <div 
       className="cursor-glow" 
       style={{ 
         left: `${mousePosition.x}px`, 
         top: `${mousePosition.y}px` 
       }} 
     />
     <div className="max-w-6xl mx-auto">
       <motion.div
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="flex justify-between items-center mb-6"
       >
         <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
         <p className="text-gray-600">Connected: {address}</p>
       </motion.div>

       <div className="grid gap-6 md:grid-cols-2">
         {/* Student Stats */}
         {studentDetails && (
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="gradient-box p-6 rounded-lg shadow-lg"
           >
             <h2 className="text-2xl mb-4 text-gray-800 font-semibold">Your Details</h2>
             <div className="space-y-3">
               <DetailItem icon={<Award />} label="Credit Score" value={studentDetails.creditScore} />
               <DetailItem icon={<TrendingUp />} label="Performance Score" value={studentDetails.performanceScore} />
               <DetailItem icon={<DollarSign />} label="Total Borrowed" value={`${studentDetails.totalBorrowed} EDU`} />
               <DetailItem icon={<DollarSign />} label="Staked Amount" value={`${studentDetails.stakedAmount} EDU`} />
               <DetailItem icon={<BookOpen />} label="Completed Courses" value={studentDetails.coursesCount} />
             </div>
           </motion.div>
         )}

         {/* Loan Request */}
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="gradient-box p-6 rounded-lg shadow-lg"
         >
           <h2 className="text-2xl mb-4 text-gray-800 font-semibold">Request Loan</h2>
           <div className="space-y-4">
             <input
               type="number"
               placeholder="Amount in EDU"
               value={loanAmount}
               onChange={(e) => setLoanAmount(e.target.value)}
               className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
             />
             <input
               type="number"
               placeholder="Term (days)"
               value={loanTerm}
               onChange={(e) => setLoanTerm(Number(e.target.value))}
               className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
             />
             <label className="flex items-center gap-2 text-gray-700">
               <input
                 type="checkbox"
                 checked={useCollateral}
                 onChange={(e) => setUseCollateral(e.target.checked)}
                 className="form-checkbox h-5 w-5"
               />
               Use Collateral
             </label>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => handleAction(async () => {
                 const contract = await getContractFunctions();
                 await contract.requestLoan(loanAmount, loanTerm, useCollateral);
               })}
               disabled={loading}
               style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
               className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:bg-blue-300 transition-all duration-300"
             >
               Request Loan
             </motion.button>
           </div>
         </motion.div>

         {/* Active Loans */}
         {userLoans.length > 0 && (
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="gradient-box p-6 rounded-lg shadow-lg"
           >
             <h2 className="text-2xl mb-4 text-gray-800 font-semibold">Your Loans</h2>
             <div className="space-y-4">
               {userLoans.map((loan, index) => (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.3, delay: index * 0.1 }}
                   className="p-4 bg-white bg-opacity-30 rounded-lg"
                 >
                   <p className="text-gray-700">Principal: {loan.principal} EDU</p>
                   <p className="text-gray-700">Remaining: {loan.remainingAmount} EDU</p>
                   <p className="text-gray-700">Interest Rate: {loan.interestRate/100}%</p>
                   <p className="text-gray-700">Status: {['Pending', 'Active', 'Repaid', 'Defaulted'][loan.status]}</p>
                 </motion.div>
               ))}
             </div>
           </motion.div>
         )}

         {/* Loan Repayment */}
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="gradient-box p-6 rounded-lg shadow-lg"
         >
           <h2 className="text-2xl mb-4 text-gray-800 font-semibold">Make Repayment</h2>
           <div className="space-y-4">
             <input
               type="number"
               placeholder="Loan ID"
               value={repaymentId}
               onChange={(e) => setRepaymentId(e.target.value)}
               className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
             />
             <input
               type="number"
               placeholder="Amount to repay"
               value={repaymentAmount}
               onChange={(e) => setRepaymentAmount(e.target.value)}
               className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
             />
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => handleAction(async () => {
                 const contract = await getContractFunctions();
                 await contract.makeRepayment(Number(repaymentId), repaymentAmount);
               })}
               style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
               disabled={loading}
               className=" text-white px-4 py-2 rounded-lg w-full disabled:bg-green-300 transition-all duration-300"
             >
              
               Make Repayment
             </motion.button>
           </div>
         </motion.div>

         {/* Staking */}
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="gradient-box p-6 rounded-lg shadow-lg"
         >
           <h2 className="text-2xl mb-4 text-gray-800 font-semibold">EDU Staking</h2>
           <div className="space-y-4">
             <input
               type="number"
               placeholder="Amount to stake"
               value={stakeAmount}
               onChange={(e) => setStakeAmount(e.target.value)}
               className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
             />
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => handleAction(async () => {
                 const contract = await getContractFunctions();
                 await contract.stake(stakeAmount);
               })}
               disabled={loading}
               style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
               className=" text-white px-4 py-2 rounded-lg w-full disabled:bg-purple-300 transition-all duration-300"
             >
               Stake EDU
             </motion.button>
           </div>
         </motion.div>
       </div>

       {/* Terms and Conditions */}
       <div className="terms-and-conditions">
         <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
         <p>
           By using this platform, you agree to our terms and conditions. All loans are subject to approval and may require collateral. 
           Interest rates are variable and may change based on market conditions. Repayment terms must be strictly adhered to. 
           Failure to repay loans may result in penalties and affect your credit score. Staking rewards are subject to change and may be 
           affected by network conditions. Please read our full terms of service and privacy policy for more information.
         </p>
       </div>
     </div>
   </div>
 );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="flex items-center space-x-2 text-gray-700">
      {icon}
      <span>{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}


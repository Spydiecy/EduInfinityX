'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getContractFunctions } from '@/lib/contract';
import type { StudentDetails } from '@/types/student';
import { BookOpen, DollarSign, TrendingUp, Award, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import "../styles/custom.css";
export default function LoanRequest() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  
  // Form states
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('90');
  const [useCollateral, setUseCollateral] = useState(false);

  // Validation states
  const [loanAmountError, setLoanAmountError] = useState('');
  const [loanTermError, setLoanTermError] = useState('');

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
      
      console.log('Fetching student details for address:', userAddress);
      const details = await contract.students(userAddress);
      setStudentDetails(details);
    } catch (error) {
      console.error('Failed to load user data:', error);
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  }

  const validateForm = () => {
    let isValid = true;

    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      setLoanAmountError('Please enter a valid loan amount');
      isValid = false;
    } else {
      setLoanAmountError('');
    }

    if (!loanTerm || parseInt(loanTerm) < 1) {
      setLoanTermError('Please enter a valid loan term');
      isValid = false;
    } else {
      setLoanTermError('');
    }

    return isValid;
  };

  async function handleLoanRequest() {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const contract = await getContractFunctions();
      await contract.requestLoan(loanAmount, parseInt(loanTerm), useCollateral);
      toast.success('Loan request submitted successfully');
      setLoanAmount('');
      setLoanTerm('90');
      setUseCollateral(false);
    } catch (error) {
      console.error('Loan request failed:', error);
      toast.error('Loan request failed');
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">Loan Request</h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md"
          >
            <User className="text-gray-600" />
            <p className="text-gray-600">{address}</p>
          </motion.div>
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

          {/* Loan Request Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gradient-box p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl mb-4 text-gray-800 font-semibold">Request Loan</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="number"
                  placeholder="Amount in EDU"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
                />
                <AnimatePresence>
                  {loanAmountError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {loanAmountError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Term (days)"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full border rounded-lg p-2 bg-white bg-opacity-50 focus:bg-opacity-70 transition-all duration-300"
                />
                <AnimatePresence>
                  {loanTermError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {loanTermError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={useCollateral}
                  onChange={(e) => setUseCollateral(e.target.checked)}
                  className="form-checkbox h-5 w-5"
                />
                Use Collateral
              </motion.label>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoanRequest}
                disabled={loading}
                className="w-full px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                }}
              >
                Request Loan
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <center>
<br />
      <div className="terms-and-conditions">
         <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
         <p>
           By using this platform, you agree to our terms and conditions. All loans are subject to approval and may require collateral. 
           Interest rates are variable and may change based on market conditions. Repayment terms must be strictly adhered to. 
           Failure to repay loans may result in penalties and affect your credit score. Staking rewards are subject to change and may be 
           affected by network conditions. Please read our full terms of service and privacy policy for more information.
         </p>
       </div>
      </center>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-2 text-gray-700"
    >
      {icon}
      <span>{label}:</span>
      <span className="font-semibold">{value}</span>
    </motion.div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getContractFunctions } from '@/lib/contract';
import { ethers } from 'ethers';
import type { StudentDetails } from '@/types/student';
import { BookOpen, DollarSign, TrendingUp, Award, User, Shield, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import '../styles/custom.css';

// Constants from smart contract
const MIN_STAKE = ethers.utils.parseEther("1000"); // 1000 EDU minimum stake
const REWARD_RATE = 1; // 1% APY

export default function StakeLoanPage() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeAmountError, setStakeAmountError] = useState('');
  const [estimatedRewards, setEstimatedRewards] = useState('0');

  useEffect(() => {
    const init = async () => {
      const walletAddress = localStorage.getItem('walletAddress');
      if (!walletAddress) {
        toast.error('Please connect your wallet first');
        window.location.href = '/';
        return;
      }
      setAddress(walletAddress);
      await loadUserData(walletAddress);
    };
    init();
  }, []);

  // Calculate estimated rewards when stake amount changes
  useEffect(() => {
    if (stakeAmount && !isNaN(parseFloat(stakeAmount))) {
      const annual = parseFloat(stakeAmount) * (REWARD_RATE / 100);
      setEstimatedRewards(annual.toFixed(2));
    } else {
      setEstimatedRewards('0');
    }
  }, [stakeAmount]);

  async function loadUserData(userAddress: string) {
    try {
      setLoading(true);
      const contract = await getContractFunctions();
      const details = await contract.students(userAddress);
      setStudentDetails(details);
    } catch (error: unknown) {
      console.error('Failed to load user data:', error);
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to load user data');
      } else {
        toast.error('Failed to load user data');
      }
    } finally {
      setLoading(false);
    }
  }

  const validateStakeForm = () => {
    let isValid = true;
    const amount = ethers.utils.parseEther(stakeAmount || '0');

    if (!stakeAmount || amount.isZero()) {
      setStakeAmountError('Please enter a stake amount');
      isValid = false;
    } else if (amount.lt(MIN_STAKE)) {
      setStakeAmountError(`Minimum stake amount is ${ethers.utils.formatEther(MIN_STAKE)} EDU`);
      isValid = false;
    } else {
      setStakeAmountError('');
    }

    return isValid;
  };

  async function handleStake() {
    if (!validateStakeForm()) return;

    try {
      setLoading(true);
      const contract = await getContractFunctions();
      
      const tx = await contract.stake(stakeAmount);

      toast.promise(tx.wait(), {
        loading: 'Transaction in progress...',
        success: 'Staking successful!',
        error: 'Transaction failed'
      });

      await tx.wait();
      
      // Reset form and reload data
      setStakeAmount('');
      await loadUserData(address);

    } catch (error) {
      console.error('Stake failed:', error);
      if ((error as Error & { code?: string }).code === 'INSUFFICIENT_FUNDS') {
        toast.error('Insufficient EDU balance');
      } else {
        toast.error((error as Error & { reason?: string }).reason || 'Failed to stake EDU');
      }
    } finally {
      setLoading(false);
    }
}

  if (loading && !studentDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="spinner"></div>
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
          <h1 className="text-3xl font-bold text-gray-800">Stake EDU</h1>
          <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
            <User className="text-gray-600" />
            <p className="text-gray-600 font-medium">{address}</p>
          </div>
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
              <div className="space-y-4">
                <DetailItem 
                  icon={<Award className="text-blue-500" />} 
                  label="Credit Score" 
                  value={studentDetails.creditScore} 
                />
                <DetailItem 
                  icon={<TrendingUp className="text-green-500" />} 
                  label="Performance Score" 
                  value={studentDetails.performanceScore} 
                />
                <DetailItem 
                  icon={<DollarSign className="text-yellow-500" />} 
                  label="Total Borrowed" 
                  value={`${studentDetails.totalBorrowed} EDU`} 
                />
                <DetailItem 
                  icon={<Shield className="text-purple-500" />} 
                  label="Currently Staked" 
                  value={`${studentDetails.stakedAmount} EDU`} 
                />
                <DetailItem 
                  icon={<BookOpen className="text-indigo-500" />} 
                  label="Courses Completed" 
                  value={studentDetails.coursesCount} 
                />
              </div>
            </motion.div>
          )}

          {/* Staking Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="gradient-box p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl mb-4 text-gray-800 font-semibold">New Stake</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Stake (EDU)
                </label>
                <input
                  type="number"
                  placeholder={`Min ${ethers.utils.formatEther(MIN_STAKE)} EDU`}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-full border rounded-lg p-3 bg-white bg-opacity-50 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  min={ethers.utils.formatEther(MIN_STAKE)}
                  step="0.1"
                />
                <AnimatePresence>
                  {stakeAmountError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {stakeAmountError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Estimated Rewards */}
              {parseFloat(stakeAmount) > 0 && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    Estimated Annual Rewards: {estimatedRewards} EDU
                  </p>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStake}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg text-white font-semibold disabled:opacity-50 
                          disabled:cursor-not-allowed transition-all duration-300 
                          bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner-small mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="mr-2" />
                    Stake EDU
                  </div>
                )}
              </motion.button>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Benefits of Staking</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Earn {REWARD_RATE}% APY in rewards
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Reduce loan interest rates
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Boost platform reputation
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Terms and Conditions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          <p>
            By staking EDU tokens, you agree to lock them for a minimum period. 
            Early unstaking may result in penalties. Rewards are subject to change 
            based on platform performance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-all duration-300"
    >
      <div className="p-2 rounded-full bg-white/80">
        {icon}
      </div>
      <div>
        <span className="text-gray-600">{label}:</span>
        <span className="ml-2 font-semibold">{value}</span>
      </div>
    </motion.div>
  );
}
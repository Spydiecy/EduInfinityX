// src/lib/contract.ts
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import type { StudentDetails, LoanDetails } from '@/types/student';

export async function getWeb3Provider() {
    if (!window.ethereum) throw new Error('MetaMask not installed');
    return new ethers.providers.Web3Provider(window.ethereum);
}

export async function getContractFunctions() {
    const provider = await getWeb3Provider();
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    return {
        // Student Registration
        registerStudent: async () => {
            const tx = await contract.registerStudent();
            await tx.wait();
        },

        // Loan Functions
        requestLoan: async (amount: string, term: number, collateral: boolean) => {
            const tx = await contract.requestLoan(
                ethers.utils.parseEther(amount),
                term,
                collateral
            );
            await tx.wait();
        },

        approveLoan: async (loanId: number, amount: string) => {
            const tx = await contract.approveLoan(loanId, {
                value: ethers.utils.parseEther(amount)
            });
            await tx.wait();
        },

        makeRepayment: async (loanId: number, amount: string) => {
            const tx = await contract.makeRepayment(loanId, {
                value: ethers.utils.parseEther(amount)
            });
            await tx.wait();
        },

        // Staking Functions
        stake: async (amount: string) => {
            const tx = await contract.stake({
                value: ethers.utils.parseEther(amount)
            });
            await tx.wait();
        },

         // Performance Functions
         updatePerformance: async (student: string, courseId: number, score: number) => {
            const tx = await contract.updatePerformance(student, courseId, score);
            await tx.wait();
        },


        // Role Management Functions
        grantInstitutionRole: async (account: string) => {
            const tx = await contract.grantInstitutionRole(account);
            await tx.wait();
        },
        grantAdminRole: async (account: string) => {
            const tx = await contract.grantAdminRole(account);
            await tx.wait();
        },
        revokeInstitutionRole: async (account: string) => {
            const tx = await contract.revokeInstitutionRole(account);
            await tx.wait();
        },
        revokeAdminRole: async (account: string) => {
            const tx = await contract.revokeAdminRole(account);
            await tx.wait();
        },
        hasRole: async (role: string, account: string): Promise<boolean> => {
            return contract.hasRole(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(role)), account);
        },
        
        // View Functions
        students: async (address: string): Promise<StudentDetails> => {
            const details = await contract.students(address);
            return {
                isRegistered: details.isRegistered,
                creditScore: Number(details.creditScore),
                totalBorrowed: Number(ethers.utils.formatEther(details.totalBorrowed)),
                performanceScore: Number(details.performanceScore),
                isBlacklisted: details.isBlacklisted,
                stakedAmount: Number(ethers.utils.formatEther(details.stakedAmount)),
                lastRewardsClaim: Number(details.lastRewardsClaim),
                coursesCount: Number(details.coursesCount)
            };
        },

        loans: async (loanId: number): Promise<LoanDetails> => {
            const loan = await contract.loans(loanId);
            return {
                borrower: loan.borrower,
                principal: Number(ethers.utils.formatEther(loan.principal)),
                remainingAmount: Number(ethers.utils.formatEther(loan.remainingAmount)),
                interestRate: Number(loan.interestRate),
                term: Number(loan.term),
                status: Number(loan.status),
                isCollateralized: loan.isCollateralized,
                collateralAmount: Number(ethers.utils.formatEther(loan.collateralAmount)),
                milestone: Number(loan.milestone)
            };
        },

        // Check Milestones
         checkMilestones: async (address: string) => {
             const tx = await contract._checkMilestones(address);
             await tx.wait();
        },

        // Admin Functions
        pause: async () => {
            const tx = await contract.pause();
            await tx.wait();
        },

        unpause: async () => {
            const tx = await contract.unpause();
            await tx.wait();
        },

         // View Functions
         getStudentLoans: async (address: string): Promise<number[]> => {
            const student = await contract.students(address);
            return student.loans.map((loanId: ethers.BigNumber) => loanId.toNumber());
        },

        getLoanDetails: async (loanId: number): Promise<LoanDetails> => {
            return contract.loans(loanId);
        },

        _calculateInterestRate: async (address: string): Promise<number> => {
            const rate = await contract._calcInterestRate(address);
            return Number(rate);
        },
        _getNextPayment: async (loanId: number): Promise<string> => {
            const amount = await contract._getNextPayment(loanId);
            return ethers.utils.formatEther(amount);
        }
    };
}
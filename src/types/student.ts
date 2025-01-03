export interface StudentDetails {
    isRegistered: boolean;
    creditScore: number;
    totalBorrowed: number;
    performanceScore: number;
    isBlacklisted: boolean;
    stakedAmount: number;
    lastRewardsClaim: number;
    coursesCount: number;
  }
  
  export interface LoanDetails {
    borrower: string;
    principal: number;
    remainingAmount: number;
    interestRate: number;
    term: number;
    status: number;
    isCollateralized: boolean;
    collateralAmount: number;
    milestone: number;
  }
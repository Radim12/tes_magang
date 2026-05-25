export interface Card {
  id: string;
  balance: number;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  cardType: 'blue' | 'white' | 'dark' | 'glass';
}

export interface Transaction {
  id: string;
  description: string;
  transactionId: string;
  type: string;
  cardLast4: string;
  date: string;
  amount: number;
  isIncome: boolean;
}

export interface Invoice {
  id: string;
  title: string;
  time: string;
  amount: number;
  logoUrl?: string;
  bgColor: string;
  textColor: string;
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  password?: string;
  dob: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
  avatarUrl: string;
}

export interface UserPreferences {
  currency: string;
  timezone: string;
  receiveDigitalCurrency: boolean;
  receiveMerchantOrder: boolean;
  accountRecommendations: boolean;
}

export interface UserSecurity {
  twoFactorEnabled: boolean;
}

export interface ActiveLoan {
  id: string;
  loanName: string;
  totalAmount: number;
  leftToPay: number;
  durationMonths: number;
  monthlyPayment: number;
}

export interface InvestmentItem {
  id: string;
  companyName: string;
  symbol: string;
  category: string;
  amountInvested: number;
  currentValue: number;
  changePercent: number;
  logoUrl?: string;
}

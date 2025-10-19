export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Metadata {
  name: string;
  type: string;
  email: string;
  quantity: number;
  country: string;
  product_name: string;
}

type PaymentStatus = "successful" | "failed" | "pending";
type PaymentType = "deposit" | "withdrawal";

export interface PaymentData {
  amount: number;
  metadata?: Metadata;
  payment_reference: string;
  status: PaymentStatus;
  type: PaymentType;
  date: string;
}

export interface WalletData {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export type TransactionType =
  | "item"
  | "get tipped"
  | "withdrawals"
  | "chargebacks"
  | "cashbacks";

export type TransactionStatus = "successful" | "failed" | "pending";

export type FilterType = {
  fromDate: Date | undefined;
  toDate: Date | undefined;
  transactionType: TransactionType[];
  transactionStatus: TransactionStatus[];
};

export interface Transaction {
    id: number;
    title: string;
    description: string;
    type: TransactionType;
  }


export type TransactionType = "received" | "sent";


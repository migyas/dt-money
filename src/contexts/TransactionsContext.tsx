import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  category: string;
  type: "income" | "outcome";
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

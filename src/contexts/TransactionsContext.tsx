import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  category: string;
  type: "income" | "outcome";
  price: number;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  category: string;
  type: "income" | "outcome";
  price: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createNewTransaction: (data: CreateTransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await api.get("transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(data);
  }, []);

  const createNewTransaction = useCallback(
    async (transaction: CreateTransactionInput) => {
      const { data } = await api.post("transactions", {
        ...transaction,
        createdAt: new Date(),
      });
      setTransactions((prevState) => [data, ...prevState]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

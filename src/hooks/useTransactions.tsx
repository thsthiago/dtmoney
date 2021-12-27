import { createContext, FC, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface transaction {
  id: number
  title: string
  type: string
  caterogy: string
  amount: number
  createdAt: Date
}

export type TransctionInput = Omit<transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: transaction[]
  createTransaction: (transaction: TransctionInput) => void
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)

const TransactionsProvider: FC  = ({ children }) => {
  const [transactions, setTransactions] = useState<transaction[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(({ data }) => setTransactions(data.transactions))
      .catch(error => console.log(error))
  }, [])

  async function createTransaction (transactionInput: TransctionInput): Promise<void> {
    try {
      const { data: { transaction } } = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date()
      })

      setTransactions(state => [transaction, ...state])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransactions = () => useContext(TransactionsContext)

export { TransactionsProvider, useTransactions }

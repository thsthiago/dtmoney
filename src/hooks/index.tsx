import { FC } from "react";
import { TransactionsProvider } from "./useTransactions";

export const Contexts: FC = ({ children }) => (
  <TransactionsProvider>
    {children}
  </TransactionsProvider>
)

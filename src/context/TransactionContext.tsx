import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { INITIAL_TRANSACTIONS, Transaction } from '../data/transactions'
import { GymItem, GymPlan } from '../data/gyms'
import { PaymentSimulationResult } from '../utils/api'
import { storage } from '../utils/storage'

interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (paymentResult: PaymentSimulationResult, gym: GymItem, plan: GymPlan) => Transaction
  getTransactionById: (id: string) => Transaction | undefined
  refundTransaction: (id: string) => void
}

const TransactionContext = createContext<TransactionContextType | null>(null)

const TRANSACTIONS_KEY = 'gymapp_transactions'

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)

  // Initialize from AsyncStorage
  useEffect(() => {
    storage.getItem<Transaction[]>(TRANSACTIONS_KEY, INITIAL_TRANSACTIONS).then((saved) => {
      if (saved) setTransactions(saved)
    })
  }, [])

  // Persist transactions
  useEffect(() => {
    storage.setItem(TRANSACTIONS_KEY, transactions)
  }, [transactions])

  const addTransaction = (paymentResult: PaymentSimulationResult, gym: GymItem, plan: GymPlan): Transaction => {
    const now = new Date()
    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      gymId: gym.id,
      gymName: gym.name,
      locality: gym.locality,
      planName: plan.name,
      planDuration: `${plan.durationDays} days`,
      amount: plan.price,
      status: 'PAID',
      date: now.toISOString(),
      displayDate:
        now.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }) +
        ', ' +
        now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }),
      monthGroup: now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      paymentMethod: 'UPI',
      paymentId: paymentResult.paymentId || `pay_UPI_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      orderId: paymentResult.orderId || `ord_LDH_${Math.floor(100000 + Math.random() * 900000)}`,
      voucherCode: paymentResult.voucherCode || `GYM-LDH-${Math.floor(1000 + Math.random() * 9000)}`,
      voucherValidUntil: paymentResult.validUntil || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      canRefund: true,
    }

    setTransactions((prev) => [newTx, ...prev])
    return newTx
  }

  const getTransactionById = (id: string): Transaction | undefined => {
    return transactions.find((t) => t.id === id)
  }

  const refundTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'REFUNDED' as const,
              canRefund: false,
            }
          : t
      )
    )
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        getTransactionById,
        refundTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions(): TransactionContextType {
  const context = useContext(TransactionContext)
  if (!context) throw new Error('useTransactions must be used within TransactionProvider')
  return context
}

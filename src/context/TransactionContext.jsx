import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/transactions.js'

const TransactionContext = createContext(null)

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('gymapp_transactions')
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
    } catch {
      return INITIAL_TRANSACTIONS
    }
  })

  useEffect(() => {
    localStorage.setItem('gymapp_transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (paymentResult, gym, plan) => {
    const newTx = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      gymId: gym.id,
      gymName: gym.name,
      locality: gym.locality,
      planName: plan.name,
      planDuration: `${plan.durationDays} days`,
      amount: plan.price,
      status: 'PAID',
      date: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true }),
      monthGroup: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      paymentMethod: 'UPI',
      paymentId: paymentResult.paymentId,
      orderId: paymentResult.orderId,
      voucherCode: paymentResult.voucherCode,
      voucherValidUntil: paymentResult.validUntil,
      canRefund: true,
    }

    setTransactions((prev) => [newTx, ...prev])
    return newTx
  }

  const getTransactionById = (id) => {
    return transactions.find((t) => t.id === id)
  }

  const refundTransaction = (id) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'REFUNDED',
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

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) throw new Error('useTransactions must be used within TransactionProvider')
  return context
}


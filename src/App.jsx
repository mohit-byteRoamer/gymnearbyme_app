import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import { PlanProvider } from './context/PlanContext.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'
import { DevStateProvider } from './context/DevStateContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

import { AppLayout } from './components/layout/AppLayout.jsx'
import { SplashPage } from './pages/SplashPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ChooseAreaPage } from './pages/ChooseAreaPage.jsx'
import { GymDetailPage } from './pages/GymDetailPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { PaymentConfirmingPage } from './pages/PaymentConfirmingPage.jsx'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage.jsx'
import { PaymentFailedPage } from './pages/PaymentFailedPage.jsx'
import { MyPlanPage } from './pages/MyPlanPage.jsx'
import { TransactionsPage } from './pages/TransactionsPage.jsx'
import { TransactionDetailPage } from './pages/TransactionDetailPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-3 border-brand border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <PlanProvider>
            <TransactionProvider>
              <DevStateProvider>
                <ToastProvider>
                  <Routes>
                    {/* Splash Screen */}
                    <Route path="/" element={<SplashPage />} />

                    {/* Login Screen */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Main Flow inside AppLayout */}
                    <Route
                      element={
                        <ProtectedRoute>
                          <AppLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/choose-area" element={<ChooseAreaPage />} />
                      <Route path="/gym/:id" element={<GymDetailPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/payment/confirming" element={<PaymentConfirmingPage />} />
                      <Route path="/payment/success" element={<PaymentSuccessPage />} />
                      <Route path="/payment/failed" element={<PaymentFailedPage />} />
                      <Route path="/my-plan" element={<MyPlanPage />} />
                      <Route path="/transactions" element={<TransactionsPage />} />
                      <Route path="/transactions/:id" element={<TransactionDetailPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                    {/* Catch all fallback */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </ToastProvider>
              </DevStateProvider>
            </TransactionProvider>
          </PlanProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


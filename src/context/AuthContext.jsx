import React, { createContext, useContext, useState, useEffect } from 'react'
import { simulateGoogleSignIn } from '../utils/api.js'

const AuthContext = createContext(null)

const DEMO_USER = {
  id: 'user-amrit-singh',
  name: 'Amritpal Singh',
  email: 'amrit.singh@gmail.com',
  phone: '+919876543210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  joinedDate: 'November 2026',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gymapp_user')
      return saved ? JSON.parse(saved) : DEMO_USER
    } catch {
      return DEMO_USER
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      localStorage.setItem('gymapp_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('gymapp_user')
    }
  }, [user])

  const signIn = async (shouldFail = false) => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await simulateGoogleSignIn(shouldFail)
      setUser(loggedInUser)
      return loggedInUser
    } catch (err) {
      setError(err.message || 'Sign in did not work. Please try again.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('gymapp_user')
  }

  const updatePhone = (phone) => {
    if (!user) return
    const updated = { ...user, phone }
    setUser(updated)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        signIn,
        signOut,
        updatePhone,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}


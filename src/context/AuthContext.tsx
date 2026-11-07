import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { simulateGoogleSignIn, UserProfile } from '../utils/api'
import { storage } from '../utils/storage'

export const DEMO_USER: UserProfile = {
  id: 'user-amrit-singh',
  name: 'Amritpal Singh',
  email: 'amrit.singh@gmail.com',
  phone: '+919876543210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  joinedDate: 'November 2026',
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  signIn: (shouldFail?: boolean) => Promise<UserProfile>
  signOut: () => void
  updatePhone: (phone: string) => void
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AUTH_STORAGE_KEY = 'gymapp_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize from AsyncStorage
  useEffect(() => {
    storage.getItem<UserProfile | null>(AUTH_STORAGE_KEY, DEMO_USER).then((saved) => {
      if (saved) setUser(saved)
    })
  }, [])

  // Persist on change
  useEffect(() => {
    if (user) {
      storage.setItem(AUTH_STORAGE_KEY, user)
    } else {
      storage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const signIn = async (shouldFail: boolean = false): Promise<UserProfile> => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await simulateGoogleSignIn(shouldFail)
      setUser(loggedInUser)
      await storage.setItem(AUTH_STORAGE_KEY, loggedInUser)
      return loggedInUser
    } catch (err: any) {
      const msg = err.message || 'Sign in did not work. Please try again.'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    storage.removeItem(AUTH_STORAGE_KEY)
  }

  const updatePhone = (phone: string) => {
    if (!user) return
    const updated = { ...user, phone }
    setUser(updated)
    storage.setItem(AUTH_STORAGE_KEY, updated)
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { simulateGoogleSignIn, simulatePhoneSignIn, UserProfile } from '../utils/api'
import { storage } from '../utils/storage'

export const DEMO_USER: UserProfile = {
  id: 'user-amrit-singh',
  name: 'Amritpal Singh',
  firstName: 'Amritpal',
  lastName: 'Singh',
  email: 'amrit.singh@gmail.com',
  phone: '+919876543210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  joinedDate: 'November 2026',
  hasCompletedProfile: true,
  isGuest: false,
}

export const GUEST_USER: UserProfile = {
  id: 'guest-explorer',
  name: 'Guest Explorer',
  firstName: 'Guest',
  lastName: '',
  email: '',
  phone: '',
  avatar: '',
  joinedDate: 'Today',
  hasCompletedProfile: true,
  isGuest: true,
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isGuest: boolean
  isLoading: boolean
  error: string | null
  isFirstTimeUser: boolean
  setIsFirstTimeUser: (v: boolean) => void
  signIn: (shouldFail?: boolean, forceFirstTime?: boolean) => Promise<{ user: UserProfile; isFirstTime: boolean }>
  signInWithPhone: (phone: string, forceFirstTime?: boolean) => Promise<{ user: UserProfile; isFirstTime: boolean }>
  continueAsGuest: () => void
  completeProfile: (firstName: string, lastName: string) => Promise<UserProfile>
  signOut: () => void
  updatePhone: (phone: string) => void
  setError: (error: string | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const AUTH_STORAGE_KEY = 'gymapp_user'
const FIRST_TIME_STORAGE_KEY = 'gymapp_first_time_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER)
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize from AsyncStorage
  useEffect(() => {
    storage.getItem<UserProfile | null>(AUTH_STORAGE_KEY, DEMO_USER).then((saved) => {
      if (saved) setUser(saved)
    })
    storage.getItem<boolean>(FIRST_TIME_STORAGE_KEY, true).then((val) => {
      if (typeof val === 'boolean') setIsFirstTimeUser(val)
    })
  }, [])

  // Persist user on change
  useEffect(() => {
    if (user) {
      storage.setItem(AUTH_STORAGE_KEY, user)
    } else {
      storage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  // Persist first-time flag
  useEffect(() => {
    storage.setItem(FIRST_TIME_STORAGE_KEY, isFirstTimeUser)
  }, [isFirstTimeUser])

  const signIn = async (
    shouldFail: boolean = false,
    forceFirstTime?: boolean
  ): Promise<{ user: UserProfile; isFirstTime: boolean }> => {
    setIsLoading(true)
    setError(null)
    try {
      const isFirst = forceFirstTime !== undefined ? forceFirstTime : isFirstTimeUser
      const loggedInUser = await simulateGoogleSignIn(shouldFail, isFirst)
      setUser(loggedInUser)
      await storage.setItem(AUTH_STORAGE_KEY, loggedInUser)
      return { user: loggedInUser, isFirstTime: isFirst }
    } catch (err: any) {
      const msg = err.message || 'Sign in did not work. Please try again.'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithPhone = async (
    phone: string,
    forceFirstTime?: boolean
  ): Promise<{ user: UserProfile; isFirstTime: boolean }> => {
    setIsLoading(true)
    setError(null)
    try {
      const isFirst = forceFirstTime !== undefined ? forceFirstTime : isFirstTimeUser
      const loggedInUser = await simulatePhoneSignIn(phone, isFirst)
      setUser(loggedInUser)
      await storage.setItem(AUTH_STORAGE_KEY, loggedInUser)
      return { user: loggedInUser, isFirstTime: isFirst }
    } catch (err: any) {
      const msg = err.message || 'Phone verification failed.'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const continueAsGuest = () => {
    setUser(GUEST_USER)
    setIsFirstTimeUser(false)
    storage.setItem(AUTH_STORAGE_KEY, GUEST_USER)
  }

  const completeProfile = async (firstName: string, lastName: string): Promise<UserProfile> => {
    if (!user) throw new Error('No user is currently logged in')
    const trimmedFirst = firstName.trim()
    const trimmedLast = lastName.trim()
    const fullName = trimmedLast ? `${trimmedFirst} ${trimmedLast}` : trimmedFirst

    const updatedUser: UserProfile = {
      ...user,
      firstName: trimmedFirst,
      lastName: trimmedLast,
      name: fullName,
      hasCompletedProfile: true,
      isGuest: false,
    }

    setUser(updatedUser)
    setIsFirstTimeUser(false)
    await storage.setItem(AUTH_STORAGE_KEY, updatedUser)
    await storage.setItem(FIRST_TIME_STORAGE_KEY, false)
    return updatedUser
  }

  const signOut = () => {
    setUser(null)
    setIsFirstTimeUser(true)
    storage.removeItem(AUTH_STORAGE_KEY)
    storage.setItem(FIRST_TIME_STORAGE_KEY, true)
  }

  const updatePhone = (phone: string) => {
    if (!user) return
    const updated = { ...user, phone }
    setUser(updated)
    storage.setItem(AUTH_STORAGE_KEY, updated)
  }

  const isGuest = !!user?.isGuest
  const isAuthenticated = !!user && !user.isGuest && !!user.hasCompletedProfile

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        isLoading,
        error,
        isFirstTimeUser,
        setIsFirstTimeUser,
        signIn,
        signInWithPhone,
        continueAsGuest,
        completeProfile,
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

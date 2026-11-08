import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { storage } from '../utils/storage'
import { useToast } from './ToastContext'
import { GYMS, GymItem } from '../data/gyms'

const STORAGE_KEY = 'gymapp_bookmarked_gym_ids'

interface BookmarkContextType {
  bookmarkedIds: string[]
  bookmarkedGyms: GymItem[]
  isBookmarked: (gymId: string) => boolean
  toggleBookmark: (gymId: string, gymName?: string) => Promise<void>
  addBookmark: (gymId: string, gymName?: string) => Promise<void>
  removeBookmark: (gymId: string, gymName?: string) => Promise<void>
  clearBookmarks: () => Promise<void>
  isLoading: boolean
}

const BookmarkContext = createContext<BookmarkContextType | null>(null)

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  // Load saved bookmarks from persistent storage on mount
  useEffect(() => {
    let isMounted = true
    const loadBookmarks = async () => {
      try {
        const stored = await storage.getItem<string[]>(STORAGE_KEY, [])
        if (isMounted && Array.isArray(stored)) {
          setBookmarkedIds(stored)
        }
      } catch {
        // Fallback to empty array
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadBookmarks()
    return () => {
      isMounted = false
    }
  }, [])

  // Derived list of GymItem objects corresponding to bookmarked IDs
  const bookmarkedGyms = useMemo(() => {
    if (bookmarkedIds.length === 0) return []
    return GYMS.filter((gym) => bookmarkedIds.includes(gym.id))
  }, [bookmarkedIds])

  const isBookmarked = useCallback(
    (gymId: string) => bookmarkedIds.includes(gymId),
    [bookmarkedIds]
  )

  const addBookmark = useCallback(
    async (gymId: string, gymName?: string) => {
      const next = bookmarkedIds.includes(gymId) ? bookmarkedIds : [...bookmarkedIds, gymId]
      setBookmarkedIds(next)
      await storage.setItem(STORAGE_KEY, next)
      showToast(`${gymName || 'Gym'} added to saved bookmarks`, 'info')
    },
    [bookmarkedIds, showToast]
  )

  const removeBookmark = useCallback(
    async (gymId: string, gymName?: string) => {
      const next = bookmarkedIds.filter((id) => id !== gymId)
      setBookmarkedIds(next)
      await storage.setItem(STORAGE_KEY, next)
      showToast(`${gymName || 'Gym'} removed from bookmarks`, 'info')
    },
    [bookmarkedIds, showToast]
  )

  const toggleBookmark = useCallback(
    async (gymId: string, gymName?: string) => {
      if (bookmarkedIds.includes(gymId)) {
        await removeBookmark(gymId, gymName)
      } else {
        await addBookmark(gymId, gymName)
      }
    },
    [bookmarkedIds, addBookmark, removeBookmark]
  )

  const clearBookmarks = useCallback(async () => {
    setBookmarkedIds([])
    await storage.setItem(STORAGE_KEY, [])
    showToast('All saved bookmarks cleared', 'info')
  }, [showToast])

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds,
        bookmarkedGyms,
        isBookmarked,
        toggleBookmark,
        addBookmark,
        removeBookmark,
        clearBookmarks,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}


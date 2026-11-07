import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import { Trainer } from '../types/index'

interface GymDetailState {
  selectedPlanId: string
  isMobileSheetOpen: boolean
  isLightboxOpen: boolean
  lightboxIndex: number
  activeSection: string
  isFavorite: boolean
  theme: 'light' | 'dark'
  selectedTrainer: Trainer | null
  reviewFilter: 'all' | 'latest' | 'highest' | 'lowest'
  setSelectedPlanId: (id: string) => void
  setIsMobileSheetOpen: (open: boolean) => void
  openLightbox: (index?: number) => void
  closeLightbox: () => void
  setActiveSection: (section: string) => void
  toggleFavorite: () => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  setSelectedTrainer: (trainer: Trainer | null) => void
  setReviewFilter: (filter: 'all' | 'latest' | 'highest' | 'lowest') => void
}

export const useGymDetailStore = create<GymDetailState>()(
  persist(
    (set) => ({
      selectedPlanId: 'plan-cult-yearly',
      isMobileSheetOpen: false,
      isLightboxOpen: false,
      lightboxIndex: 0,
      activeSection: 'overview',
      isFavorite: false,
      theme: 'light',
      selectedTrainer: null,
      reviewFilter: 'all',

      setSelectedPlanId: (id) => set({ selectedPlanId: id }),
      setIsMobileSheetOpen: (open) => set({ isMobileSheetOpen: open }),
      openLightbox: (index = 0) => set({ isLightboxOpen: true, lightboxIndex: index }),
      closeLightbox: () => set({ isLightboxOpen: false }),
      setActiveSection: (section) => set({ activeSection: section }),
      toggleFavorite: () => set((state) => ({ isFavorite: !state.isFavorite })),
      setTheme: (theme) => {
        if (Platform.OS === 'web' && typeof document !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
        set({ theme })
      },
      toggleTheme: () =>
        set((state) => {
          const nextTheme = state.theme === 'light' ? 'dark' : 'light'
          if (Platform.OS === 'web' && typeof document !== 'undefined') {
            if (nextTheme === 'dark') {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          }
          return { theme: nextTheme }
        }),
      setSelectedTrainer: (trainer) => set({ selectedTrainer: trainer }),
      setReviewFilter: (filter) => set({ reviewFilter: filter }),
    }),
    {
      name: 'gym-detail-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedPlanId: state.selectedPlanId,
        isFavorite: state.isFavorite,
        theme: state.theme,
      }),
    }
  )
)

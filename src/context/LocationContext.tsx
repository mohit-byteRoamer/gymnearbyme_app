import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import * as Location from 'expo-location'
import { LOCALITIES, Locality } from '../data/localities'
import { storage } from '../utils/storage'

export interface SelectedArea {
  id: string
  name: string
  shortName: string
}

interface LocationContextType {
  selectedLocality: SelectedArea
  hasPromptedLocation: boolean
  isLocationSheetOpen: boolean
  openLocationSheet: () => void
  closeLocationSheet: () => void
  allowLocation: () => Promise<void>
  setLocalityById: (localityId: string) => void
}

const LocationContext = createContext<LocationContextType | null>(null)

export const DEFAULT_AREA: SelectedArea = {
  id: 'model-town',
  name: 'Model Town, Ludhiana',
  shortName: 'Model Town',
}

const LOCALITY_STORAGE_KEY = 'gymapp_locality'
const LOCATION_PROMPTED_KEY = 'gymapp_location_prompted'

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocality, setSelectedLocality] = useState<SelectedArea>(DEFAULT_AREA)
  const [hasPromptedLocation, setHasPromptedLocation] = useState(false)
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false)

  // Initialize from AsyncStorage
  useEffect(() => {
    storage.getItem<SelectedArea>(LOCALITY_STORAGE_KEY, DEFAULT_AREA).then((saved) => {
      if (saved) setSelectedLocality(saved)
    })
    storage.getItem<boolean>(LOCATION_PROMPTED_KEY, false).then((prompted) => {
      setHasPromptedLocation(prompted)
    })
  }, [])

  // Persist selected locality
  useEffect(() => {
    storage.setItem(LOCALITY_STORAGE_KEY, selectedLocality)
  }, [selectedLocality])

  const allowLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status === 'granted') {
        // In Ludhiana, default to Model Town
        setSelectedLocality(DEFAULT_AREA)
      }
    } catch {
      // Permission request fallback
      setSelectedLocality(DEFAULT_AREA)
    } finally {
      setHasPromptedLocation(true)
      await storage.setItem(LOCATION_PROMPTED_KEY, true)
      setIsLocationSheetOpen(false)
    }
  }

  const setLocalityById = (localityId: string) => {
    if (localityId === 'all') {
      setSelectedLocality({ id: 'all', name: 'All Ludhiana', shortName: 'All Ludhiana' })
    } else {
      const loc = LOCALITIES.find((l) => l.id === localityId)
      if (loc) {
        setSelectedLocality({
          id: loc.id,
          name: `${loc.name}, Ludhiana`,
          shortName: loc.name,
        })
      }
    }
    setHasPromptedLocation(true)
    storage.setItem(LOCATION_PROMPTED_KEY, true)
    setIsLocationSheetOpen(false)
  }

  const openLocationSheet = () => setIsLocationSheetOpen(true)
  const closeLocationSheet = () => setIsLocationSheetOpen(false)

  return (
    <LocationContext.Provider
      value={{
        selectedLocality,
        hasPromptedLocation,
        isLocationSheetOpen,
        openLocationSheet,
        closeLocationSheet,
        allowLocation,
        setLocalityById,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation(): LocationContextType {
  const context = useContext(LocationContext)
  if (!context) throw new Error('useLocation must be used within LocationProvider')
  return context
}

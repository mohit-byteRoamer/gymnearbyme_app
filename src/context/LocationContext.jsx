import React, { createContext, useContext, useState, useEffect } from 'react'
import { LOCALITIES } from '../data/localities.js'

const LocationContext = createContext(null)

const DEFAULT_AREA = {
  id: 'model-town',
  name: 'Model Town, Ludhiana',
  shortName: 'Model Town',
}

export function LocationProvider({ children }) {
  const [selectedLocality, setSelectedLocality] = useState(() => {
    try {
      const saved = localStorage.getItem('gymapp_locality')
      return saved ? JSON.parse(saved) : DEFAULT_AREA
    } catch {
      return DEFAULT_AREA
    }
  })

  const [hasPromptedLocation, setHasPromptedLocation] = useState(() => {
    return localStorage.getItem('gymapp_location_prompted') === 'true'
  })

  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('gymapp_locality', JSON.stringify(selectedLocality))
  }, [selectedLocality])

  const allowLocation = () => {
    setSelectedLocality(DEFAULT_AREA)
    setHasPromptedLocation(true)
    localStorage.setItem('gymapp_location_prompted', 'true')
    setIsLocationSheetOpen(false)
  }

  const setLocalityById = (localityId) => {
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
    localStorage.setItem('gymapp_location_prompted', 'true')
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

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) throw new Error('useLocation must be used within LocationProvider')
  return context
}


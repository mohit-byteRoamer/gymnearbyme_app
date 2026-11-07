import React, { useState, useEffect } from 'react'
import { MapPin, ChevronDown, Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLocation } from '../context/LocationContext.jsx'
import { useDevState } from '../context/DevStateContext.jsx'
import { getGyms } from '../utils/api.js'
import { GymCard } from '../components/gym/GymCard.jsx'
import { GymCardSkeleton } from '../components/common/Skeleton.jsx'
import { Button } from '../components/common/Button.jsx'

export function HomePage() {
  const { user } = useAuth()
  const { selectedLocality } = useLocation()
  const { forceEmptyGyms, forceLoading } = useDevState()
  const navigate = useNavigate()

  const [gyms, setGyms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    getGyms({
      locality: selectedLocality.id,
      search: searchQuery,
    })
      .then((data) => {
        if (!isMounted) return
        if (forceEmptyGyms) {
          setGyms([])
        } else {
          setGyms(data)
        }
      })
      .catch(() => {
        if (isMounted) setGyms([])
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [selectedLocality.id, searchQuery, forceEmptyGyms])

  const isLoadingState = loading || forceLoading

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      {/* Top Header Row: Location Chip on left, Avatar on right */}
      <div className="flex items-center justify-between gap-3">
        {/* Location Chip: pin + "Model Town, Ludhiana" + chevron */}
        <button
          onClick={() => navigate('/choose-area')}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-subtle hover:border-slate-300 transition-all text-left active:scale-[0.98] group"
        >
          <MapPin className="w-4 h-4 text-brand shrink-0" />
          <span className="text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors line-clamp-1">
            {selectedLocality.name}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-0.5" />
        </button>

        {/* User Avatar */}
        <div
          onClick={() => navigate('/profile')}
          className="cursor-pointer shrink-0"
          title={user?.name || 'Profile'}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs hover:ring-brand transition"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-50 text-brand font-bold text-sm flex items-center justify-center border border-brand-100">
              {user?.name?.[0] || 'U'}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search gyms by name or area"
          className="w-full h-12 pl-10 pr-10 bg-white rounded-xl border border-slate-200/90 shadow-subtle text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Section Header: "Gyms near you" + "Nearest first" */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Gyms near you
        </h2>
        <span className="text-xs text-slate-400 font-medium">
          Nearest first
        </span>
      </div>

      {/* Content Grid / States */}
      {isLoadingState ? (
        /* Skeleton Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <GymCardSkeleton />
          <GymCardSkeleton />
          <GymCardSkeleton />
          <GymCardSkeleton />
          <GymCardSkeleton />
          <GymCardSkeleton />
        </div>
      ) : gyms.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-card border border-slate-200/80 p-8 sm:p-12 text-center shadow-card max-w-md mx-auto my-6">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No gyms found here
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            We couldn't find any gyms matching "{searchQuery || selectedLocality.shortName}". Try changing the area or clearing your search.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              setSearchQuery('')
              navigate('/choose-area')
            }}
          >
            Change area
          </Button>
        </div>
      ) : (
        /* Gym Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {gyms.map((gym) => (
            <GymCard key={gym.id} gym={gym} />
          ))}
        </div>
      )}
    </div>
  )
}

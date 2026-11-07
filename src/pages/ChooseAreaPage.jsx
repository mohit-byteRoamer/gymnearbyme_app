import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Navigation, Check, MapPin, X } from 'lucide-react'
import { LOCALITIES } from '../data/localities.js'
import { useLocation } from '../context/LocationContext.jsx'

export function ChooseAreaPage() {
  const navigate = useNavigate()
  const { selectedLocality, setLocalityById, allowLocation } = useLocation()
  const [search, setSearch] = useState('')

  const filteredLocalities = LOCALITIES.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (id) => {
    setLocalityById(id)
    navigate('/home')
  }

  const handleUseCurrentLocation = () => {
    allowLocation()
    navigate('/home')
  }

  return (
    <div className="max-w-form mx-auto px-4 py-4 sm:py-6 space-y-4">
      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Choose your area</h1>
      </div>

      {/* Search Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search locality in Ludhiana"
          className="w-full h-11 pl-10 pr-9 bg-white rounded-xl border border-slate-200 shadow-xs text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Localities Card */}
      <div className="bg-white rounded-card border border-slate-200/80 shadow-card overflow-hidden divide-y divide-slate-100">
        {/* Use My Current Location Row */}
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-blue-50/50 transition text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-brand flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-semibold text-brand block leading-tight">
                Use my current location
              </span>
              <span className="text-xs text-slate-400">
                Detects nearby gyms (Model Town, Ludhiana)
              </span>
            </div>
          </div>
        </button>

        {/* Localities List */}
        {filteredLocalities.map((loc) => {
          const isSelected = selectedLocality.id === loc.id
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleSelect(loc.id)}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-sm block leading-tight ${isSelected ? 'font-bold text-brand' : 'font-medium text-slate-800'}`}>
                    {loc.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {loc.id === 'all' ? 'All areas in Ludhiana' : `${loc.distanceKm} km away • ${loc.count} gyms`}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          )
        })}

        {filteredLocalities.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">
            No locality matching "{search}"
          </div>
        )}
      </div>
    </div>
  )
}


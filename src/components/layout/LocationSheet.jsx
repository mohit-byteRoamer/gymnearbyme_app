import React from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { Sheet } from '../common/Sheet.jsx'
import { Button } from '../common/Button.jsx'
import { useLocation } from '../../context/LocationContext.jsx'
import { useNavigate } from 'react-router-dom'

export function LocationSheet() {
  const { isLocationSheetOpen, closeLocationSheet, allowLocation } = useLocation()
  const navigate = useNavigate()

  const handleManual = () => {
    closeLocationSheet()
    navigate('/choose-area')
  }

  return (
    <Sheet isOpen={isLocationSheetOpen} onClose={closeLocationSheet} maxWidth="max-w-md">
      <div className="text-center py-2">
        {/* Pin icon in light blue circle */}
        <div className="w-16 h-16 rounded-full bg-blue-50 text-brand flex items-center justify-center mx-auto mb-4 ring-8 ring-blue-50/50">
          <MapPin className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">Show gyms near you</h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
          We use your location only to find nearby gyms in Ludhiana.
        </p>

        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={allowLocation}
            icon={Navigation}
          >
            Allow location
          </Button>

          <Button
            variant="secondary"
            fullWidth
            size="lg"
            onClick={handleManual}
          >
            Choose area manually
          </Button>
        </div>
      </div>
    </Sheet>
  )
}


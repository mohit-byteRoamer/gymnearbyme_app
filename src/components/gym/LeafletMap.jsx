import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import { MapPin, ExternalLink } from 'lucide-react'
import { Button } from '../common/Button.jsx'

export function LeafletMap({ lat = 30.8936, lng = 75.8344, gymName, address }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Initialize Leaflet map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      })

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map)

      // Custom high-resolution brand pin
      const customPin = L.divIcon({
        className: 'gym-custom-pin',
        html: `
          <div style="transform: translate(-50%, -100%);">
            <div style="background-color: #2563EB; width: 36px; height: 36px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(37,99,235,0.4); border: 2px solid #FFFFFF;">
              <div style="transform: rotate(45deg); color: white; font-weight: bold; font-size: 16px;">🏋️</div>
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      })

      L.marker([lat, lng], { icon: customPin }).addTo(map)
      mapInstanceRef.current = map
    } else {
      mapInstanceRef.current.setView([lat, lng], 15)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [lat, lng])

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-3">
      {/* Map Container */}
      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-xs z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Address & External Maps Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-start gap-2 text-sm text-slate-600 max-w-md">
          <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <span>{address}</span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={openGoogleMaps}
          icon={ExternalLink}
          className="shrink-0 self-start sm:self-auto"
        >
          Open in Maps
        </Button>
      </div>
    </div>
  )
}


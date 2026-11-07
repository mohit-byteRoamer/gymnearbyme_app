import React, { useEffect, useRef } from 'react'
import { View, Text, Linking } from 'react-native'
import { MapPin, ExternalLink } from 'lucide-react-native'
import { Button } from '../common/Button'

export interface LeafletMapProps {
  lat?: number
  lng?: number
  gymName?: string
  address?: string
}

export function LeafletMap({ lat = 30.8936, lng = 75.8344, address }: LeafletMapProps) {
  const mapContainerRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return

    if (typeof document !== 'undefined' && !document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    let isMounted = true

    // Dynamically import leaflet on client only to prevent SSR/static export errors
    import('leaflet').then((leafletModule) => {
      if (!isMounted || !mapContainerRef.current) return
      const L = (leafletModule as any).default || leafletModule

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 15,
          zoomControl: false,
          attributionControl: false,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map)

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
    }).catch((err) => {
      console.warn('Leaflet load error:', err)
    })

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [lat, lng])

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    Linking.openURL(url)
  }

  return (
    <View className="gap-3">
      {/* Map Container */}
      <View className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200/80 shadow-xs z-0">
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      </View>

      {/* Address & External Maps Button */}
      <View className="flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <View className="flex-row items-start gap-2 max-w-md flex-1">
          <MapPin size={16} color="#2563EB" style={{ marginTop: 2 }} />
          <Text className="text-sm text-slate-600 flex-1">{address}</Text>
        </View>

        <Button
          variant="secondary"
          size="sm"
          onPress={openGoogleMaps}
          icon={ExternalLink}
          className="shrink-0 self-start sm:self-auto"
        >
          Open in Maps
        </Button>
      </View>
    </View>
  )
}

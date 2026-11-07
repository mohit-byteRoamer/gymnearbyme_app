import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchGymDetail } from './api/gymApi.ts'
import { Gym } from './types/index.ts'
import { GymTopBar } from './components/GymTopBar.tsx'
import { GymHeroGallery } from './components/GymHeroGallery.tsx'
import { GymHeaderBlock } from './components/GymHeaderBlock.tsx'
import { GymSectionNav } from './components/GymSectionNav.tsx'
import { GymAboutSection } from './components/GymAboutSection.tsx'
import { GymTrainersSection } from './components/GymTrainersSection.tsx'
import { GymFacilitiesSection } from './components/GymFacilitiesSection.tsx'
import { GymTimingsSection } from './components/GymTimingsSection.tsx'
import { GymLocationSection } from './components/GymLocationSection.tsx'
import { GymReviewsSection } from './components/GymReviewsSection.tsx'
import { GymFaqSection } from './components/GymFaqSection.tsx'
import { GymSimilarSection } from './components/GymSimilarSection.tsx'
import { GymPricingCard } from './components/GymPricingCard.tsx'
import { GymMobileStickyBar } from './components/GymMobileStickyBar.tsx'
import { GymMobilePlanSheet } from './components/GymMobilePlanSheet.tsx'
import { TrainerModal } from './components/TrainerModal.tsx'
import { GymDetailSkeleton } from './components/GymDetailSkeleton.tsx'
import { Button } from '../../components/common/Button.jsx'

export function GymDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    // Default to 'cult-fit-sarabha' if none provided
    const gymId = id || 'cult-fit-sarabha'

    fetchGymDetail(gymId)
      .then((data) => {
        if (!isMounted) return
        setGym(data)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err.message || 'Unable to load gym details')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [id])

  // Inject JSON-LD Schema.org for SEO
  useEffect(() => {
    if (!gym) return
    const scriptId = 'gym-jsonld-schema'
    let script = document.getElementById(scriptId) as HTMLScriptElement
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'HealthClub',
      name: gym.name,
      image: gym.coverPhoto,
      telephone: gym.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: gym.address,
        addressLocality: gym.locality,
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: gym.lat,
        longitude: gym.lng,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: gym.rating,
        reviewCount: gym.reviewsCount,
      },
      priceRange: `₹${gym.minPrice}+`,
    }

    script.textContent = JSON.stringify(schemaData)

    // Document Title
    document.title = `${gym.name} · GymApp Ludhiana`

    return () => {
      const el = document.getElementById(scriptId)
      if (el) el.remove()
    }
  }, [gym])

  if (loading) {
    return <GymDetailSkeleton />
  }

  if (error || !gym) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Gym Not Found
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We couldn’t find the details for this gym. It may have been relocated or temporarily unlisted.
        </p>
        <div className="pt-2">
          <Button variant="primary" onClick={() => navigate('/home')}>
            Back to Gym Listings
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-3 pb-28 lg:pb-16 space-y-6">
        {/* 1. Top Bar */}
        <GymTopBar gym={gym} />

        {/* 2. Hero Bento Gallery */}
        <GymHeroGallery gym={gym} />

        {/* 3. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* LEFT COLUMN: Core Content (8 cols on lg+) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Header Block */}
            <GymHeaderBlock gym={gym} />

            {/* Sticky Section Nav */}
            <GymSectionNav />

            {/* About & USPs */}
            <GymAboutSection gym={gym} />

            {/* Certified Trainers */}
            <GymTrainersSection gym={gym} />

            {/* Facilities */}
            <GymFacilitiesSection gym={gym} />

            {/* Timings */}
            <GymTimingsSection gym={gym} />

            {/* Location & Map */}
            <GymLocationSection gym={gym} />

            {/* Member Reviews */}
            <GymReviewsSection gym={gym} />

            {/* FAQs */}
            <GymFaqSection gym={gym} />

            {/* Similar Gyms Nearby */}
            <GymSimilarSection />
          </div>

          {/* RIGHT COLUMN: Desktop Sticky Booking Card (4 cols on lg+) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <GymPricingCard gym={gym} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <GymMobileStickyBar gym={gym} />

      {/* Mobile Bottom Sheet Plan Selector */}
      <GymMobilePlanSheet gym={gym} />

      {/* Trainer Detail Modal */}
      <TrainerModal />
    </div>
  )
}


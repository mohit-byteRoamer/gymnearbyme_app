import React, { useState, useEffect } from 'react'
import {
  Image as ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Maximize2,
} from 'lucide-react'
import { Gym, VideoThumbnail } from '../types/index.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'

interface Props {
  gym: Gym
}

export function GymHeroGallery({ gym }: Props) {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const [activeMobileIndex, setActiveMobileIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState<VideoThumbnail>(
    gym.videoThumbnails?.[0] || null
  )

  const { isLightboxOpen, lightboxIndex, openLightbox, closeLightbox } =
    useGymDetailStore()

  const photos = gym.galleryPhotos || [gym.coverPhoto]
  const videos = gym.videoThumbnails || []

  // Fullscreen keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') {
        openLightbox((lightboxIndex + 1) % photos.length)
      }
      if (e.key === 'ArrowLeft') {
        openLightbox((lightboxIndex - 1 + photos.length) % photos.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, lightboxIndex, photos.length, closeLightbox, openLightbox])

  return (
    <div className="space-y-3">
      {/* Gallery Tabs (Photos vs Videos) */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'photos'
                ? 'bg-white dark:bg-slate-700 text-brand shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos ({photos.length})</span>
          </button>

          {videos.length > 0 && (
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'videos'
                  ? 'bg-white dark:bg-slate-700 text-brand shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos ({videos.length})</span>
            </button>
          )}
        </div>

        <button
          onClick={() => openLightbox(0)}
          className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fullscreen</span>
        </button>
      </div>

      {/* ================= PHOTOS TAB ================= */}
      {activeTab === 'photos' && (
        <>
          {/* Desktop Bento Grid (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[380px] lg:h-[420px] rounded-3xl overflow-hidden relative">
            {/* 1 Large Photo (Left 2 cols, span 2 rows) */}
            <div
              onClick={() => openLightbox(0)}
              className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden bg-slate-900"
            >
              <img
                src={photos[0]}
                alt={`${gym.name} main view`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
            </div>

            {/* 4 Small Photos (Right 2 cols, 2x2 grid) */}
            {photos.slice(1, 5).map((photo, idx) => {
              const photoIdx = idx + 1
              const isLast = idx === 3 && photos.length > 5

              return (
                <div
                  key={photoIdx}
                  onClick={() => openLightbox(photoIdx)}
                  className="relative group cursor-pointer overflow-hidden bg-slate-900"
                >
                  <img
                    src={photo}
                    alt={`${gym.name} view ${photoIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />

                  {/* "View all photos" overlay on last tile */}
                  {isLast && (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-2 text-center group-hover:bg-slate-950/80 transition">
                      <ImageIcon className="w-6 h-6 mb-1" />
                      <span className="text-sm font-bold">+{photos.length - 4} More</span>
                      <span className="text-[11px] text-slate-300">View All</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Swipeable Carousel (Visible below md) */}
          <div className="md:hidden relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={photos[activeMobileIndex]}
              alt={`${gym.name} ${activeMobileIndex + 1}`}
              className="w-full h-full object-cover"
              onClick={() => openLightbox(activeMobileIndex)}
            />

            {/* Counter Badge */}
            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {activeMobileIndex + 1}/{photos.length}
            </div>

            {/* Arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveMobileIndex(
                      (prev) => (prev - 1 + photos.length) % photos.length
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center active:scale-90"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveMobileIndex((prev) => (prev + 1) % photos.length)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center active:scale-90"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-2.5 inset-x-0 flex justify-center items-center gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMobileIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeMobileIndex ? 'w-5 bg-brand' : 'w-1.5 bg-white/60'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ================= VIDEOS TAB ================= */}
      {activeTab === 'videos' && (
        <div className="space-y-3">
          {/* Main Video Player */}
          {activeVideo && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-md">
              <video
                key={activeVideo.id}
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnail}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video.
              </video>
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                Now Playing: {activeVideo.title}
              </div>
            </div>
          )}

          {/* 3 Video Thumbnails */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {videos.map((vid) => {
              const isSelected = activeVideo?.id === vid.id
              return (
                <button
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className={`relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 text-left transition group ${
                    isSelected
                      ? 'ring-2 ring-brand ring-offset-2 border-brand scale-[1.02]'
                      : 'border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow ${
                        isSelected ? 'bg-brand text-white' : 'bg-white text-brand'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1.5 bg-black/80 text-white text-[10px] px-1 rounded font-medium">
                    {vid.duration}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN LIGHTBOX ================= */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-semibold">
              {lightboxIndex + 1} / {photos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden select-none">
            <img
              src={photos[lightboxIndex]}
              alt={`Full view ${lightboxIndex + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
            />

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                openLightbox((lightboxIndex - 1 + photos.length) % photos.length)
              }
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => openLightbox((lightboxIndex + 1) % photos.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex justify-center items-center gap-2 overflow-x-auto py-2">
            {photos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 transition ${
                  idx === lightboxIndex
                    ? 'ring-2 ring-brand scale-105'
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img src={p} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


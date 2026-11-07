import React, { useState, useRef, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  Maximize2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../../context/ToastContext.jsx'

export function PhotoGallery({ photos = [], videoThumbnails = [] }) {
  const [mediaType, setMediaType] = useState('photo') // 'photo' | 'video'
  const [photoIndex, setPhotoIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState(videoThumbnails[0] || null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const videoRef = useRef(null)
  const navigate = useNavigate()
  const { showToast } = useToast()

  const totalPhotos = photos.length || 1

  // Keep activeVideo in sync if videoThumbnails change
  useEffect(() => {
    if (videoThumbnails && videoThumbnails.length > 0 && !activeVideo) {
      setActiveVideo(videoThumbnails[0])
    }
  }, [videoThumbnails, activeVideo])

  // When switching videos, auto play
  useEffect(() => {
    if (mediaType === 'video' && videoRef.current && activeVideo?.videoUrl) {
      videoRef.current.load()
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented by browser policy (user interaction usually allows it)
        })
      }
    }
  }, [activeVideo, mediaType])

  const handlePrevPhoto = (e) => {
    e?.stopPropagation?.()
    setMediaType('photo')
    setPhotoIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1))
  }

  const handleNextPhoto = (e) => {
    e?.stopPropagation?.()
    setMediaType('photo')
    setPhotoIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1))
  }

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 45

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNextPhoto()
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrevPhoto()
    }
  }

  const handleVideoSelect = (video) => {
    setActiveVideo(video)
    setMediaType('video')
    showToast(`Playing: ${video.title}`, 'info')
  }

  const handleBackToPhotos = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setMediaType('photo')
  }

  return (
    <div className="space-y-3">
      {/* Media Type Switcher Tabs (Photos vs Videos) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={handleBackToPhotos}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              mediaType === 'photo'
                ? 'bg-white text-brand shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos ({totalPhotos})</span>
          </button>

          {videoThumbnails && videoThumbnails.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setMediaType('video')
                if (!activeVideo && videoThumbnails.length > 0) {
                  setActiveVideo(videoThumbnails[0])
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                mediaType === 'video'
                  ? 'bg-white text-brand shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Videos ({videoThumbnails.length})</span>
            </button>
          )}
        </div>

        {/* Counter or Status info */}
        {mediaType === 'photo' ? (
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Swipe or use arrows to view all photos
          </span>
        ) : (
          <button
            type="button"
            onClick={handleBackToPhotos}
            className="text-xs text-brand font-semibold hover:underline flex items-center gap-1"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Switch to Photos
          </button>
        )}
      </div>

      {/* 4:3 Gallery / Video Container */}
      <div
        className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-md select-none"
        onTouchStart={mediaType === 'photo' ? handleTouchStart : undefined}
        onTouchMove={mediaType === 'photo' ? handleTouchMove : undefined}
        onTouchEnd={mediaType === 'photo' ? handleTouchEnd : undefined}
      >
        {/* Floating Back Button (White circular) - always present to navigate back in history */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-900 flex items-center justify-center hover:bg-white active:scale-95 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* ================= PHOTO MODE ================= */}
        {mediaType === 'photo' && (
          <>
            {/* Main Photo with smooth cross-fade */}
            <img
              key={photoIndex}
              src={photos[photoIndex] || photos[0]}
              alt={`Gym photo ${photoIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Counter Badge */}
            <div className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {photoIndex + 1}/{totalPhotos}
            </div>

            {/* Arrow Navigation */}
            {totalPhotos > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-xs transition active:scale-90"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/45 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-xs transition active:scale-90"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom thumbnail strip for quick jumping between photos */}
            {totalPhotos > 1 && (
              <div className="absolute bottom-3 inset-x-0 z-10 flex justify-center items-center gap-1.5 px-4 overflow-x-auto py-1">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full max-w-full overflow-x-auto scrollbar-none">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPhotoIndex(idx)
                      }}
                      className={`h-2 rounded-full transition-all duration-200 ${
                        idx === photoIndex
                          ? 'w-6 bg-brand'
                          : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Jump to photo ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ================= VIDEO MODE ================= */}
        {mediaType === 'video' && activeVideo && (
          <div className="relative w-full h-full bg-black flex items-center justify-center">
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
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

            {/* Top Right "Back to Photos" button */}
            <button
              type="button"
              onClick={handleBackToPhotos}
              className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-white active:scale-95 transition"
            >
              <ImageIcon className="w-3.5 h-3.5 text-brand" />
              <span>Back to Photos</span>
            </button>

            {/* Video Title Pill at top center */}
            <div className="absolute top-4 left-16 right-36 z-10 hidden sm:flex items-center justify-center">
              <span className="bg-slate-900/85 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full truncate shadow">
                Now Playing: {activeVideo.title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Row of 3 Video Thumbnails with Play Icons */}
      {videoThumbnails && videoThumbnails.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <VideoIcon className="w-3.5 h-3.5 text-brand" />
              Gym Videos & Walkthroughs ({videoThumbnails.length})
            </span>
            <span className="text-[11px] text-slate-500">Tap to play</span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {videoThumbnails.slice(0, 3).map((video) => {
              const isSelected =
                mediaType === 'video' && activeVideo?.id === video.id

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleVideoSelect(video)}
                  className={`group relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 text-left cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-brand ring-offset-2 border-brand shadow-md scale-[1.02]'
                      : 'border border-slate-200 hover:border-brand/70 hover:shadow-sm'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`w-full h-full object-cover transition duration-300 ${
                      isSelected
                        ? 'opacity-80 scale-105'
                        : 'opacity-90 group-hover:scale-105'
                    }`}
                  />

                  {/* Overlay Dimmer & Play Icon */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition ${
                      isSelected
                        ? 'bg-brand/20'
                        : 'bg-black/35 group-hover:bg-black/20'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 ${
                        isSelected
                          ? 'bg-brand text-white scale-110 shadow-brand/40 shadow-lg'
                          : 'bg-white/95 text-brand group-hover:scale-110'
                      }`}
                    >
                      <Play
                        className={`w-4 h-4 ml-0.5 ${
                          isSelected ? 'fill-white text-white' : 'fill-brand text-brand'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Playing Status Pill */}
                  {isSelected && (
                    <div className="absolute top-1.5 left-1.5 bg-brand text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Playing
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/75 backdrop-blur-xs text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                    {video.duration}
                  </div>

                  {/* Title overlay at bottom for clarity */}
                  <div className="absolute bottom-0 inset-x-0 p-1.5 pt-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <p className="text-[11px] font-semibold text-white truncate drop-shadow-xs">
                      {video.title}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

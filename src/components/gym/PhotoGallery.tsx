import React, { useState } from 'react'
import { View, Text, Pressable, Platform, Linking } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
} from 'lucide-react-native'
import { GymVideo } from '../../data/gyms'
import { useToast } from '../../context/ToastContext'

export interface PhotoGalleryProps {
  photos?: string[]
  videoThumbnails?: GymVideo[]
}

export function PhotoGallery({ photos = [], videoThumbnails = [] }: PhotoGalleryProps) {
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo')
  const [photoIndex, setPhotoIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState<GymVideo | null>(videoThumbnails[0] || null)

  const router = useRouter()
  const { showToast } = useToast()
  const totalPhotos = photos.length || 1

  const handlePrevPhoto = () => {
    setMediaType('photo')
    setPhotoIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1))
  }

  const handleNextPhoto = () => {
    setMediaType('photo')
    setPhotoIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1))
  }

  const handleVideoSelect = (video: GymVideo) => {
    setActiveVideo(video)
    setMediaType('video')
    showToast(`Selected: ${video.title}`, 'info')
  }

  const handleBackToPhotos = () => {
    setMediaType('photo')
  }

  return (
    <View className="gap-3">
      {/* Media Switcher Tabs */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <Pressable
            onPress={handleBackToPhotos}
            className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              mediaType === 'photo' ? 'bg-white shadow-xs' : ''
            }`}
          >
            <ImageIcon size={14} color={mediaType === 'photo' ? '#2563EB' : '#475569'} />
            <Text
              className={`text-xs font-semibold ${
                mediaType === 'photo' ? 'text-brand' : 'text-slate-600'
              }`}
            >
              Photos ({totalPhotos})
            </Text>
          </Pressable>

          {videoThumbnails && videoThumbnails.length > 0 && (
            <Pressable
              onPress={() => {
                setMediaType('video')
                if (!activeVideo && videoThumbnails.length > 0) {
                  setActiveVideo(videoThumbnails[0])
                }
              }}
              className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                mediaType === 'video' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <VideoIcon size={14} color={mediaType === 'video' ? '#2563EB' : '#475569'} />
              <Text
                className={`text-xs font-semibold ${
                  mediaType === 'video' ? 'text-brand' : 'text-slate-600'
                }`}
              >
                Videos ({videoThumbnails.length})
              </Text>
            </Pressable>
          )}
        </View>

        {mediaType === 'photo' ? (
          <Text className="text-xs text-slate-500 font-medium hidden sm:flex">
            Tap arrows to view photos
          </Text>
        ) : (
          <Pressable onPress={handleBackToPhotos} className="flex-row items-center gap-1">
            <ImageIcon size={14} color="#2563EB" />
            <Text className="text-xs text-brand font-semibold">Switch to Photos</Text>
          </Pressable>
        )}
      </View>

      {/* Main Container */}
      <View className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-md">
        {/* Floating Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center active:scale-95"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={18} color="#0F172A" />
        </Pressable>

        {/* PHOTO MODE */}
        {mediaType === 'photo' && (
          <>
            <Image
              source={{ uri: photos[photoIndex] || photos[0] }}
              contentFit="cover"
              transition={200}
              className="w-full h-full"
            />

            {/* Counter Badge */}
            <View className="absolute top-4 right-4 z-10 bg-slate-900/80 px-2.5 py-1 rounded-full shadow-sm">
              <Text className="text-white text-xs font-semibold">
                {photoIndex + 1}/{totalPhotos}
              </Text>
            </View>

            {/* Navigation Arrows */}
            {totalPhotos > 1 && (
              <>
                <Pressable
                  onPress={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -mt-4 z-10 w-9 h-9 rounded-full bg-black/45 items-center justify-center active:scale-90"
                  accessibilityRole="button"
                  accessibilityLabel="Previous photo"
                >
                  <ChevronLeft size={20} color="#FFFFFF" />
                </Pressable>
                <Pressable
                  onPress={handleNextPhoto}
                  className="absolute right-3 top-1/2 -mt-4 z-10 w-9 h-9 rounded-full bg-black/45 items-center justify-center active:scale-90"
                  accessibilityRole="button"
                  accessibilityLabel="Next photo"
                >
                  <ChevronRight size={20} color="#FFFFFF" />
                </Pressable>
              </>
            )}

            {/* Dots / Jump Strip */}
            {totalPhotos > 1 && (
              <View className="absolute bottom-3 left-0 right-0 z-10 items-center justify-center">
                <View className="flex-row items-center gap-1.5 bg-black/50 px-2.5 py-1.5 rounded-full">
                  {photos.slice(0, 10).map((_, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => setPhotoIndex(idx)}
                      className={`h-2 rounded-full ${
                        idx === photoIndex ? 'w-6 bg-brand' : 'w-2 bg-white/60'
                      }`}
                    />
                  ))}
                </View>
              </View>
            )}
          </>
        )}

        {/* VIDEO MODE */}
        {mediaType === 'video' && activeVideo && (
          <View className="relative w-full h-full bg-black items-center justify-center">
            {Platform.OS === 'web' ? (
              <video
                key={activeVideo.id}
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnail}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <Pressable
                onPress={() => Linking.openURL(activeVideo.videoUrl)}
                className="w-full h-full items-center justify-center"
              >
                <Image
                  source={{ uri: activeVideo.thumbnail }}
                  contentFit="cover"
                  className="w-full h-full opacity-70"
                />
                <View className="absolute w-14 h-14 rounded-full bg-brand items-center justify-center shadow-lg">
                  <Play size={24} color="#FFFFFF" style={{ marginLeft: 3 }} />
                </View>
                <View className="absolute bottom-4 left-4 right-4 bg-black/60 p-2 rounded-lg">
                  <Text className="text-white text-xs font-semibold">{activeVideo.title}</Text>
                  <Text className="text-slate-300 text-[10px]">Tap to play video</Text>
                </View>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

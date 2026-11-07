import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Modal,
  Platform,
  Linking,
  StyleSheet,
} from 'react-native'
import { Image } from 'expo-image'
import {
  Image as ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Maximize2,
} from 'lucide-react-native'
import { Gym, VideoThumbnail } from '../types/index'
import { useGymDetailStore } from '../store/gymDetailStore'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface Props {
  gym: Gym
}

export function GymHeroGallery({ gym }: Props) {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const [mobileIndex, setMobileIndex] = useState(0)
  const [activeVideo, setActiveVideo] = useState<VideoThumbnail | null>(
    gym.videoThumbnails?.[0] || null
  )

  const { isLightboxOpen, lightboxIndex, openLightbox, closeLightbox } =
    useGymDetailStore()

  const { isPhone } = useBreakpoint()

  const photos = gym.galleryPhotos || [gym.coverPhoto]
  const videos = gym.videoThumbnails || []

  return (
    <View className="gap-3">
      {/* Gallery Tabs (Photos vs Videos) */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <Pressable
            onPress={() => setActiveTab('photos')}
            className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg ${
              activeTab === 'photos' ? 'bg-white shadow-xs' : ''
            }`}
          >
            <ImageIcon size={14} color={activeTab === 'photos' ? '#2563EB' : '#475569'} />
            <Text
              className={`text-xs font-semibold ${
                activeTab === 'photos' ? 'text-brand' : 'text-slate-600'
              }`}
            >
              Photos ({photos.length})
            </Text>
          </Pressable>

          {videos.length > 0 && (
            <Pressable
              onPress={() => setActiveTab('videos')}
              className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                activeTab === 'videos' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Video size={14} color={activeTab === 'videos' ? '#2563EB' : '#475569'} />
              <Text
                className={`text-xs font-semibold ${
                  activeTab === 'videos' ? 'text-brand' : 'text-slate-600'
                }`}
              >
                Videos ({videos.length})
              </Text>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={() => openLightbox(mobileIndex)}
          className="flex-row items-center gap-1"
        >
          <Maximize2 size={14} color="#2563EB" />
          <Text className="text-xs font-semibold text-brand">Fullscreen</Text>
        </Pressable>
      </View>

      {/* PHOTOS TAB */}
      {activeTab === 'photos' && (
        <View>
          {/* Mobile View */}
          {isPhone ? (
            <View style={{ width: '100%', aspectRatio: 16 / 10 }} className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <Image
                source={{ uri: photos[mobileIndex] || photos[0] }}
                contentFit="cover"
                style={StyleSheet.absoluteFill}
              />

              <View className="absolute top-3 right-3 bg-slate-900/80 px-2.5 py-1 rounded-full shadow-sm">
                <Text className="text-white text-xs font-semibold">
                  {mobileIndex + 1}/{photos.length}
                </Text>
              </View>

              {photos.length > 1 && (
                <>
                  <Pressable
                    onPress={() =>
                      setMobileIndex((prev) =>
                        prev === 0 ? photos.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -mt-4 w-8 h-8 rounded-full bg-black/40 items-center justify-center active:scale-90"
                  >
                    <ChevronLeft size={18} color="#FFFFFF" />
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      setMobileIndex((prev) =>
                        prev === photos.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -mt-4 w-8 h-8 rounded-full bg-black/40 items-center justify-center active:scale-90"
                  >
                    <ChevronRight size={18} color="#FFFFFF" />
                  </Pressable>
                </>
              )}
            </View>
          ) : (
            /* Tablet & Desktop Bento Grid */
            <View className="flex-row gap-3 h-[380px] lg:h-[420px] rounded-3xl overflow-hidden relative">
              {/* 1 Large Photo Left */}
              <Pressable
                onPress={() => openLightbox(0)}
                className="flex-1 relative bg-slate-900 overflow-hidden active:opacity-95"
              >
                <Image
                  source={{ uri: photos[0] }}
                  contentFit="cover"
                  className="w-full h-full"
                />
              </Pressable>

              {/* 4 Small Photos Right */}
              <View className="flex-1 flex-row flex-wrap gap-3">
                {photos.slice(1, 5).map((photo, i) => (
                  <Pressable
                    key={i}
                    onPress={() => openLightbox(i + 1)}
                    style={{ width: '48%', height: '48%' }}
                    className="relative bg-slate-900 rounded-xl overflow-hidden active:opacity-95"
                  >
                    <Image
                      source={{ uri: photo }}
                      contentFit="cover"
                      className="w-full h-full"
                    />
                    {i === 3 && photos.length > 5 && (
                      <View className="absolute inset-0 bg-black/60 items-center justify-center">
                        <Text className="text-white text-base font-extrabold">
                          +{photos.length - 5} photos
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
      )}

      {/* VIDEOS TAB */}
      {activeTab === 'videos' && activeVideo && (
        <View className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black items-center justify-center shadow-md">
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
              <View className="absolute w-16 h-16 rounded-full bg-brand items-center justify-center shadow-lg">
                <Play size={28} color="#FFFFFF" style={{ marginLeft: 3 }} />
              </View>
            </Pressable>
          )}
        </View>
      )}

      {/* Fullscreen Lightbox Modal */}
      <Modal
        visible={isLightboxOpen}
        transparent
        animationType="fade"
        onRequestClose={closeLightbox}
      >
        <View className="flex-1 bg-black/95 items-center justify-center p-4">
          <Pressable
            onPress={closeLightbox}
            className="absolute top-8 right-6 z-30 p-2 rounded-full bg-white/20 active:bg-white/40"
            accessibilityRole="button"
            accessibilityLabel="Close lightbox"
          >
            <X size={24} color="#FFFFFF" />
          </Pressable>

          <View className="w-full max-w-4xl aspect-[16/10] items-center justify-center">
            <Image
              source={{ uri: photos[lightboxIndex] || photos[0] }}
              contentFit="contain"
              className="w-full h-full"
            />
          </View>

          {/* Lightbox Arrows */}
          {photos.length > 1 && (
            <View className="flex-row items-center justify-between w-full max-w-4xl px-4 absolute">
              <Pressable
                onPress={() =>
                  openLightbox(
                    lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1
                  )
                }
                className="w-12 h-12 rounded-full bg-white/20 items-center justify-center active:bg-white/40"
              >
                <ChevronLeft size={28} color="#FFFFFF" />
              </Pressable>

              <Pressable
                onPress={() =>
                  openLightbox((lightboxIndex + 1) % photos.length)
                }
                className="w-12 h-12 rounded-full bg-white/20 items-center justify-center active:bg-white/40"
              >
                <ChevronRight size={28} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          <View className="absolute bottom-8 bg-black/60 px-4 py-1.5 rounded-full">
            <Text className="text-white text-xs font-semibold">
              {lightboxIndex + 1} of {photos.length}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

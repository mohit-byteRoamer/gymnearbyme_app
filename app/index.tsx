import '../global.css'
import  { useEffect } from 'react'
import { View, Text, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { Dumbbell } from 'lucide-react-native'
import { useAuth } from '../src/context/AuthContext'
import { softShadow } from '../src/theme/shadows'

export default function IndexScreen() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const target = isAuthenticated ? '/home' : '/login'
    if (Platform.OS === 'web') {
      router.replace(target as any)
      return
    }

    const timer = setTimeout(() => {
      router.replace(target as any)
    }, 1200)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="flex-1 bg-white items-center justify-center p-6 w-full"
    >
      {/* Centered Blue Logo with Soft Shadow */}
      <View
        style={[softShadow, { borderRadius: 24 }]}
        className="w-24 h-24 rounded-3xl bg-brand items-center justify-center mb-6"
      >
        <Dumbbell size={48} color="#FFFFFF" strokeWidth={2.2} />
      </View>

      {/* GymApp */}
      <Text className="text-[28px] font-bold text-slate-900 tracking-tight mb-2">
        GymApp
      </Text>

      {/* Muted Tagline */}
      <Text className="text-base text-slate-500 font-normal">
        Find your gym. Join in minutes.
      </Text>

      {/* Ludhiana Launch Pill */}
      <View className="mt-8">
        <View className="px-3.5 py-1.5 rounded-full bg-slate-100">
          <Text className="text-xs font-semibold text-slate-600">
            📍 Ludhiana, Punjab
          </Text>
        </View>
      </View>
    </View>
  )
}

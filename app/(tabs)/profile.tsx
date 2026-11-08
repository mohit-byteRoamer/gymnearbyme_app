import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import {
  ChevronRight,
  HelpCircle,
  FileText,
  Shield,
  RotateCcw,
  LogOut,
  Trash2,
  Edit2,
  Check,
  Bookmark,
} from 'lucide-react-native'
import { useAuth } from '../../src/context/AuthContext'
import { useToast } from '../../src/context/ToastContext'
import { useBookmarks } from '../../src/context/BookmarkContext'
import { storage } from '../../src/utils/storage'
import { useBreakpoint } from '../../src/hooks/useBreakpoint'
import { softShadow, softShadowSm } from '../../src/theme/shadows'

export default function ProfileScreen() {
  const { user, isGuest, signOut, updatePhone } = useAuth()
  const { showToast } = useToast()
  const { bookmarkedIds } = useBookmarks()
  const router = useRouter()
  const { isPhone } = useBreakpoint()

  const bookmarkedCount = bookmarkedIds.length

  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '+919876543210')

  const handleSavePhone = () => {
    updatePhone(phoneNumber)
    setIsEditingPhone(false)
    showToast('Phone number updated successfully', 'info')
  }

  const handleLogout = () => {
    signOut()
    router.replace('/login' as any)
  }

  const handleDeleteAccount = () => {
    const executeDelete = async () => {
      signOut()
      await storage.clear()
      showToast('Account data cleared successfully', 'info')
      router.replace('/login' as any)
    }

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Are you sure you want to delete your demo account and personal data?')) {
        executeDelete()
      }
    } else {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your demo account and personal data?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: executeDelete },
        ]
      )
    }
  }

  const navRows = [
    {
      label: 'Help and support',
      icon: HelpCircle,
      action: () => {
        if (Platform.OS === 'web') {
          alert('Support: Email help@gymapp.in or call 1800-120-GYM (Ludhiana)')
        } else {
          Alert.alert('Help & Support', 'Email: help@gymapp.in\nPhone: 1800-120-GYM (Ludhiana)')
        }
      },
    },
    {
      label: 'Terms of service',
      icon: FileText,
      action: () => {
        if (Platform.OS === 'web') {
          alert('GymApp Terms: Valid across participating gym clubs in Ludhiana.')
        } else {
          Alert.alert('Terms of Service', 'GymApp passes are valid across all participating gym clubs in Ludhiana.')
        }
      },
    },
    {
      label: 'Privacy policy',
      icon: Shield,
      action: () => {
        if (Platform.OS === 'web') {
          alert('Privacy Policy: We protect your phone and payment identifiers securely.')
        } else {
          Alert.alert('Privacy Policy', 'We protect your phone and payment identifiers securely.')
        }
      },
    },
    {
      label: 'Refund policy',
      icon: RotateCcw,
      action: () => {
        if (Platform.OS === 'web') {
          alert('Refund Policy: 100% money back before QR voucher scanning at the gym.')
        } else {
          Alert.alert('Refund Policy', '100% money back before QR voucher scanning at the gym.')
        }
      },
    },
  ]

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: isPhone ? 96 : 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="max-w-form w-full mx-auto px-4 py-4 sm:py-6 gap-6">
        <Text className="text-2xl font-bold text-slate-900 tracking-tight">
          Profile
        </Text>

        {/* User Info Card */}
        <View
          style={[softShadow, { borderRadius: 16 }]}
          className="bg-white border border-black/[0.04] p-5 items-center gap-3"
        >
          <View className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden items-center justify-center border-4 border-slate-50">
            {isGuest ? (
              <View className="w-full h-full bg-blue-50 items-center justify-center">
                <Text className="text-2xl font-bold text-brand">G</Text>
              </View>
            ) : user?.avatar ? (
              <Image source={{ uri: user.avatar }} className="w-full h-full" />
            ) : (
              <Text className="text-2xl font-bold text-brand">
                {user?.name?.[0] || 'A'}
              </Text>
            )}
          </View>

          <View className="items-center">
            <Text className="text-lg font-bold text-slate-900">
              {isGuest ? 'Guest Explorer' : user?.name || 'Amritpal Singh'}
            </Text>
            <Text className="text-xs text-slate-400">
              {isGuest
                ? 'Exploring without an account'
                : user?.email || 'amrit.singh@gmail.com'}
            </Text>
          </View>

          {/* Guest Sign-in prompt or Phone edit */}
          {isGuest ? (
            <Pressable
              onPress={() => router.push('/login' as any)}
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-brand items-center justify-center active:bg-blue-700"
            >
              <Text className="text-white text-xs font-bold">
                Sign In to Save Plans & Vouchers
              </Text>
            </Pressable>
          ) : (
            <View className="pt-2 border-t border-slate-100 w-full flex-row items-center justify-center gap-2">
              {isEditingPhone ? (
                <View className="flex-row items-center gap-2">
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    className="border border-brand rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium w-36 bg-blue-50/30"
                    autoFocus
                  />
                  <Pressable
                    onPress={handleSavePhone}
                    className="p-1.5 rounded-lg bg-brand text-white active:bg-blue-700"
                  >
                    <Check size={14} color="#FFFFFF" />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => setIsEditingPhone(true)}
                  className="flex-row items-center gap-1.5 py-1 px-2.5 rounded-lg active:bg-slate-50"
                >
                  <Text className="text-xs text-slate-600 font-medium">
                    {user?.phone || '+919876543210'}
                  </Text>
                  <Edit2 size={12} color="#94A3B8" />
                </Pressable>
              )}
            </View>
          )}
        </View>

        {/* Saved Gyms / Bookmarks Card */}
        <Pressable
          onPress={() => router.push('/bookmarks' as any)}
          style={[softShadow, { borderRadius: 16 }]}
          className="bg-white border border-black/[0.04] p-4 flex-row items-center justify-between active:bg-slate-50"
          accessibilityRole="button"
          accessibilityLabel="View saved gyms"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
              <Bookmark
                size={20}
                color="#2563EB"
                fill={bookmarkedCount > 0 ? '#2563EB' : 'transparent'}
              />
            </View>
            <View>
              <Text className="text-sm font-bold text-slate-900">
                Saved Gyms
              </Text>
              <Text className="text-xs text-slate-500">
                {bookmarkedCount === 1
                  ? '1 gym bookmarked'
                  : `${bookmarkedCount} gyms bookmarked`}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="bg-slate-100 px-2.5 py-0.5 rounded-full">
              <Text className="text-xs font-semibold text-slate-600">
                {bookmarkedCount}
              </Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </View>
        </Pressable>

        {/* Action Menu List */}
        <View
          style={[softShadow, { borderRadius: 16 }]}
          className="bg-white border border-black/[0.04] overflow-hidden"
        >
          {navRows.map((row, idx) => {
            const Icon = row.icon
            return (
              <Pressable
                key={row.label}
                onPress={row.action}
                className={`p-4 flex-row items-center justify-between active:bg-slate-50 ${
                  idx > 0 ? 'border-t border-slate-100' : ''
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Icon size={18} color="#64748B" />
                  <Text className="text-sm font-semibold text-slate-800">
                    {row.label}
                  </Text>
                </View>
                <ChevronRight size={16} color="#CBD5E1" />
              </Pressable>
            )
          })}
        </View>

        {/* Logout and Delete Buttons */}
        <View className="gap-2 pt-2">
          <Pressable
            onPress={handleLogout}
            style={[softShadowSm, { borderRadius: 16 }]}
            className="w-full py-3 px-4 bg-white border border-black/[0.04] flex-row items-center justify-center gap-2 active:bg-slate-50"
          >
            <LogOut size={16} color={isGuest ? '#2563EB' : '#DC2626'} />
            <Text
              className={`text-sm font-bold ${
                isGuest ? 'text-brand' : 'text-rose-600'
              }`}
            >
              {isGuest ? 'Exit Guest Mode' : 'Log out'}
            </Text>
          </Pressable>

          {!isGuest && (
            <Pressable
              onPress={handleDeleteAccount}
              className="w-full py-3 px-4 flex-row items-center justify-center gap-2 active:opacity-70"
            >
              <Trash2 size={14} color="#94A3B8" />
              <Text className="text-xs text-slate-400 font-medium">
                Delete demo account
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

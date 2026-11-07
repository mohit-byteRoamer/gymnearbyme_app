import React from 'react'
import {
  View,
  Text,
  Pressable,
  Switch,
  Modal,
  ScrollView,
} from 'react-native'
import { Settings2, X, RefreshCw } from 'lucide-react-native'
import { useDevState } from '../../context/DevStateContext'

export function DevStateSwitcher() {
  const {
    isOfflineForced,
    setIsOfflineForced,
    forceEmptyGyms,
    setForceEmptyGyms,
    forceLoading,
    setForceLoading,
    forceLoginError,
    setForceLoginError,
    forceGymNotJoining,
    setForceGymNotJoining,
    activePlanOverride,
    setActivePlanOverride,
    isDevSwitcherOpen,
    setIsDevSwitcherOpen,
    resetAllOverrides,
  } = useDevState()

  return (
    <>
      {/* Floating Toggle Button */}
      <View className="absolute bottom-20 md:bottom-6 right-4 z-50">
        <Pressable
          onPress={() => setIsDevSwitcherOpen(true)}
          className="bg-slate-900 flex-row items-center gap-1.5 p-2.5 px-3 rounded-full shadow-lg border border-slate-700 active:scale-95"
          accessibilityRole="button"
          accessibilityLabel="Dev State Switcher"
        >
          <Settings2 size={16} color="#3B82F6" />
          <Text className="text-white text-xs font-semibold">Dev States</Text>
        </Pressable>
      </View>

      {/* Modal Switcher Panel */}
      <Modal
        visible={isDevSwitcherOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDevSwitcherOpen(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center p-4">
          <View className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-80 max-h-[85%] flex-col">
            {/* Header */}
            <View className="flex-row items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <View className="flex-row items-center gap-1.5">
                <Settings2 size={16} color="#2563EB" />
                <Text className="font-bold text-slate-900 text-sm">
                  Dev State Switcher
                </Text>
              </View>
              <Pressable
                onPress={() => setIsDevSwitcherOpen(false)}
                className="p-1 rounded-lg active:bg-slate-100"
              >
                <X size={16} color="#94A3B8" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="gap-3">
              {/* Reset */}
              <Pressable
                onPress={resetAllOverrides}
                className="w-full py-2 px-2.5 bg-slate-100 active:bg-slate-200 rounded-lg flex-row items-center justify-center gap-1.5"
              >
                <RefreshCw size={14} color="#334155" />
                <Text className="text-slate-700 font-semibold text-xs">
                  Reset All Overrides
                </Text>
              </Pressable>

              {/* Toggles */}
              <View className="gap-2">
                <Text className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  Simulated States
                </Text>

                <View className="flex-row items-center justify-between py-1">
                  <Text className="text-xs text-slate-800">Offline Banner</Text>
                  <Switch
                    value={isOfflineForced}
                    onValueChange={setIsOfflineForced}
                    thumbColor={isOfflineForced ? '#2563EB' : '#f4f3f4'}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                  />
                </View>

                <View className="flex-row items-center justify-between py-1">
                  <Text className="text-xs text-slate-800">Empty Gyms</Text>
                  <Switch
                    value={forceEmptyGyms}
                    onValueChange={setForceEmptyGyms}
                    thumbColor={forceEmptyGyms ? '#2563EB' : '#f4f3f4'}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                  />
                </View>

                <View className="flex-row items-center justify-between py-1">
                  <Text className="text-xs text-slate-800">Force Loading</Text>
                  <Switch
                    value={forceLoading}
                    onValueChange={setForceLoading}
                    thumbColor={forceLoading ? '#2563EB' : '#f4f3f4'}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                  />
                </View>

                <View className="flex-row items-center justify-between py-1">
                  <Text className="text-xs text-slate-800">Login Error</Text>
                  <Switch
                    value={forceLoginError}
                    onValueChange={setForceLoginError}
                    thumbColor={forceLoginError ? '#2563EB' : '#f4f3f4'}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                  />
                </View>

                <View className="flex-row items-center justify-between py-1">
                  <Text className="text-xs text-slate-800">Online Joining Disabled</Text>
                  <Switch
                    value={forceGymNotJoining}
                    onValueChange={setForceGymNotJoining}
                    thumbColor={forceGymNotJoining ? '#2563EB' : '#f4f3f4'}
                    trackColor={{ false: '#CBD5E1', true: '#BFDBFE' }}
                  />
                </View>
              </View>

              {/* Plan Overrides */}
              <View className="gap-1.5 pt-2 border-t border-slate-100">
                <Text className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
                  My Plan Screen State
                </Text>
                {[
                  { label: 'Normal (Active 12 days)', val: null },
                  { label: 'Active Plan', val: 'ACTIVE' },
                  { label: 'Expiring Soon (5 days)', val: 'EXPIRING' },
                  { label: 'Paid - Not Activated', val: 'PAID_NOT_ACTIVATED' },
                  { label: 'Expired Plan', val: 'EXPIRED' },
                  { label: 'Empty (No Plan)', val: 'EMPTY' },
                ].map((item) => (
                  <Pressable
                    key={item.label}
                    onPress={() => setActivePlanOverride(item.val)}
                    className={`py-1.5 px-2.5 rounded-lg border ${
                      activePlanOverride === item.val
                        ? 'bg-blue-50 border-brand'
                        : 'border-slate-200'
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        activePlanOverride === item.val
                          ? 'font-bold text-brand'
                          : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}

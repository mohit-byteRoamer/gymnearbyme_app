import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Universal async storage wrapper with type safety and error suppression
 */
export const storage = {
  async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const item = await AsyncStorage.getItem(key)
      if (item === null) return defaultValue
      return JSON.parse(item) as T
    } catch {
      return defaultValue
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignored in non-persistent sandboxes
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key)
    } catch {
      // Ignored
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear()
    } catch {
      // Ignored
    }
  },
}


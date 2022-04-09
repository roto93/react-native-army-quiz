import AsyncStorage from '@react-native-async-storage/async-storage'

export const set = (key, value) => AsyncStorage.setItem(key, value)
export const get = (key) => AsyncStorage.getItem(key)
export const remove = (key) => AsyncStorage.removeItem(key)
export const clear = () => AsyncStorage.clear()
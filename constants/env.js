import { Platform } from "react-native"
import Constants from 'expo-constants'

const API_PORT = 8000

const devMachineHost = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  return hostUri ? hostUri.split(':')[0] : null;
};

const fallbackHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

export const env = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || `http://${devMachineHost() ?? fallbackHost}:${API_PORT}`,
  REQUEST_TIMEOUT_MS: 10_000,
}
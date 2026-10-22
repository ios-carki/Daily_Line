import * as SecureStore from "expo-secure-store"
const KEYS = { token: "auth.token" };
const storage = SecureStore;

export const tokenStorage = {
  async load() {
    return storage.getItemAsync(KEYS.token);
  },

  async save(token) {
    await storage.setItemAsync(KEYS.token, token)
  },

  async clear() {
    await storage.deleteItemAsync(KEYS.token)
  },
};

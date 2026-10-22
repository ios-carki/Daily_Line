import { createContext, useState } from "react";

import { tokenStorage } from "../util/token-storage";

export const AuthContext = createContext({
  token: null,
  isAuthenticated: false,
  user: null,
  authenticate: async (token, user) => {},
  logout: async () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null)

  async function authenticate(token, user) {
    await tokenStorage.save(token);
    setAuthToken(token);
    setUserData(user)
  }

  async function logout() {
    setAuthToken(null);
    setUserData(null)
    await tokenStorage.clear();
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    user: userData,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GlobalStyles } from "./constants/styles";
import LoginScreen from "./screens/LoginScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={HomeScreen} />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    jua: require("./assets/fonts/Jua-Regular.ttf"),
    pretendard: require("./assets/fonts/Pretendard-Regular.otf"),
    "pretendard-semibold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-bold": require("./assets/fonts/Pretendard-Bold.otf"),
    "gowun-bold": require("./assets/fonts/GowunBatang-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.paper50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  tempContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  tempContainer2: {
    gap: 12,
    width: "100%",
  },
});

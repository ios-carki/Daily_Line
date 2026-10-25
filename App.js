import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GlobalStyles } from "./constants/styles";
import LoginScreen from "./screens/LoginScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import AccountScreen from "./screens/AccountScreen";
import { defaultScreenOptions } from "./constants/navigationOptions";
import { fetchMe } from "./api/user";
import { tokenStorage } from "./util/token-storage";
import EditProfileScreen from "./screens/EditProfileScreen";
import WithdrawScreen from "./screens/WithdrawScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerTitle: "회원가입",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerTitle: "계정" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: "프로필 수정", presentation: "modal" }}
      />
      <Stack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{ headerTitle: "회원 탈퇴" }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const [fontsLoaded] = useFonts({
    jua: require("./assets/fonts/Jua-Regular.ttf"),
    pretendard: require("./assets/fonts/Pretendard-Regular.otf"),
    "pretendard-semibold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-bold": require("./assets/fonts/Pretendard-Bold.otf"),
    "gowun-bold": require("./assets/fonts/GowunBatang-Bold.ttf"),
  });
  const authCtx = useContext(AuthContext);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    async function restore() {
      try {
        const token = await tokenStorage.load();

        if (!token) {
          return;
        }
        const user = await fetchMe(token);

        await authCtx.authenticate(token, user);
      } catch (err) {
        if (err.response?.status === 401) {
          await tokenStorage.clear();
        }
      } finally {
        setIsRestoring(false);
      }
    }
    restore();
  }, []);

  const isReady = fontsLoaded && !isRestoring;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
      <StatusBar style="dark" />
    </AuthContextProvider>
  );
}

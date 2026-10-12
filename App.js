import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import Button from "./components/UI/Button";
import { GlobalStyles } from "./constants/styles";
import CircleButton from "./components/UI/CircleButton";
import Fab from "./components/UI/Fab";
import TextLink from "./components/UI/TextLink";
import Input from "./components/UI/Input";
import PasswordMeter from "./components/Auth/PasswordMeter";
import ErrorBanner from "./components/UI/ErrorBanner";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import ErrorOverlay from "./components/UI/ErrorOverlay";

SplashScreen.preventAutoHideAsync();

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
    <View style={styles.container}>
      <ErrorOverlay message="서버에 연결할 수 없어요. 서버가 켜져있는지 확인해주세요." />
      {/* <View style={styles.tempContainer}>
        <Button children="버튼a" style={{ flex: 1 }} />
        <Button children="버튼a" style={{ flex: 1 }} />
      </View>
      <CircleButton icon="settings-outline" disabled={true} />
      <StatusBar style="auto" />
      <Fab />
      <TextLink>회원가입</TextLink>
      <View style={styles.tempContainer2}>
        <ErrorBanner>
          서버에 연결할 수 없어요.
          {"\n"}
          서버가 켜져 있는지 확인해주세요.
        </ErrorBanner>
      </View>
    <LoadingOverlay message="로"></LoadingOverlay> */}
    </View>
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
    alignItems: "center",
    width: "100%",
  },
  tempContainer2: {
    gap: 12,
    width: "100%",
  },
});

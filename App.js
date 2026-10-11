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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "jua": require("./assets/fonts/Jua-Regular.ttf"),
    "pretendard": require("./assets/fonts/Pretendard-Regular.otf"),
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
      {/* <Button children="버튼" mode={"ghost"}/>
      <Button children="버튼" mode={"danger"}/> */}
      <View style={styles.tempContainer}>
        {/* <Button children="버튼" mode={"danger"}/> */}
        <Button children="버튼a" style={{flex: 1}}/>
        <Button children="버튼a" style={{flex: 1}}/>
      </View>
      <CircleButton icon="settings-outline" disabled={true} />
      <StatusBar style="auto" />
      <Fab />
      <TextLink>회원가입</TextLink>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.paper50,
    alignItems: "center",
    justifyContent: "center",
  },
  tempContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    width: '100%'
  }
});

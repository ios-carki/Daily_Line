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
      <View style={styles.tempContainer}>
        <Button children="버튼a" style={{ flex: 1 }} />
        <Button children="버튼a" style={{ flex: 1 }} />
      </View>
      <CircleButton icon="settings-outline" disabled={true} />
      <StatusBar style="auto" />
      <Fab />
      <TextLink>회원가입</TextLink>
      <View style={styles.tempContainer2}>
        <Input
          title={"이메일"}
          invalid={false}
          placeholder={"you@example.com"}
        />
        <Input
          title={"이메일"}
          invalid={true}
          errorText={"형식이 틀려요"}
          value={"demo@example"}
        />
        <Input
          title={"비밀번호"}
          errorText={"형식이 틀려요"}
          placeholder={"이메일 입력"}
          secureTextEntry={true}
          value={"asd"}
        />
        <Input
          title={"이메일"}
          invalid={false}
          help={"바꿀 수 없어요"}
          placeholder={"이메일 입력"}
          editable={false}
          value={"asd"}
        />
        <Input
          title={"소개"}
          // invalid={true}
          // errorText="형식이 틀려요"
          showCounter={true}
          placeholder={"나를 한 줄로"}
          maxLength={60}
          value={"ㅁㄴㅇ"}
          multiline={true}
          inputStyle={{
            minHeight: 100,
          }}
        />
      </View>
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

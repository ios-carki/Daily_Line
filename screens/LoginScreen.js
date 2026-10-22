import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ShadowBox from "../components/UI/ShadowBox";
import { GlobalStyles } from "../constants/styles";
import AuthForm from "../components/Auth/AuthForm";
import { AuthContext } from "../store/auth-context";
import { login } from "../api/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import TextLink from "../components/UI/TextLink";

function LoginScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    Keyboard.dismiss();
    setIsAuthenticating(true);

    try {
      const loginData = await login(email, password);

      await authCtx.authenticate(loginData.token, loginData.user);
    } catch (err) {
      setError(
        err.response?.data?.detail ??
          "서버에 연결할 수 없어요.\n서버가 켜져 있는지 확인해주세요.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  function pushToSignupHandler() {
    navigation.navigate("Signup");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? undefined : "padding"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandContainer}>
          <ShadowBox
            faceStyle={styles.logoSticker}
            style={styles.logoShadowBoxStyle}
          >
            <Ionicons
              name="journal"
              size={30}
              color={GlobalStyles.colors.ink900}
            />
          </ShadowBox>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoTextStyle}>오늘 한 줄</Text>
            <Text style={styles.sloganTextStyle}>
              하루 한 줄, 나를 기록하는 시간
            </Text>
          </View>
        </View>
        <AuthForm
          isLogin
          onSubmit={loginHandler}
          serverError={error}
          onChange={() => setError(null)}
        />
        <View style={styles.switchRowContainer}>
          <Text style={styles.switchTextStyle}>아직 계정이 없나요?</Text>
          <TextLink onPress={pushToSignupHandler}>회원가입</TextLink>
        </View>
        <View style={styles.demoTapeContainer}>
          <Text style={styles.demoTapeTextStyle}>
            데모 demo@example.com / demo1234
          </Text>
        </View>
      </ScrollView>
      {isAuthenticating && <LoadingOverlay message="로그인하는 중..." />}
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 28,
  },
  logoShadowBoxStyle: {
    width: 64,
    height: 64,
    transform: [{ rotate: "-8deg" }],
  },
  brandContainer: {
    gap: 20,
    alignSelf: "flex-start",
  },
  logoSticker: {
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: 64,
    backgroundColor: GlobalStyles.colors.yellow300,
    borderRadius: 18,
    borderColor: GlobalStyles.colors.ink900,
    borderWidth: 2,
  },
  logoTextContainer: {
    gap: 2,
  },
  logoTextStyle: {
    ...GlobalStyles.fonts.hero,
    color: GlobalStyles.colors.ink900,
  },
  sloganTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
  },
  switchRowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  switchTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
  },
  demoTapeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: GlobalStyles.colors.pink300,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 8,
    alignSelf: "center",
    transform: [{ rotate: "-2deg" }],
  },
  demoTapeTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
  },
});

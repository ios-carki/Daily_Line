import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Keyboard,
  Platform,
} from "react-native";

import { GlobalStyles } from "../constants/styles";
import AuthForm from "../components/Auth/AuthForm";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { signup } from "../api/auth";
import TextLink from "../components/UI/TextLink";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function SignupScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  function popToLoginHandler() {
    navigation.goBack();
  }

  async function signupHandler({ email, password, name }) {
    Keyboard.dismiss();
    setIsAuthenticating(true);

    try {
      const signupData = await signup(email, password, name);
      await authCtx.authenticate(signupData.token, signupData.user);
    } catch (err) {
      setError(
        err.response?.data?.detail ??
          "서버에 연결할 수 없어요.\n서버가 켜져 있는지 확인해주세요.",
      );
    } finally {
      setIsAuthenticating(false);
    }
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
        <View style={styles.infoMessageContainer}>
          <Text style={styles.helloTextStyle}>반가워요! 👋</Text>
          <Text style={styles.infoTextStyle}>
            이메일로 가입하고 오늘의 한 줄을 남겨보세요.
          </Text>
        </View>
        <AuthForm
          onSubmit={signupHandler}
          serverError={error}
          onChange={() => setError(null)}
        />
        <View style={styles.switchRowContainer}>
          <Text style={styles.switchTextStyle}>이미 계정이 있나요?</Text>
          <TextLink onPress={popToLoginHandler}>로그인</TextLink>
        </View>
      </ScrollView>
      {isAuthenticating && <LoadingOverlay message="가입하는 중..." />}
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 48,
    gap: 20,
  },
  infoMessageContainer: {
    gap: 2,
  },
  helloTextStyle: {
    ...GlobalStyles.fonts.display,
    color: GlobalStyles.colors.ink900,
  },
  infoTextStyle: {
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
});

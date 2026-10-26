import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useEffect, useState } from "react";

import ShadowBox from "../components/UI/ShadowBox";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { fetchEntries } from "../api/entry";
import Input from "../components/UI/Input";
import ErrorBanner from "../components/UI/ErrorBanner";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import Button from "../components/UI/Button";
import { withdraw } from "../api/user";

function WithdrawScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [entryCount, setEntryCount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState({
    value: "",
    isValid: true,
  });

  function withdrawHandler() {
    const isPasswordValid = password.value.length !== 0;
    if (isPasswordValid) {
      Alert.alert("정말 탈퇴할까요?", deleteAlertText, [
        { text: "취소", style: "cancel" },
        { text: "탈퇴", style: "destructive", onPress: confirmWithdraw },
      ]);
    } else {
      setPassword((curPassword) => ({
        ...curPassword,
        isValid: isPasswordValid,
      }));
    }
  }

  async function confirmWithdraw() {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await withdraw(token, password.value);
      await authCtx.logout();
    } catch (err) {
      if (err.response?.status === 401) {
        await authCtx.logout();
        return;
      }

      setErrorMessage(
        err.response?.data?.detail ??
          "서버에 연결할 수 없어요.\n서버가 켜져 있는지 확인해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function passwordInputHandler(enteredValue) {
    setPassword((current) => ({
      ...current,
      value: enteredValue,
      isValid: true,
    }));
    setErrorMessage(null);
  }

  async function getEntryCount() {
    try {
      const entries = await fetchEntries(token);
      setEntryCount(entries.length);
    } catch (err) {
      setEntryCount(null);
    }
  }

  useEffect(() => {
    getEntryCount();
  }, [token]);

  const isCountKnown = entryCount !== null;
  const deleteWarningText = isCountKnown
    ? `작성한 한 줄 ${entryCount}개가 모두 삭제돼요`
    : "작성한 한 줄이 모두 삭제돼요";
  const deleteAlertText = isCountKnown
    ? `한 줄 ${entryCount}개와 계정이 모두 삭제돼요.`
    : "작성한 한 줄과 계정이 모두 삭제돼요.";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? undefined : "padding"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <ShadowBox
          style={styles.warningContainer}
          faceStyle={styles.warningFaceContainer}
        >
          <Ionicons
            name="warning"
            size={26}
            color={GlobalStyles.colors.error500}
          />
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningTitleTextStyle}>정말 떠나시나요?</Text>
            <Text
              style={styles.warningSubTextStyle}
            >{`• ${deleteWarningText}\n• 같은 이메일로 다시 가입해도 복구되지 않아요`}</Text>
          </View>
        </ShadowBox>
        <Input
          title="비밀번호 확인"
          placeholder="현재 비밀번호"
          secureTextEntry
          value={password.value}
          invalid={!password.isValid}
          errorText="비밀번호를 입력해주세요."
          onChangeText={(password) => passwordInputHandler(password)}
        />
        {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}
        <Button title="회원 탈퇴" mode="danger" onPress={withdrawHandler} />
      </ScrollView>
      {isSubmitting && <LoadingOverlay message="탈퇴하는 중..." />}
    </KeyboardAvoidingView>
  );
}

export default WithdrawScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 48,
    gap: 20,
  },
  warningContainer: {
    marginBottom: 4,
  },
  warningFaceContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    backgroundColor: GlobalStyles.colors.error100,
  },
  warningTextContainer: {
    flex: 1,
    gap: 6,
  },
  warningTitleTextStyle: {
    ...GlobalStyles.fonts.title,
    color: GlobalStyles.colors.ink900,
  },
  warningSubTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.ink900,
  },
});

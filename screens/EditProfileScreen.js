import {
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useContext, useState } from "react";

import { AuthContext } from "../store/auth-context";
import { updateMe } from "../api/user";
import ProfileForm from "../components/Profile/ProfileForm";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function EditProfileScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function confirmHandler(profileData) {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const updatedUser = await updateMe(authCtx.token, profileData);
      authCtx.updateUser(updatedUser);
      navigation.goBack();
    } catch (err) {
      if (err.response?.status === 401) {
        await authCtx.logout();
        return;
      }

      setErrorMessage(
        err.response?.data?.detail ??
          "서버에 연결할 수 없어요.\n서버가 켜져 있는지 확인해주세요.",
      );
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
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
        <ProfileForm
          defaultValues={authCtx.user}
          serverError={errorMessage}
          onChange={() => setErrorMessage(null)}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
        />
      </ScrollView>
      {isSubmitting && <LoadingOverlay message="저장하는 중..." />}
    </KeyboardAvoidingView>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 48,
  },
});

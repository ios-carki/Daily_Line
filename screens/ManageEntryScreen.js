import {
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useLayoutEffect, useState } from "react";

import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { EntriesContext } from "../store/entries-context";
import { storeEntry, updateEntry, deleteEntry } from "../api/entry";
import { getDateParts } from "../util/date";
import EntryForm from "../components/Entries/EntryForm";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function ManageEntryScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const entriesCtx = useContext(EntriesContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittingMessage, setSubmittingMessage] = useState(null);

  const editedEntryId = route.params?.entryId;
  const isEditing = !!editedEntryId;
  const selectedEntry = entriesCtx.entries.find(
    (entry) => entry.id === editedEntryId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? "한 줄 수정" : "한 줄 쓰기" });
  }, [navigation, isEditing]);

  async function handleRequestError(err) {
    if (err.response?.status === 401) {
      await authCtx.logout();
      return;
    }

    setErrorMessage(
      err.response?.data?.detail ??
        "서버에 연결할 수 없어요.\n서버가 켜져 있는지 확인해주세요.",
    );
    setSubmittingMessage(null);
  }

  async function confirmHandler(entryData) {
    setSubmittingMessage("저장하는 중...");
    setErrorMessage(null);
    try {
      if (isEditing) {
        const updatedEntry = await updateEntry(
          authCtx.token,
          editedEntryId,
          entryData,
        );
        entriesCtx.updateEntry(updatedEntry);
      } else {
        const createdEntry = await storeEntry(authCtx.token, entryData);
        entriesCtx.addEntry(createdEntry);
      }
      navigation.goBack();
    } catch (err) {
      await handleRequestError(err);
    }
  }

  async function deleteEntryHandler() {
    setSubmittingMessage("삭제하는 중...");
    setErrorMessage(null);
    try {
      await deleteEntry(authCtx.token, editedEntryId);
      entriesCtx.removeEntry(editedEntryId);
      navigation.goBack();
    } catch (err) {
      await handleRequestError(err);
    }
  }

  function deletePressHandler() {
    const { month, day } = getDateParts(selectedEntry.date);

    Alert.alert(
      "한 줄 삭제",
      `${month}월 ${day}일의 한 줄을 삭제할까요?\n삭제하면 되돌릴 수 없어요.`,
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: deleteEntryHandler },
      ],
    );
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
        <EntryForm
          submitButtonLabel={isEditing ? "수정" : "저장"}
          defaultValues={selectedEntry}
          serverError={errorMessage}
          onChange={() => setErrorMessage(null)}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
        />
        {isEditing && selectedEntry && (
          <Pressable
            style={({ pressed }) => [
              styles.deleteContainer,
              pressed && styles.pressedDeleteContainer,
            ]}
            onPress={deletePressHandler}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={GlobalStyles.colors.error500}
            />
            <Text style={styles.deleteTextStyle}>이 한 줄 삭제</Text>
          </Pressable>
        )}
      </ScrollView>
      {submittingMessage && <LoadingOverlay message={submittingMessage} />}
    </KeyboardAvoidingView>
  );
}

export default ManageEntryScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 48,
  },
  deleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 6,
    marginTop: 28,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.error500,
  },
  pressedDeleteContainer: {
    opacity: 0.5,
  },
  deleteTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.error500,
  },
});

import { View, TextInput, Text, StyleSheet, Keyboard } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ErrorMessage from "../UI/ErrorMessage";

function NoteInput({ value = "", invalid, style, ...textInputProps }) {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.titleTextStyle, invalid && styles.invalidTitleTextStyle]}
      >
        오늘의 한 줄
      </Text>
      <View
        style={[
          styles.textInputContainer,
          invalid && styles.invalidTextInputContainer,
        ]}
      >
        <TextInput
          multiline
          maxLength={100}
          submitBehavior="blurAndSubmit"
          returnKeyType="done"
          placeholderTextColor={GlobalStyles.colors.gray400}
          autoCapitalize="none"
          value={value}
          style={styles.textInputStyle}
          {...textInputProps}
        />
        <View style={styles.textCountBadgeContainer}>
          <Text
            style={styles.textCountTextStyle}
          >{`${value.length} / 100`}</Text>
        </View>
      </View>
      {invalid && <ErrorMessage message="내용을 1~100자로 입력해주세요." />}
    </View>
  );
}

export default NoteInput;

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  titleTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  invalidTitleTextStyle: {
    color: GlobalStyles.colors.error500,
  },
  textInputContainer: {
    padding: 14,
    gap: 8,
    minHeight: 132,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.yellow100,
  },
  invalidTextInputContainer: {
    borderColor: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.error100,
  },
  textInputStyle: {
    ...GlobalStyles.fonts.note,
    color: GlobalStyles.colors.ink900,
    flexGrow: 1,
    textAlignVertical: "top",
  },
  textCountBadgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.white,
  },
  textCountTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
  },
});

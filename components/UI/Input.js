import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function Input({
  title,
  invalid,
  errorText,
  help,
  showCounter,
  style,
  inputStyle,
  ...textInputProps
}) {
  const readOnly = textInputProps.editable === false;
  const inputTextCount = textInputProps.value?.length ?? 0;
  const inputTextMaxCount = textInputProps.maxLength;
  const isMultilineTextInput = textInputProps.multiline === true;

  const showError = !!(invalid && errorText);
  const showHelp = !showError && !!help;
  const showCount = !!showCounter && inputTextMaxCount != null;
  const showBottom = showError || showHelp || showCount;

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.titleTextStyle, invalid && styles.errorTitleTextStyle]}
      >
        {title}
      </Text>

      <View
        style={[
          styles.textInputContainer,
          invalid && styles.errorTextInputContainer,
          readOnly && styles.readOnlyTextInputContainer,
        ]}
      >
        <TextInput
          placeholderTextColor={GlobalStyles.colors.gray400}
          autoCapitalize="none"
          {...textInputProps}
          style={[
            styles.textInputTextStyle,
            readOnly && styles.readOnlyInputTextStyle,
            isMultilineTextInput ? styles.multilineTextStyle : styles.singleLineTextStyle,
            inputStyle,
          ]}
        />
      </View>
      {showBottom && (
        <View style={styles.bottomContainer}>
          <View style={styles.messageContainer}>
            {showError && (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle"
                  size={14}
                  color={GlobalStyles.colors.error500}
                />
                <Text style={styles.errorMessageTextStyle}>{errorText}</Text>
              </View>
            )}
            {showHelp && (
              <Text style={styles.helpMessageTextStyle}>{help}</Text>
            )}
          </View>
          {showCount && (
            <Text style={styles.counterMessageTextStyle}>
              {`${inputTextCount}/${inputTextMaxCount}`}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  // Container
  container: {
    gap: 6,
  },

  // Title
  titleTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  errorTitleTextStyle: {
    color: GlobalStyles.colors.error500,
  },

  // TextInputContainer
  textInputContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: GlobalStyles.colors.ink900,
    backgroundColor: GlobalStyles.colors.white,
  },
  errorTextInputContainer: {
    backgroundColor: GlobalStyles.colors.error100,
    borderColor: GlobalStyles.colors.error500,
  },
  readOnlyTextInputContainer: {
    backgroundColor: GlobalStyles.colors.paper100,
    borderColor: GlobalStyles.colors.gray400,
    borderStyle: "dashed",
  },

  // Input
  textInputTextStyle: {
    fontFamily: GlobalStyles.fonts.body.fontFamily,
    fontSize: GlobalStyles.fonts.body.fontSize,
    color: GlobalStyles.colors.ink900,
  },
  singleLineTextStyle: {
    height: 22,
    paddingVertical: 0,
  },
  multilineTextStyle: {
    lineHeight: 22,
    textAlignVertical: "top",
  },
  readOnlyInputTextStyle: {
    color: GlobalStyles.colors.gray400,
  },

  // BottomContainer
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  // Message Text
  errorMessageTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.error500,
    flexShrink: 1, // 문구가 길면 줄바꿈
  },
  helpMessageTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
  counterMessageTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
    marginLeft: 8,
  },
});

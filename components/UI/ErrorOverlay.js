import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({ message, onRetry, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Ionicons
          name="cloud-offline-outline"
          size={44}
          color={GlobalStyles.colors.ink900}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleTextStyle}>불러오지 못했어요</Text>
        <Text style={styles.messageTextStyle}>{message}</Text>
      </View>
      <Button children="다시 시도" onPress={onRetry} />
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    gap: 20,
    padding: 32,
    backgroundColor: GlobalStyles.colors.paper50,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: GlobalStyles.colors.sky300
  },
  textContainer: {
    alignItems: "center",
    gap: 6,
  },
  titleTextStyle: {
    ...GlobalStyles.fonts.display,
    color: GlobalStyles.colors.ink900,
  },
  messageTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
    textAlign: 'center'
  },
});

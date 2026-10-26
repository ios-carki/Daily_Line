import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "../UI/ShadowBox";
import Button from "../UI/Button";

function EmptySticker({ title, message, buttonTitle, onPress }) {
  return (
    <View style={styles.container}>
      <ShadowBox
        radius={44}
        style={styles.stickerContainer}
        faceStyle={styles.stickerFace}
      >
        <Ionicons
          name="journal-outline"
          size={40}
          color={GlobalStyles.colors.ink900}
        />
      </ShadowBox>
      <Text style={styles.titleTextStyle}>{title}</Text>
      <Text style={styles.messageTextStyle}>{message}</Text>
      {buttonTitle && (
        <Button
          title={buttonTitle}
          onPress={onPress}
          style={styles.buttonStyle}
        />
      )}
    </View>
  );
}

export default EmptySticker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 48,
    paddingHorizontal: 32,
  },
  stickerContainer: {
    width: 88,
    height: 88,
    transform: [{ rotate: "-6deg" }],
  },
  stickerFace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.yellow300,
  },
  titleTextStyle: {
    ...GlobalStyles.fonts.display,
    color: GlobalStyles.colors.ink900,
    marginTop: 24,
  },
  messageTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
    textAlign: "center",
    marginTop: 6,
  },
  buttonStyle: {
    marginTop: 24,
  },
});

import { Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function TextLink({ children, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainerStyle,
        style
      ]}
    >
      <Text style={styles.textStyle}>{children}</Text>
    </Pressable>
  );
}

export default TextLink;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  pressedContainerStyle: {
    opacity: 0.5,
  },
  textStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
    textDecorationLine: "underline",
  },
});

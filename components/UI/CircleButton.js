import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function CircleButton({ icon, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedStyle,
        disabled && styles.disabledStyle,
      ]}
    >
      <Ionicons name={icon} size={20} color={GlobalStyles.colors.ink900} />
    </Pressable>
  );
}

export default CircleButton;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
  },
  pressedStyle: {
    backgroundColor: GlobalStyles.colors.paper100,
  },
  disabledStyle: {
    opacity: 0.3,
  },
});

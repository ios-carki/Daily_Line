import { Text, Pressable, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "./ShadowBox";

function Button({ title, onPress, mode = "primary", style }) {
  const titleText = (
    <Text style={[styles.textStyle, mode === "danger" && styles.dangerTextStyle]} >
      {title}
    </Text>
  );

  if (mode === "ghost") {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.ghostContainer,
          pressed && styles.ghostPressedContainer,
          style,
        ]}
        onPress={onPress}
      >
        {titleText}
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={style}>
      {({ pressed }) => (
        <ShadowBox
          radius={14}
          pressed={pressed}
          faceStyle={[
            styles.container,
            mode === "danger" && styles.dangerContainer,
          ]}
        >
          {titleText}
        </ShadowBox>
      )}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.yellow300,
    paddingVertical: 13,
    paddingHorizontal: 20,
    height: 52,
  },
  dangerContainer: {
    backgroundColor: GlobalStyles.colors.error500,
  },
  ghostContainer: {
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 14,
    height: 52,
  },
  ghostPressedContainer: {
    backgroundColor: GlobalStyles.colors.paper100,
  },
  textStyle: {
    ...GlobalStyles.fonts.button,
    color: GlobalStyles.colors.ink900,
  },
  dangerTextStyle: {
    color: GlobalStyles.colors.white,
  },
});

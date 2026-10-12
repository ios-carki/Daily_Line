import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const LEVELS = [
  { label: "—", color: null },
  { label: "약함", color: GlobalStyles.colors.error500 },
  { label: "보통", color: GlobalStyles.colors.yellow300 },
  { label: "강함", color: GlobalStyles.colors.mint300 },
];

function PasswordMeter({ level, style }) {
  const current = LEVELS[level];

  return (
    <View style={[styles.container, style]}>
      {[1, 2, 3].map((n) => (
        <View
          key={n}
          style={[
            styles.defaultBarStyle,
            n <= level && { backgroundColor: current.color },
          ]}
        />
      ))}
      <Text style={styles.textStyle}>{current.label}</Text>
    </View>
  );
}

export default PasswordMeter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  defaultBarStyle: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalStyles.colors.gray200,
  },
  textStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
    textAlign: "right",
    width: 28,
  },
});

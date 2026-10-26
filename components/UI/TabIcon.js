import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function TabIcon({ focused, icon, label }) {
  if (!focused) {
    return (
      <Ionicons
        name={`${icon}-outline`}
        size={22}
        color={GlobalStyles.colors.gray600}
      />
    );
  }

  return (
    <View style={styles.pillContainer}>
      <Ionicons name={icon} size={20} color={GlobalStyles.colors.ink900} />
      <Text style={styles.labelTextStyle}>{label}</Text>
    </View>
  );
}

export default TabIcon;

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.yellow300,
  },
  labelTextStyle: {
    ...GlobalStyles.fonts.tab,
    color: GlobalStyles.colors.ink900,
  },
});

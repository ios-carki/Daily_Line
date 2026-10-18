import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function ErrorMessage({ message }) {
  return (
    <View style={styles.invalidContainer}>
      <Ionicons
        name="alert-circle"
        size={14}
        color={GlobalStyles.colors.error500}
      />
      <Text style={styles.invalidTextStyle}>{message}</Text>
    </View>
  );
}

export default ErrorMessage;

const styles = StyleSheet.create({
  invalidContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  invalidTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.error500,
  },
});

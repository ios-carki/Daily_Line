import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

function ErrorBanner({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="alert-circle"
        size={18}
        color={GlobalStyles.colors.error500}
      />
      <Text style={styles.textStyle}>{children}</Text>
    </View>
  );
}

export default ErrorBanner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.error500,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.error100,
  },
  textStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.ink900,
    flex: 1
  },
});

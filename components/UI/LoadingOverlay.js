import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "./ShadowBox";

function LoadingOverlay({ message }) {
  const showMessage = !!message;

  return (
    <View style={[StyleSheet.absoluteFill, styles.screen]}>
      <ShadowBox radius={20} faceStyle={styles.overlayContainer}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.ink900} />
        {showMessage && <Text style={styles.textStyle}>{message}</Text>}
      </ShadowBox>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: GlobalStyles.colors.scrim,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  overlayContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 28,
    gap: 12,
  },
  textStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
    textAlign: 'center'
  },
});

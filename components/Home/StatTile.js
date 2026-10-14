import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function StatTile({ label, value, unit, color, style }) {
  return (
    <View style={[styles.tileContainer, { backgroundColor: color }, style]}>
      <View style={styles.valueContainer}>
        <Text style={styles.valueTextStyle}>{value}</Text>
        <Text style={styles.unitTextStyle}>{unit}</Text>
      </View>
      <Text style={styles.labelTextStyle}>{label}</Text>
    </View>
  );
}

export default StatTile;

const styles = StyleSheet.create({
  tileContainer: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: GlobalStyles.colors.ink900,
    padding: 12,
    gap: 2,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 2,
  },
  valueTextStyle: {
    ...GlobalStyles.fonts.number,
    color: GlobalStyles.colors.ink900,
  },
  unitTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  labelTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
  },
});

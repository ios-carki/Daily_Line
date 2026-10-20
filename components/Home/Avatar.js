import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function Avatar({ name, onEdit, size = 64, style }) {
  const initial = (name && name.trim().slice(0, 1)) || "?";
  const showBadge = !!onEdit;
  const sizeStyle = { width: size, height: size };
  
  return (
    <View style={[sizeStyle, style]}>
      <View
        style={[
          styles.circleContainer,
          sizeStyle,
          { borderRadius: size / 2 },
        ]}
      >
        <Text style={styles.initialTextStyle}>{initial}</Text>
      </View>
      {showBadge && (
        <Pressable onPress={onEdit} style={styles.badgeContainer}>
          <Ionicons
            name="create-outline"
            size={14}
            color={GlobalStyles.colors.ink900}
          />
        </Pressable>
      )}
    </View>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.pink300,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
  },
  initialTextStyle: {
    ...GlobalStyles.fonts.display,
    color: GlobalStyles.colors.ink900,
  },
  badgeContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    backgroundColor: GlobalStyles.colors.yellow300,
  },
});

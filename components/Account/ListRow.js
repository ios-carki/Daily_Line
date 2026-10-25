import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";

function ListRow({
  label,
  icon,
  iconBackgroundColor,
  labelColor,
  showChevron = true,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[style.itemContainer, pressed && style.pressedItemContainer]}>
          <View
            style={[
              style.iconContainer,
              { backgroundColor: iconBackgroundColor },
            ]}
          >
            <Ionicons
              name={icon}
              size={18}
              color={GlobalStyles.colors.ink900}
            />
          </View>

          <Text style={[style.itemTextStyle, { color: labelColor }]}>
            {label}
          </Text>

          {showChevron && (
            <Ionicons
              name="chevron-forward"
              size={18}
              color={GlobalStyles.colors.gray400}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

export default ListRow;

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  pressedItemContainer: {
    backgroundColor: GlobalStyles.colors.paper100
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 10,
  },
  itemTextStyle: {
    flex: 1,
    ...GlobalStyles.fonts.body,
  },
});

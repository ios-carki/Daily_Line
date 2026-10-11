import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "./ShadowBox";

function Fab({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <ShadowBox faceStyle={styles.container} radius={28} pressed={pressed}>
          <Ionicons name="add" size={30} color={GlobalStyles.colors.ink900} />
        </ShadowBox>
      )}
    </Pressable>
  );
}

export default Fab;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    backgroundColor: GlobalStyles.colors.pink300,
  },
});

import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ShadowBox({children, style, faceStyle, radius = 16, offset = 4, pressed}) {
  return (
    <View style={style}>
      <View style={[styles.shadowContainer, {borderRadius: radius, top: offset, left: offset, right: -offset, bottom: -offset}]} />
      <View style={[styles.faceContainer, {borderRadius: radius}, faceStyle, pressed && { transform: [{translateX: offset}, {translateY: offset}] }]}>{children}</View>
    </View>
  );
}

export default ShadowBox;

const styles = StyleSheet.create({
  shadowContainer: {
    position: 'absolute',
    backgroundColor: GlobalStyles.colors.ink900,
  },
  faceContainer: {
    backgroundColor: GlobalStyles.colors.white,
    borderColor: GlobalStyles.colors.ink900,
    borderWidth: 2,
  }
});

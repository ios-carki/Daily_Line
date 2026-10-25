import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { GlobalStyles } from "../../constants/styles"
import TextLink from "./TextLink"

function EmptyDataView({icon = "journal-outline", message, linkText, onPress , style}) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={32} color={GlobalStyles.colors.gray600} />
      <Text style={styles.textStyle}>{message}</Text>
      <TextLink onPress={onPress}>{linkText}</TextLink>
    </View>
  )
}

export default EmptyDataView

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.gray400,
    borderRadius: 16,
    borderStyle: 'dashed'
  },
  textStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
    textAlign: 'center'
  }
})
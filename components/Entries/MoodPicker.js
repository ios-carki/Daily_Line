import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import { MOODS } from "../../constants/moods";
import ErrorMessage from "../UI/ErrorMessage";

function MoodPicker({ value, invalid, onChange, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.titleTextStyle, invalid && styles.invalidTitleTextStyle]}>오늘의 기분</Text>
      <View style={styles.moodPickerContainer}>
        {MOODS.map((mood) => {
          const isSelected = value === mood.value

          return(
            <Pressable key={mood.value} style={({pressed}) => [styles.moodContainer, pressed && {opacity: 0.6}]} onPress={() => onChange(mood.value)}>
              <View style={[styles.emojiContainer, invalid && styles.invalidEmojiContainer, isSelected && {backgroundColor: GlobalStyles.colors[mood.color], transform: [{scale: 1.12}]}]}>
                <Text style={styles.emojiStyle}>{mood.emoji}</Text>
              </View>
              <Text style={[styles.moodTextStyle, isSelected && styles.selectedMoodTextStyle]}>{mood.label}</Text>
            </Pressable>
          )
        })}
      </View>
      {invalid && (
        <ErrorMessage message="기분을 하나 골라주세요."/>
      )}
    </View>
  );
}

export default MoodPicker;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  titleTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  invalidTitleTextStyle: {
    color: GlobalStyles.colors.error500
  },
  moodPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moodContainer: {
    width: 56,
    alignItems: "center",
    gap: 8,
  },
  emojiContainer: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.white,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 26,
  },
  invalidEmojiContainer: {
    borderColor: GlobalStyles.colors.error500,
    borderStyle: 'dashed'
  },
  emojiStyle: {
    ...GlobalStyles.fonts.emoji,
  },
  moodTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
  selectedMoodTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import ShadowBox from "../UI/ShadowBox";
import { GlobalStyles } from "../../constants/styles";
import { moodToColor, moodToEmoji, moodToLabel } from "../../util/mood";
import { toEntryRowDay, toEntryRowWeek, toEntryRowYearMonth } from "../../util/date";

function EntryRow({ entry, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {({ pressed }) => (
        <>
          <ShadowBox faceStyle={[styles.faceContainer, {backgroundColor: GlobalStyles.colors[moodToColor(entry.mood)]}]} radius={14} offset={3}>
            <Text style={styles.dateTextStyle}>{toEntryRowDay(entry.date)}</Text>
            <Text style={styles.dayTextStyle}>{toEntryRowWeek(entry.date)}</Text>
          </ShadowBox>

          <View
            style={[
              styles.contentsCardContainer,
              pressed && styles.pressedStyle,
            ]}
          >
            <View style={styles.contentsMetaContainer}>
              <Text style={styles.emojiTextStyle}>{moodToEmoji(entry.mood)}</Text>
              <Text style={styles.metaTextStyle}>{`${toEntryRowYearMonth(entry.date)} - ${moodToLabel(entry.mood)}`}</Text>
            </View>

            <Text numberOfLines={2} style={styles.contentsTextStyle}>
              {entry.content}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
}

export default EntryRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
  },
  faceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 56,
  },
  dateTextStyle: {
    ...GlobalStyles.fonts.day,
    color: GlobalStyles.colors.ink900,
  },
  dayTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
  },
  contentsCardContainer: {
    flex: 1,
    padding: 12,
    gap: 4,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 14,
    backgroundColor: GlobalStyles.colors.white,
  },
  contentsMetaContainer: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 6,
  },
  emojiTextStyle: {
    fontSize: 18
  },
  metaTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
  contentsTextStyle: {
    ...GlobalStyles.fonts.note,
    color: GlobalStyles.colors.ink900,
  },
  pressedStyle: {
    backgroundColor: GlobalStyles.colors.paper100,
  },
});

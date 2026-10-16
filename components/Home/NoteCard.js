import { View, Text, Pressable, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "../UI/ShadowBox";
import { moodToColor, moodToEmoji } from "../../util/mood";
import { toNoteCardDate } from "../../util/date";

function NoteCard({ entry, index, style, onPress }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <ShadowBox
          style={[
            { transform: [{ rotate: index % 2 === 0 ? "-2deg" : "2deg" }] },
            style,
          ]}
          faceStyle={[
            styles.faceContainer,
            entry.mood && {
              backgroundColor: GlobalStyles.colors[moodToColor(entry.mood)],
            },
          ]}
          pressed={pressed}
        >
          <View style={styles.recordDateViewStyle}>
            <Text style={styles.emojiStyle}>{moodToEmoji(entry.mood)}</Text>
            <Text style={styles.dateTextStyle}>
              {toNoteCardDate(entry.date)}
            </Text>
          </View>
          <Text style={styles.contentsTextStyle} numberOfLines={3}>
            {entry.content}
          </Text>
          <View style={styles.tapeViewStyle} />
        </ShadowBox>
      )}
    </Pressable>
  );
}

export default NoteCard;

const styles = StyleSheet.create({
  faceContainer: {
    padding: 14,
    width: 160,
    height: 148,
    gap: 8,
  },
  tapeViewStyle: {
    alignSelf: "center",
    position: "absolute",
    width: 44,
    height: 18,
    marginTop: -9,
    transform: [{ rotate: "-4deg" }],
    backgroundColor: GlobalStyles.colors.tape,
    borderWidth: 1.5,
    borderColor: GlobalStyles.colors.ink900,
  },
  recordDateViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  emojiStyle: {
    ...GlobalStyles.fonts.emoji,
  },
  dateTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  contentsTextStyle: {
    ...GlobalStyles.fonts.note,
    color: GlobalStyles.colors.ink900,
  },
});

import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "../UI/ShadowBox";
import { getThisMonth } from "../../util/date";
import { MOODS } from "../../constants/moods";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

function MoodCalendar({ entries = [], style }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const thisMonth = getThisMonth();
  const today = now.getDate();

  const moodByDate = {};
  entries.forEach((entry) => {
    moodByDate[entry.date] = entry.mood;
  });

  const monthCount = entries.filter((entry) =>
    entry.date.startsWith(thisMonth),
  ).length;

  const blankCount = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < blankCount; i++) cells.push(null);
  for (let d = 1; d <= dayCount; d++) cells.push(d);

  return (
    <ShadowBox radius={20} faceStyle={styles.faceContainer} style={style}>
      <View style={styles.titleContainer}>
        <Text style={styles.monthTextStyle}>{month + 1}월 기분 달력</Text>
        <Text style={styles.recordTextStyle}>{monthCount}일 기록</Text>
      </View>
      <View style={styles.dateContainer}>
        {WEEK.map((date, index) => (
          <Text
            key={index}
            style={[
              styles.dateTextStyle,
              index === 0 && { color: GlobalStyles.colors.error500 },
            ]}
          >
            {date}
          </Text>
        ))}
      </View>
      <View style={styles.dayContainer}>
        {cells.map((day, index) => {
          const isToday = day === today;
          const isFuture = day > today;
          const date = `${thisMonth}-${String(day).padStart(2, "0")}`;
          const mood = moodByDate[date];

          return (
            <View key={index} style={styles.dayCell}>
              {day !== null && (
                <View
                  style={[
                    styles.dayCellInner,
                    isToday && styles.todayCellInner,
                    mood && {
                      backgroundColor:
                        GlobalStyles.colors[MOODS[mood - 1].color],
                    },
                    isFuture && styles.futureCellInner,
                  ]}
                >
                  <Text
                    style={[
                      styles.defaultDateTextStyle,
                      mood && styles.recordedDateTextStyle,
                      isFuture && styles.futureDateTextStyle,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.legendContainer}>
        {MOODS.map((moodInfo) => (
          <View key={moodInfo.value} style={styles.moodContainer}>
            <View
              style={[
                styles.moodDotStyle,
                { backgroundColor: GlobalStyles.colors[moodInfo.color] },
              ]}
            />
            <Text style={styles.moodTextStyle}>{moodInfo.label}</Text>
          </View>
        ))}
      </View>
    </ShadowBox>
  );
}

export default MoodCalendar;

const styles = StyleSheet.create({
  faceContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthTextStyle: {
    ...GlobalStyles.fonts.title,
    color: GlobalStyles.colors.ink900,
  },
  recordTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
  dateContainer: {
    flexDirection: "row",
    paddingTop: 12,
  },
  dateTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
    width: "14.2857%",
    textAlign: "center",
  },
  dayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 4,
  },

  // Day Cell
  dayCell: {
    aspectRatio: 1,
    width: "14.2857%",
    padding: 3,
  },

  // Day Inner Cell
  dayCellInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.paper100,
  },
  todayCellInner: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
  },
  futureCellInner: {
    backgroundColor: "transparent",
  },

  // Date Text
  defaultDateTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
  },
  recordedDateTextStyle: {
    ...GlobalStyles.fonts.label,
  },
  futureDateTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray400,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 10,
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  moodDotStyle: {
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: GlobalStyles.colors.ink900,
  },
  moodTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
});

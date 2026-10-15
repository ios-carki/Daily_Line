import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "../UI/ShadowBox";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const MOODS = [
  {label: "최악", color: GlobalStyles.colors.mint300},
  {label: "별로", color: GlobalStyles.colors.lilac300},
  {label: "보통", color: GlobalStyles.colors.gray200},
  {label: "좋음", color: GlobalStyles.colors.sky300},
  {label: "최고", color: GlobalStyles.colors.yellow300},
]

function MoodCalendar({ entries = [], style }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const moodByDay = {}
  entries
    .filter((entry) => {
      const [recordYear, recordMonth] = entry.date.split("-").map(Number);

      return recordYear === year && recordMonth === month + 1;
    })

  const recordedDays = entries
    .map((entry) => Number(entry.date.split("-")[2]));

  const blankCount = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < blankCount; i++) cells.push(null);
  for (let d = 1; d <= dayCount; d++) cells.push(d);

  return (
    <ShadowBox radius={20} faceStyle={styles.faceContainer} style={style}>
      <View style={styles.titleContainer}>
        <Text style={styles.monthTextStyle}>{month + 1}월 기분 달력</Text>
        <Text style={styles.recordTextStyle}>{entries.length}일 기록</Text>
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
          const isToday = day == today;
          const isFuture = day > today;
          const isRecorded = recordedDays.includes(day)

          return (
            <View key={index} style={styles.dayCell}>
              {day !== null && (
                <View
                  style={[
                    styles.dayCellInner,
                    isToday && styles.todayCellInner,
                    isRecorded && {backgroundColor: 'red'},
                    isFuture && styles.futureCellInner,
                  ]}
                >
                  <Text
                    style={[
                      styles.defaultDateTextStyle,
                      isToday && styles.todayDateTextStyle,
                      isRecorded && styles.recordedDateTextStyle,
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
    </ShadowBox>
  );
}

export default MoodCalendar;

const styles = StyleSheet.create({
  faceContainer: {
    padding: 16,
    gap: 12,
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
    justifyContent: "space-between",
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
    backgroundColor: null,
  },

  // Date Text
  defaultDateTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.ink900,
  },
  todayDateTextStyle: {
    ...GlobalStyles.fonts.label,
  },
  recordedDateTextStyle: {
    ...GlobalStyles.fonts.label,
  },
  futureDateTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray400,
  },
});

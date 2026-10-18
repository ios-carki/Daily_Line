import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { addDays, getToday, getDateParts } from "../../util/date";
import CircleButton from "../UI/CircleButton";

function DateStepper({ value, onChange, style }) {
  const today = getToday();
  const isToday = value === today;
  const canGoNext = value < today;
  const { year, month, day, weekdayLong } = getDateParts(value);

  function prevHandler() {
    const newDate = addDays(value, -1);
    onChange(newDate);
  }

  function nextHandler() {
    const newDate = addDays(value, 1);
    onChange(newDate);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.titleTextStyle}>날짜</Text>
      <View style={styles.stepperContainer}>
        <CircleButton icon="chevron-back" onPress={prevHandler} />
        <View style={styles.centerContainer}>
          <Text style={styles.dateTextStyle}>{`${month}월 ${day}일`}</Text>
          <Text
            style={styles.metaTextStyle}
          >{`${year} - ${weekdayLong}${isToday ? " - 오늘" : ""}`}</Text>
        </View>
        <CircleButton
          icon="chevron-forward"
          onPress={nextHandler}
          disabled={!canGoNext}
        />
      </View>
    </View>
  );
}

export default DateStepper;

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  titleTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  stepperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderColor: GlobalStyles.colors.ink900,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.white,
  },
  centerContainer: {
    alignItems: "center",
  },
  dateTextStyle: {
    ...GlobalStyles.fonts.title,
    color: GlobalStyles.colors.ink900,
  },
  metaTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
});

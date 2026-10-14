import { View, StyleSheet } from "react-native";
import StatTile from "./StatTile";
import { GlobalStyles } from "../../constants/styles";
import { getThisMonth } from "../../util/date";

function StatsRow({ entries = [] }) {
  const totalCount = entries.length;
  const thisMonth = getThisMonth();
  const monthCount = entries.filter((entry) =>
    entry.date.startsWith(thisMonth),
  ).length;
  const totalMood = entries.reduce((total, entry) => {
    return total + entry.mood;
  }, 0);
  const moodAverage =
    totalCount === 0 ? "-" : (totalMood / totalCount).toFixed(1);

  return (
    <View style={styles.container}>
      <StatTile
        label="전체 기록"
        value={totalCount}
        unit="개"
        color={GlobalStyles.colors.yellow300}
      />
      <StatTile
        label="이번 달"
        value={monthCount}
        unit="개"
        color={GlobalStyles.colors.mint300}
      />
      <StatTile
        label="평균 기분"
        value={moodAverage}
        unit="/5"
        color={GlobalStyles.colors.pink300}
      />
    </View>
  );
}

export default StatsRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});

import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { MOODS } from "../../constants/moods";

function FilterChips({ entries = [], value, onChange }) {
  const isAllSelected = value === "all";
  
  function renderMoods({ item }) {
    const isSelected = value === item.value;

    return (
      <Pressable
        style={[
          styles.chipContainer,
          isSelected && styles.selectedChipContainer,
        ]}
        onPress={() => onChange(item.value)}
      >
        <Text>{item.emoji}</Text>
        <Text
          style={[
            styles.chipTextStyle,
            isSelected && styles.selectedChipTextStyle,
          ]}
        >
          {item.label}
        </Text>
        <Text
          style={[
            styles.counterTextStyle,
            isSelected && styles.selectedCounterTextStyle,
          ]}
        >
          {entries.filter((entry) => entry.mood === item.value).length}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.chipContainer,
          isAllSelected && styles.selectedChipContainer,
        ]}
        onPress={() => onChange("all")}
      >
        <Text
          style={[
            styles.chipTextStyle,
            isAllSelected && styles.selectedChipTextStyle,
          ]}
        >
          전체
        </Text>
        <Text
          style={[
            styles.counterTextStyle,
            isAllSelected && styles.selectedCounterTextStyle,
          ]}
        >
          {entries.length}
        </Text>
      </Pressable>
      <FlatList
        data={MOODS}
        keyExtractor={(item) => String(item.value)}
        renderItem={renderMoods}
        contentContainerStyle={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default FilterChips;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.white,
    gap: 4,
  },
  selectedChipContainer: {
    backgroundColor: GlobalStyles.colors.ink900,
  },
  chipTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.ink900,
  },
  selectedChipTextStyle: {
    color: GlobalStyles.colors.white,
  },
  counterTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
  selectedCounterTextStyle: {
    color: GlobalStyles.colors.yellow300,
  },
  list: {
    gap: 8,
  },
});

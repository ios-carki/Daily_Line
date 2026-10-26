import { View, FlatList, StyleSheet } from "react-native";
import { useContext, useState } from "react";

import { EntriesContext } from "../store/entries-context";
import FilterChips from "../components/Entries/FilterChips";
import EntryRow from "../components/Entries/EntryRow";
import EmptySticker from "../components/Entries/EmptySticker";
import Fab from "../components/UI/Fab";

function EntriesScreen({ navigation }) {
  const entriesCtx = useContext(EntriesContext);
  const [filter, setFilter] = useState("all");

  const entries = entriesCtx.entries;
  const isEntryEmpty = entries.length === 0;
  const filteredEntries = entries.filter((entry) => {
    if (filter === "all") {
      return true;
    }
    return entry.mood === filter;
  });

  function pushToManageEntryHandler(entryId) {
    navigation.navigate("ManageEntry", entryId ? { entryId } : undefined);
  }

  function renderEntry({ item }) {
    return (
      <EntryRow
        entry={item}
        onPress={() => pushToManageEntryHandler(item.id)}
      />
    );
  }

  let content = (
    <FlatList
      data={filteredEntries}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderEntry}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <EmptySticker
          title="조건에 맞는 한 줄이 없어요"
          message="다른 기분을 골라보세요."
        />
      }
    />
  );

  if (isEntryEmpty) {
    content = (
      <EmptySticker
        title="아직 비어 있어요"
        message="오늘 하루를 한 줄로 남겨보세요."
        buttonTitle="첫 한 줄 쓰기"
        onPress={() => pushToManageEntryHandler()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FilterChips entries={entries} value={filter} onChange={setFilter} />
      {content}
      {!isEntryEmpty && (
        <View style={styles.fabContainer}>
          <Fab onPress={() => pushToManageEntryHandler()} />
        </View>
      )}
    </View>
  );
}

export default EntriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 120,
    gap: 14,
  },
  fabContainer: {
    position: "absolute",
    right: 24,
    bottom: 118,
  },
});

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";

import { GlobalStyles } from "../constants/styles";
import CircleButton from "../components/UI/CircleButton";
import { getDateParts, getToday } from "../util/date";
import Avatar from "../components/Home/Avatar";
import { AuthContext } from "../store/auth-context";
import { EntriesContext } from "../store/entries-context";
import StatsRow from "../components/Home/StatsRow";
import { fetchEntries } from "../api/entry";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import MoodCalendar from "../components/Home/MoodCalendar";
import TextLink from "../components/UI/TextLink";
import NoteCard from "../components/Home/NoteCard";
import EmptyDataView from "../components/UI/EmptyDataView";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function HomeScreen({ navigation }) {
  const { month, day, weekdayLong } = getDateParts(getToday());
  const todayLabel = `${month}월 ${day}일 ${weekdayLong}`;
  const authCtx = useContext(AuthContext);
  const entriesCtx = useContext(EntriesContext);
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isBioEmpty = authCtx.user.bio.length === 0;

  const entries = entriesCtx.entries;
  const isEntryEmpty = entries.length === 0;

  function pushToAccountHandler() {
    navigation.navigate("Account");
  }

  function pushToManageEntryHandler(entryId) {
    navigation.navigate("ManageEntry", entryId ? { entryId } : undefined);
  }

  async function getEntries() {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = authCtx.token;
      const userEntries = await fetchEntries(token);

      entriesCtx.setEntries(userEntries);
    } catch (err) {
      if (err.response?.status === 401) {
        await authCtx.logout();
      } else {
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getEntries();
  }, [authCtx.token]);

  if (isError) {
    return (
      <ErrorOverlay
        message={"서버에 연결할 수 없어요.\n서버가 켜져 있는지 확인해주세요."}
        onRetry={getEntries}
      />
    );
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.screen, { paddingTop: insets.top + 4 }]}
      >
        <View style={styles.dateSettingContainer}>
          <Text style={styles.todayTextStyle}>{todayLabel}</Text>
          <CircleButton
            icon={"settings-outline"}
            onPress={pushToAccountHandler}
          />
        </View>
        <View style={styles.greetingContainer}>
          <View style={styles.textContainer}>
            <Text
              style={styles.greetTextStyle}
            >{`안녕, ${authCtx.user.name}!`}</Text>
            <Text
              style={[
                styles.bioTextStyle,
                isBioEmpty && styles.emptyBioTextStyle,
              ]}
            >
              {isBioEmpty ? "소개를 적어보세요" : authCtx.user.bio}
            </Text>
          </View>
          <Avatar name={authCtx.user.name} onEdit={pushToAccountHandler} />
        </View>
        <StatsRow entries={entries} />
        <MoodCalendar entries={entries} />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleTextStyle}>최근 기록</Text>
          {!isEntryEmpty && <TextLink onPress={() => {}}>전체 보기</TextLink>}
        </View>
        {isEntryEmpty ? (
          <EmptyDataView
            message={"첫 한 줄을 남기면\n여기에 스티커처럼 붙어요"}
            linkText="한 줄 쓰러 가기"
            onPress={() => pushToManageEntryHandler()}
          />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.noteCardContainerStyle}
            contentContainerStyle={styles.noteCardContentContainerStyle}
          >
            {entries.slice(0, 5).map((entry, index) => (
              <NoteCard
                key={entry.id}
                entry={entry}
                index={index}
                onPress={() => pushToManageEntryHandler(entry.id)}
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>
      {isLoading && <LoadingOverlay message="불러오는 중..." />}
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 20,
  },
  dateSettingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todayTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.gray600,
  },
  greetingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  greetTextStyle: {
    ...GlobalStyles.fonts.display,
    color: GlobalStyles.colors.ink900,
  },
  bioTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
  },
  emptyBioTextStyle: {
    color: GlobalStyles.colors.gray400,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitleTextStyle: {
    ...GlobalStyles.fonts.title,
    color: GlobalStyles.colors.ink900,
  },
  noteCardContainerStyle: {
    marginHorizontal: -20,
    marginTop: -20,
  },
  noteCardContentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 12,
    gap: 20,
  },
});

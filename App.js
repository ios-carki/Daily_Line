import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import Button from "./components/UI/Button";
import { GlobalStyles } from "./constants/styles";
import CircleButton from "./components/UI/CircleButton";
import Fab from "./components/UI/Fab";
import TextLink from "./components/UI/TextLink";
import Input from "./components/UI/Input";
import PasswordMeter from "./components/Auth/PasswordMeter";
import ErrorBanner from "./components/UI/ErrorBanner";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import ErrorOverlay from "./components/UI/ErrorOverlay";
import Avatar from "./components/Home/Avatar";
import StatsRow from "./components/Home/StatsRow";
import MoodCalendar from "./components/Home/MoodCalendar";
import NoteCard from "./components/Home/NoteCard";
import EntryRow from "./components/Entries/EntryRow";
import DateStepper from "./components/Entries/DateStepper";
import { getToday } from "./util/date";
import MoodPicker from "./components/Entries/MoodPicker";
import NoteInput from "./components/Entries/NoteInput";
import FilterChips from "./components/Entries/FilterChips";
import AuthForm from "./components/Auth/AuthForm";

SplashScreen.preventAutoHideAsync();

const DUMMY_ENTRIES = [
  {
    id: 1,
    date: "2026-10-10",
    mood: 5,
    content: "아침 산책하다가 본 하늘이 유난히 파랬다.",
  },
  {
    id: 2,
    date: "2026-10-09",
    mood: 2,
    content: "회의가 길어져서 점심을 거의 못 먹었다.",
  },
  {
    id: 4,
    date: "2026-10-11",
    mood: 2,
    content: "회의가 길어져서 점심을 거의 못 먹었다.2",
  },
  {
    id: 3,
    date: "2026-09-28",
    mood: 4,
    content: "오랜만에 친구랑 통화. 웃다가 배 아픔.",
  },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    jua: require("./assets/fonts/Jua-Regular.ttf"),
    pretendard: require("./assets/fonts/Pretendard-Regular.otf"),
    "pretendard-semibold": require("./assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-bold": require("./assets/fonts/Pretendard-Bold.otf"),
    "gowun-bold": require("./assets/fonts/GowunBatang-Bold.ttf"),
  });

  const [mood, setMood] = useState("all")
  const [input, setInput] = useState("")
  


  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;


  return (
    <View style={styles.container}>
      <View style={styles.tempContainer2}>
        <AuthForm isLogin={false} onSubmit={(data) => console.log(data)} onChange={() => {}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.paper50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  tempContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  tempContainer2: {
    gap: 12,
    width: "100%",
  },
});

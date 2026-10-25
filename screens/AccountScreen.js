import { View, Text, StyleSheet, Alert } from "react-native";
import { useContext, useState } from "react";

import { GlobalStyles } from "../constants/styles";
import ShadowBox from "../components/UI/ShadowBox";
import Avatar from "../components/Home/Avatar";
import { SettingsItem, DangerItem } from "../constants/RowItems";
import { AuthContext } from "../store/auth-context";
import ListGroup from "../components/Account/ListGroup";
import { logout } from "../api/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function AccountScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function logoutHandler() {
    setIsSubmitting(true);
    try {
      await logout(authCtx.token);
    } catch (err) {
    } finally {
      await authCtx.logout();
      setIsSubmitting(false);
    }
  }

  function settingPressHandler(item) {
    switch (item.id) {
      case "profile":
        navigation.navigate("EditProfile");
        break;
      case "logout":
        Alert.alert("로그아웃", "로그아웃할까요?", [
          { text: "취소", style: "cancel" },
          { text: "로그아웃", style: "destructive", onPress: logoutHandler },
        ]);
        break;
    }
  }

  function dangerPressHandler(item) {
    switch (item.id) {
      case "withdraw":
        navigation.navigate("Withdraw");
        break;
    }
  }

  return (
    <View style={styles.container}>
      <ShadowBox faceStyle={styles.profileCardStyle}>
        <Avatar name={authCtx.user.name} size={48} />
        <View style={styles.profileContentsContainer}>
          <Text style={styles.userNameTextStyle}>{authCtx.user.name}</Text>
          <Text style={styles.userEmailTextStyle}>{authCtx.user.email}</Text>
        </View>
      </ShadowBox>
      <ListGroup groupItem={SettingsItem} onItemPress={settingPressHandler} />
      <ListGroup groupItem={DangerItem} onItemPress={dangerPressHandler} />
      {isSubmitting && <LoadingOverlay message="로그아웃하는 중..." />}
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 28,
  },
  profileCardStyle: {
    flexDirection: "row",
    padding: 14,
    gap: 12,
    backgroundColor: GlobalStyles.colors.yellow100,
  },
  profileContentsContainer: {
    flex: 1,
    gap: 4,
  },
  userNameTextStyle: {
    ...GlobalStyles.fonts.title,
    color: GlobalStyles.colors.ink900,
  },
  userEmailTextStyle: {
    ...GlobalStyles.fonts.sub,
    color: GlobalStyles.colors.gray600,
  },
});

import { GlobalStyles } from "./styles";

export const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: GlobalStyles.colors.paper50,
  },
  headerTitleStyle: {
    ...GlobalStyles.fonts.header,
    color: GlobalStyles.colors.ink900,
  },
  headerBackButtonDisplayMode: "minimal",
  headerTintColor: GlobalStyles.colors.ink900,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: GlobalStyles.colors.paper50 },
};

export const tabScreenOptions = {
  ...defaultScreenOptions,
  sceneStyle: { backgroundColor: GlobalStyles.colors.paper50 },
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 34,
    marginHorizontal: 20,
    height: 64,
    paddingHorizontal: 8,
    paddingBottom: 0,
    borderRadius: 22,
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.ink900,
    backgroundColor: GlobalStyles.colors.white,
    shadowColor: GlobalStyles.colors.ink900,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  tabBarItemStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarIconStyle: {
    width: "100%",
    height: 40,
  },
};

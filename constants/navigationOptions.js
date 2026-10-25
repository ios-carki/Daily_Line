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

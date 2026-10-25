import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ShadowBox from "../UI/ShadowBox";
import ListRow from "./ListRow";

function ListGroup({ groupItem, onItemPress }) {
  const itemList = Object.values(groupItem.items);
  return (
    <View style={styles.container}>
      <Text style={styles.groupLabelTextStyle}>{groupItem.title}</Text>

      <ShadowBox faceStyle={styles.groupContainer}>
        {itemList.map((item, index) => (
          <View key={item.id}>
            <ListRow
              label={item.label}
              icon={item.icon}
              iconBackgroundColor={
                GlobalStyles.colors[item.iconBackgroundColor]
              }
              labelColor={GlobalStyles.colors[item.labelColor]}
              onPress={() => onItemPress(item)}
            />
            {index < itemList.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ShadowBox>
    </View>
  );
}

export default ListGroup;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  groupLabelTextStyle: {
    ...GlobalStyles.fonts.label,
    color: GlobalStyles.colors.gray600,
    paddingLeft: 4,
  },
  groupContainer: {
    overflow: "hidden",
  },
  separator: {
    height: 1.5,
    backgroundColor: GlobalStyles.colors.gray200,
  },
});

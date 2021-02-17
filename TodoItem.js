import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { List, Divider } from "react-native-paper";

const TodoItem = (props) => {
  const { item, onCompleteItem, onDeleteItem } = props;
  return (
    <>
      <Divider />
      <List.Item
        titleStyle={item.isCompleted && styles.isCompleted}
        title={item.text}
        description={item.isCompleted ? "Completed" : "Todo"}
        right={(props) => (
          <>
            <Pressable onPress={() => onCompleteItem(item)}>
              <List.Icon {...props} icon="check-bold" color="green" />
            </Pressable>
            <Pressable onPress={() => onDeleteItem(item)}>
              <List.Icon {...props} icon="close-thick" color="red" />
            </Pressable>
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  isCompleted: {
    color: "green",
    fontWeight: "bold",
  },
});

export default TodoItem;

import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

import TodoItem from "./TodoItem";

class App extends React.Component {
  currentId = 0;

  state = {
    currentText: "",
    list: [],
  };

  async componentDidMount() {
    const listString = await AsyncStorage.getItem("list-json");
    const lastId = await AsyncStorage.getItem("last-id");
    const list = listString ? JSON.parse(listString) : [];

    this.currentId = lastId ? Number(lastId) : 0;
    this.setState({ currentText: "", list });
  }

  persistList = async () => {
    await AsyncStorage.setItem("list-json", JSON.stringify(this.state.list));
    await AsyncStorage.setItem("last-id", this.currentId.toString());
  };

  onChangeText = (text) => {
    this.setState({
      currentText: text,
      list: this.state.list,
    });
  };

  onAddItem = () => {
    this.currentId++;

    const item = {
      id: this.currentId,
      text: this.state.currentText,
      isCompleted: false,
    };

    const list = [...this.state.list, item];

    this.setState({ list, currentText: "" }, this.persistList);
  };

  onCompleteItem = (item) => {
    const list = [...this.state.list];
    const index = this.state.list.indexOf(item);

    list[index] = { ...list[index] };
    list[index].isCompleted = !list[index].isCompleted;

    this.setState(
      (prevState) => ({
        list,
        currentText: prevState.currentText,
      }),
      this.persistList
    );
  };

  onDeleteItem = async (item) => {
    const list = this.state.list.filter((x) => x.id !== item.id);
    this.setState((prevState) => ({ ...prevState, list }), this.persistList);
  };

  render() {
    return (
      <>
        <StatusBar style="light" />
        <Appbar.Header>
          <Appbar.Content title="Todo app" subtitle="Your todo list" />
        </Appbar.Header>
        <View style={styles.container}>
          <TextInput
            label="What do you want to do?"
            value={this.state.currentText}
            onChangeText={this.onChangeText}
            right={<TextInput.Icon name="plus" onPress={this.onAddItem} />}
          />
          <ScrollView style={styles.itemContainer}>
            {this.state.list.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onCompleteItem={this.onCompleteItem}
                onDeleteItem={this.onDeleteItem}
              />
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  itemContainer: {
    marginTop: 15,
  },
});

export default App;

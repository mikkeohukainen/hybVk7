import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
} from "react-native";
import React, { useState, useReducer } from "react";
import uuid from "react-native-uuid";

const reducer = (todos, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...todos, { id: uuid.v4(), text: action.text }];
    case "DELETE_TODO":
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
};

export default function App() {
  const [text, setText] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const handleAdd = () => {
    dispatch({ type: "ADD_TODO", text });
    setText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.add}>
        <TextInput
          style={styles.text}
          value={text}
          onChangeText={setText}
          placeholder="Add new item"
        />
        <Button title="Save" onPress={handleAdd} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text
              style={styles.text}
              onPress={() => dispatch({ type: "DELETE_TODO", id: item.id })}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20,
  },
  add: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
  },
  item: {
    margin: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
  },
});

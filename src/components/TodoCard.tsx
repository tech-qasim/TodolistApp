import { useNavigation } from "@react-navigation/native";
import { AppDispatch } from "app/store";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteTodos } from "redux/todoThunk";
import { toggleCheckMark } from "../redux/todoSlice";
import { Todo } from "../types/todo";

type TodoCardProps = {
  todo: Todo;
};

export default function TodoCard({ todo }: TodoCardProps) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleCheckMark = (id: string) => {
    const todoId = {
      id: id,
    };
    dispatch(toggleCheckMark(todoId));
  };
  const handleDelete = (id: string) => {
    dispatch(deleteTodos(id));
  };
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("AddTodo", { todo });
      }}
    >
      <View style={styles.container}>
        <Checkbox
          value={todo.isCompleted}
          onValueChange={() => {
            handleCheckMark(todo.id);
          }}
        />
        <View style={{ width: 13 }}></View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text style={styles.titleText}>{todo.title}</Text>
          <View style={{ height: 5 }}></View>
          <Text>{todo.description}</Text>
        </View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <IconButton
              icon="dots-vertical"
              onPress={() => {
                setVisible((prev) => !prev);
              }}
              style={styles.iconButton}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              setVisible(false);
              console.log("Edit");
            }}
            title="Edit"
          />
          <Menu.Item
            onPress={() => {
              handleDelete(todo.id);
              setVisible(false);
              console.log("Delete");
            }}
            title="Delete"
          />
        </Menu>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconButton: {},
});

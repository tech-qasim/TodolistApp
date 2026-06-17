import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";
import AppColors from "../../constants/colors/colors";
import { addTodo, editTodo } from "../../redux/todoSlice";

export default function AddTodoScreen({ route }) {
  const todo = route.params?.todo;

  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSaveButton = () => {
    console.log("todo: ", todo);
    if (todo) {
      const editedTodo = {
        id: todo.id,
        title: title,
        description: description,
      };
      dispatch(editTodo(editedTodo));
      setTitle("");
      setDescription("");
      navigation.goBack();
      return;
    }
    const newTodo = {
      id: uuid.v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setDescription("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.smallText}>Task Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What needs to be done?"
          value={title}
          onChangeText={setTitle}
        />
        <View style={{ height: 30 }}></View>
        <Text style={styles.smallText}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Add a description..."
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <Pressable
        style={styles.pressable}
        onPress={() => {
          handleSaveButton();
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {todo ? "Update" : "Save"} Now
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  smallText: {
    fontWeight: "bold",
    color: AppColors.primary,
  },
  textInput: {
    backgroundColor: "transparent",
  },
  pressable: {
    backgroundColor: AppColors.primary,
    justifyContent: "flex-end",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
});

import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TodoCard from "../../components/TodoCard";

export default function ShowTodoScreen() {
  const navigation = useNavigation();
  const todos = useSelector((state: RootState) => state.todo.todos);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoCard todo={item} />}
        keyExtractor={(item) => item.id}
      />
      <FAB
        icon="plus"
        style={[styles.fab, styles.fabRight]}
        onPress={() => {
          navigation.navigate("AddTodo");
        }}
      />
      <FAB
        icon="plus"
        style={[styles.fab, styles.fabLeft]}
        onPress={() => {
          navigation.navigate("ShowApiTodo");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 0,
    margin: 30,
  },
  fabRight: {
    right: 0,
  },
  fabLeft: {
    left: 0,
  },
});

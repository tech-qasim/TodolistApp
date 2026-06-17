import { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../redux/todoSlice";

export default function ShowApiTodoScreen() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.apiTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}

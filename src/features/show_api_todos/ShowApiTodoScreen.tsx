import TodoCard from "components/TodoCard";
import { useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "redux/todoThunk";
import { AppDispatch, RootState } from "../../app/store";
import { incrementPage } from "../../redux/todoSlice";
export default function ShowApiTodoScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todo.apiTodos);
  const page = useSelector((state: RootState) => state.todo.page);
  const isLoading = useSelector((state: RootState) => state.todo.isLoading);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [page]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoCard
          todo={{
            id: item.id.toString(),
            title: item.title,
            description: "",
            isCompleted: item.completed,
          }}
        ></TodoCard>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
    />
  );
}

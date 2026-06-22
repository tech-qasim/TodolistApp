import { getTodos } from "api/todoApi";
import { AppDispatch, RootState } from "app/store";
import { setApiTodos, setIsLoading } from "./todoSlice";

export const fetchTodo =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { page, isLoading } = getState().todo;

    if (isLoading) return;
    dispatch(setIsLoading(true));
    try {
      const todos = await getTodos(page);
      const fetchTodos = todos.map((apiTodo) => {
        return {
          userId: apiTodo.userId,
          id: apiTodo.id,
          title: apiTodo.title,
          completed: apiTodo.completed,
        };
      });
      dispatch(setApiTodos(fetchTodos));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

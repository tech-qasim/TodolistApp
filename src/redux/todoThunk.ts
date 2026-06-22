import { getTodos } from "api/todoApi";
import { AppDispatch, RootState } from "app/store";
import { supabase } from "services/supabase";
import { Todo } from "types/todo";
import {
  addTodo,
  deleteTodo,
  setApiTodos,
  setIsLoading,
  setTodo,
} from "./todoSlice";

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

export const addTodos =
  (todo: Todo) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await supabase.from("todos").insert([
        {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          is_completed: todo.isCompleted,
        },
      ]);
      dispatch(addTodo(todo));
    } catch (error: any) {
      console.error("Error adding todo:", error);
    }
  };

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
      throw error;
    }

    const todos: Todo[] = data.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: todo.is_completed,
    }));

    dispatch(setTodo(todos));
  } catch (error: any) {
    console.error("Error fetching todos:", error);
  }
};

export const deleteTodos = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      throw error;
    }
    dispatch(deleteTodo({ id }));
  } catch (error: any) {
    console.error("Error deleting todo:", error);
  }
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "types/todo";
import { ApiTodo } from "../types/api_todo";

interface TodoState {
  todos: Todo[];
  apiTodos: ApiTodo[];
  page: number;
  isLoading: boolean;
}

const initialState: TodoState = {
  todos: [],
  apiTodos: [],
  page: 1,
  isLoading: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    toggleCheckMark: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; title: string; description: string }>,
    ) => {
      const { id, title, description } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
      }
    },
    setApiTodos: (state, action: PayloadAction<ApiTodo[]>) => {
      state.apiTodos.push(...action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addTodo,
  setTodo,
  toggleCheckMark,
  deleteTodo,
  setIsLoading,
  editTodo,
  incrementPage,
  setApiTodos,
} = todoSlice.actions;
export default todoSlice.reducer;

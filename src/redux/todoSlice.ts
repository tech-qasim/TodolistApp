import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "types/todo";
import { getTodos } from "../api/todoApi";
import { ApiTodo } from "../types/api_todo";

interface TodoState {
  todos: Todo[];
  apiTodos: ApiTodo[];
  page: number;
}

const initialState: TodoState = {
  todos: [],
  apiTodos: [],
  page: 1,
};

export const fetchTodos = createAsyncThunk<ApiTodo[], number>(
  "todo/fetchTodos",
  async (page: number) => {
    return await getTodos(page);
  },
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      const fetchTodos = action.payload.map((apiTodo) => {
        return {
          userId: apiTodo.userId,
          id: apiTodo.id,
          title: apiTodo.title,
          completed: apiTodo.completed,
        };
      });
      state.apiTodos.push(...fetchTodos);
    });
  },
});

export const { addTodo, toggleCheckMark, deleteTodo, editTodo, incrementPage } =
  todoSlice.actions;
export default todoSlice.reducer;

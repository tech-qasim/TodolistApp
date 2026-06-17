import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../api/todoApi";
const initialState = {
  todos: [],
  apiTodos: [],
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  return await getTodos();
});

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleCheckMark: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      todo.isCompleted = !todo.isCompleted;
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    editTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      todo.title = title;
      todo.description = description;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.apiTodos = action.payload;
    });
  },
});

export const { addTodo, toggleCheckMark, deleteTodo, editTodo } =
  todoSlice.actions;
export default todoSlice.reducer;

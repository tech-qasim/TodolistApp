import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos } from "../api/todoApi";
import { ApiTodo } from "../types/api_todo";

export const fetchTodos = createAsyncThunk<ApiTodo[], number>(
  "todo/fetchTodos",
  async (page: number) => {
    return await getTodos(page);
  },
);

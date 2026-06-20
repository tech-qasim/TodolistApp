import { ApiTodo } from "types/api_todo";
import apiClient from "./apiClient";

const getTodos = async (page: number): Promise<ApiTodo[]> => {
  try {
    const response = await apiClient.get<ApiTodo[]>("/todos", {
      params: {
        _page: page,
        _limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const getTodo = async (id: string): Promise<ApiTodo> => {
  try {
    const response = await apiClient.get<ApiTodo>(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

export { getTodo, getTodos };

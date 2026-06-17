import apiClient from "./apiClient";

const getTodos = async () => {
  try {
    const response = await apiClient.get("/todos");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

const getTodo = async (id) => {
  try {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error);
    throw error;
  }
};

export { getTodo, getTodos };

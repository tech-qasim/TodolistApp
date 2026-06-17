import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTodoScreen from "../features/add_todo/AddTodoScreen";
import ShowApiTodoScreen from "../features/show_api_todos/ShowApiTodoScreen";
import ShowTodoScreen from "../features/show_todo/ShowTodoScreen";

const RootStack = createNativeStackNavigator({
  initialRouteName: "ShowTodo",
  screens: {
    AddTodo: {
      screen: AddTodoScreen,
      options: { title: "Add Todo" },
    },
    ShowTodo: {
      screen: ShowTodoScreen,
      options: ({ route }) => {
        const todo = route.params?.todo;
        return {
          title: todo ? "Edit Todo" : "Show Todo",
        };
      },
    },
    ShowApiTodo: {
      screen: ShowApiTodoScreen,
      options: {
        title: "Api todo screen",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

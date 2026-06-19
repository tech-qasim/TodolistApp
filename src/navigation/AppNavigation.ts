import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTodoScreen from "../features/add_todo/AddTodoScreen";
import ShowApiTodoScreen from "../features/show_api_todos/ShowApiTodoScreen";
import ShowTodoScreen from "../features/show_todo/ShowTodoScreen";
import { Todo } from "../redux/todoSlice";

export type RootStackParamList = {
  ShowTodo: { todo?: Todo } | undefined;
  AddTodo: { todo?: Todo } | undefined;
  ShowApiTodo: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

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
        const params = route.params as { todo?: Todo } | undefined;
        const todo = params?.todo;
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

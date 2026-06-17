import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { Navigation } from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

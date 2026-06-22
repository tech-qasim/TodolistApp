// import 'react-native-url-polyfill/auto'
import Auth from "components/Auth";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { Navigation } from "./src/navigation/AppNavigation";
import { supabase } from "./src/services/supabase";

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchClaims = () => {
      supabase.auth.getClaims().then(({ data }) => {
        setUserId(data?.claims?.sub ?? "");
        setEmail(data?.claims?.email);
      });
    };

    fetchClaims();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (user) {
        setUserId(user.id);
        setEmail(user.email);
      } else {
        setUserId(null);
        setEmail(undefined);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider>{userId ? <Navigation /> : <Auth />}</PaperProvider>
    </Provider>
  );
}

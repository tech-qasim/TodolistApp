// import 'react-native-url-polyfill/auto'
import Account from "components/Account";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Auth from "./src/components/Auth";
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
    <View>
      {userId ? (
        <Account key={userId} userId={userId} email={email} />
      ) : (
        <Auth />
      )}
    </View>
  );
}

// import 'react-native-url-polyfill/auto'
import { JwtPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Auth from "./src/components/Auth";
import { supabase } from "./src/services/supabase";

export default function App() {
  const [claims, setClaims] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const fetchClaims = () => {
      supabase.auth.getClaims().then(({ data }) => {
        setClaims(data?.claims ?? null);
      });
    };

    fetchClaims();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchClaims();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View>
      <Auth />
      {claims && <Text>{claims.sub}</Text>}
    </View>
  );
}

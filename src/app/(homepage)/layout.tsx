"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Aos from "aos";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import router from "next/router";
import { auth } from "@/firebase";
import { Provider } from "react-redux";
import { store } from "../features/store";
import { supabase } from "@/lib/supabase";
import {
  processingAuth,
  sessionToken,
  setAdmin,
  setUser,
} from "../features/slices/AuthSlice";
import { useRouter } from "next/navigation";

import { ChakraProvider } from "@chakra-ui/react";
const theme = createTheme();
export default function ChildLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    Aos.init();
    const fetchSession = async () => {
      store.dispatch(processingAuth({ authLoading: true }));
      const { data, error } = await supabase.auth.getSession();

      try {
        if (data.session?.access_token) {
          store.dispatch(
            sessionToken({
              session: {
                email: data.session.user.email,
                name: data.session.user.email,
              },
            })
          );
          store.dispatch(setUser({ user: data.session }));
          const { data: profileData, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
          if (profileData?.group === "ADMIN") {
            store.dispatch(setAdmin({ isAdmin: true }));
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
      } finally {
        store.dispatch(processingAuth({ authLoading: false }));
      }
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      store.dispatch(setUser({ user: session }));
      if (session) {
        store.dispatch(
          sessionToken({
            session: {
              email: session.user.email,
              name: session.user.email,
            },
          })
        );
      }
    });
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Provider store={store}>
          <CssBaseline />
          <main>{children}</main>;
        </Provider>
      </ChakraProvider>
    </ThemeProvider>
  );
}

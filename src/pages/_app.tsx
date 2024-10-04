"use client";

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import theme from '../theme';
import RootLayout from '../components/shared/Layout'; 
import ErrorBoundary from "@/components/shared/ErrorBoundary";

export default function App({
  Component, pageProps: { session, ...pageProps },
}: AppProps) {

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </SnackbarProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </SessionProvider>
  );
}

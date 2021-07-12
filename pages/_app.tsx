import "../styles/globals.css";
import "@fontsource/inter";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import {
  Box,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import Router from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

NProgress.configure({
  minimum: 0.2,
  easing: "cubic-bezier(0.7, 0, 0.84, 0)",
  speed: 700,
  showSpinner: true,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "light",
};

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  config,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme} resetCSS>
        <Box paddingBottom="4rem">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default MyApp;

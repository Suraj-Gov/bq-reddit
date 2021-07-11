import "../styles/globals.css";
import "@fontsource/inter";
import type { AppProps } from "next/app";
import {
  Box,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "light",
};

const theme = extendTheme({
  fonts: {
    fontFamily: "Inter",
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

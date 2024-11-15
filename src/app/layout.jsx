import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

//TODO change metadata info
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

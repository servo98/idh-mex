import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Footer from "./components/Footer";

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
          <ThemeProvider theme={theme}>
            {/* Header */}
            <Box sx={{ backgroundColor: "primary.main", py: 3, mb: 3 }}>
              <Container maxWidth="lg">
                <Typography
                  variant="h3"
                  color="white"
                  align="center"
                  sx={{
                    fontSize: { xs: "2rem", sm: "3rem" }, // Reducir el tamaño en móvil
                  }}
                >
                  Índice de Desarrollo Humano de México
                </Typography>
                <Typography
                  variant="h6"
                  color="white"
                  align="center"
                  sx={{
                    mt: 1,
                    fontSize: { xs: "1rem", sm: "1.25rem" }, // Reducir el tamaño en móvil
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  Visualiza y edita los registros del IDH de los estados de
                  México.
                </Typography>
              </Container>
            </Box>
            {children}
            {/* Footer */}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

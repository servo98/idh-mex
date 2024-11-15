"use client";

import { createTheme } from "@mui/material";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

// Crear el tema MUI
const theme = createTheme({
  palette: {
    mode: "dark", // Asegurarse de usar 'mode' en lugar de 'type'
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;

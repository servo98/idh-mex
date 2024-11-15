"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Suspense } from "react";
import Dropdowns from "./components/Dropdowns";
import Footer from "./components/Footer";
import api from "./lib/axios";

// import Test from "./components/Test";

import { useEffect, useState } from "react";

export default function Home() {
  const [states, setStates] = useState([]);
  const [idhRecords, setidhRecords] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get("/getIDHRecords");
        const { states, idhRecords: records } = data;
        setStates(states);
        setidhRecords(records);
      } catch (error) {
        console.error("un error", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <main>
        {/* Encabezado */}
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
              Visualiza y edita los registros del IDH de los estados de México.
            </Typography>
          </Container>
        </Box>

        {/* Contenido principal */}
        <Suspense>
          <Dropdowns states={states} idhRecords={idhRecords} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

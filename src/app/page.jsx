"use client";

import Main from "./components/Main";
import api from "./lib/axios";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Home() {
  const [states, setStates] = useState([]);
  const [idhRecords, setIDHRecords] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await api.get("/getIDHRecords");
      const { states, idhRecords: records } = data;
      setStates(states);
      setIDHRecords(records);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleRandomData = async () => {
    try {
      setIsGenerating(true);
      await api.post("/postSeedIDH");
      await fetchData();
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating data", error);
    }
  };

  const handleRealData = async () => {
    console.log("handle real data");

    // try {
    //   const { data } = await api.get("/getRealData");
    //   setIDHRecords(data.idhRecords);
    //   console.log("Real data fetched:", data);
    // } catch (error) {
    //   console.error("Error fetching real data", error);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Main Content */}
      <Main
        states={states}
        idhRecords={idhRecords}
        setIDHRecords={setIDHRecords}
      />

      {/* Buttons Centered */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 4,
          flexWrap: "wrap", // Permite que los botones se acomoden en filas en pantallas pequeñas
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleRandomData}
          disabled={isGenerating}
          sx={{
            width: {
              xs: "100%", // 100% ancho en pantallas pequeñas
              sm: "auto", // Ancho automático en pantallas medianas y grandes
            },
          }}
        >
          Generate Random Data
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleRealData}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Get Real Data
        </Button>
      </Box>
    </Box>
  );
}

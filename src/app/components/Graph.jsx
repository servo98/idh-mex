"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  Box,
  Typography,
  Grid2 as Grid,
  Divider,
  Container,
} from "@mui/material";
import interpolateColor from "@/app/lib/interpolate";

const geoUrl = "/states.geojson";

const Graph = ({ idhRecords, availableYears = [] }) => {
  const getIDHfromStateNumber = (stateNumber) => {
    // Get all records from that state
    const stateRecords = idhRecords.filter(
      (record) => record.stateNumber == stateNumber
    );

    // If no records return 0
    if (stateRecords.length === 0) return 0;

    // Calculate average
    const totalIDH = stateRecords.reduce(
      (sum, record) => sum + record.idhIndex,
      0
    );

    return totalIDH / stateRecords.length;
  };

  return (
    <Container
      sx={{
        padding: 2,
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [-102.5528, 23.6345],
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const currentIDH = getIDHfromStateNumber(
                geo.properties.state_code
              );
              const stateColor = interpolateColor(currentIDH);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#FFFFFF"
                  fill={stateColor}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Pie de mapa y leyenda */}
      <Box sx={{ marginTop: 3, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Índice de Desarrollo Humano (IDH) promedio de los años:{" "}
          {availableYears.join(", ")}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "#FF0000",
                marginRight: 1,
                display: "inline-block",
              }}
            />
            <Typography variant="body2" component="span">
              Bajo IDH
            </Typography>
          </Grid>
          <Grid>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "#00FF00",
                marginRight: 1,
                display: "inline-block",
              }}
            />
            <Typography variant="body2" component="span">
              Alto IDH
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Graph;

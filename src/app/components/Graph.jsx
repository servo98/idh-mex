"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import interpolateColor from "@/app/lib/interpolate";

const geoUrl =
  "https://raw.githubusercontent.com/strotgen/mexico-leaflet/refs/heads/master/states.geojson";

// Definir un objeto con los colores por estado
const stateColors = {
  Aguascalientes: "#FF0000", // Rojo
  "Baja California": "#00FF00", // Verde
  "Baja California Sur": "#0000FF", // Azul
  // Agrega más estados y sus colores aquí...
};

const Graph = ({ idhRecord }) => {
  const getIDHfromStateNumber = (stateNumber) => {
    //TODO:  something wiht all data arond the years
    const found = idhRecord.find((record) => {
      return record.stateNumber == stateNumber;
    });
    return found ? found.idhIndex : 0;
  };

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 1000,
        center: [-102.5528, 23.6345],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            console.log(geo.properties.state_code, geo.properties.state_name);

            const stateName = geo.properties.name;

            const currentIDH = getIDHfromStateNumber(geo.properties.state_code);
            const stateColor = interpolateColor(currentIDH);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="#FFFFFF" // Color de los bordes
                fill={stateColor} // Asignar el color al estado
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Graph;

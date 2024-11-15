"use client";
import { useState, useCallback } from "react";
import Mexico from "@svg-maps/mexico";
import { SVGMap } from "react-svg-map/src/index";
// import { getLocationName } from "../utils";

const Graph = () => {
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });

  // const handleLocationMouseOver = useCallback((event) => {
  //   const location = getLocationName(event);
  //   setPointedLocation(location);
  // }, []);

  // const handleLocationMouseOut = useCallback(() => {
  //   setPointedLocation(null);
  //   setTooltipStyle({ display: "none" });
  // }, []);

  // const handleLocationMouseMove = useCallback((event) => {
  //   setTooltipStyle({
  //     display: "block",
  //     top: event.clientY + 10,
  //     left: event.clientX - 100,
  //   });
  // }, []);

  // Función que asigna colores directamente a los estados
  const getLocationStyle = (location, index) => {
    // Generamos un color aleatorio basado en el índice
    const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00"];
    return { fill: colors[index % colors.length] }; // Asignar color de manera cíclica
  };

  return (
    <article>
      <h2>mexici SVG heat map with tooltips</h2>
      <div>
        <SVGMap map={Mexico} locationStyle={getLocationStyle} />
      </div>
    </article>
  );
};

export default Graph;

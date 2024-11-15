const colorA = "#FF0000"; // red
const colorB = "#00FF00"; // green

const interpolateColor = (factor) => {
  //  color a RGB
  const rA = parseInt(colorA.slice(1, 3), 16);
  const gA = parseInt(colorA.slice(3, 5), 16);
  const bA = parseInt(colorA.slice(5, 7), 16);

  // color b rgb
  const rB = parseInt(colorB.slice(1, 3), 16);
  const gB = parseInt(colorB.slice(3, 5), 16);
  const bB = parseInt(colorB.slice(5, 7), 16);

  //   interpolation
  const r = Math.round(rA + factor * (rB - rA));
  const g = Math.round(gA + factor * (gB - gA));
  const b = Math.round(bA + factor * (bB - bA));

  return `rgb(${r}, ${g}, ${b})`;
};

export default interpolateColor;

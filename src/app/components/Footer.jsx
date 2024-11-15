import { Box, Typography, Grid2 as Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 4,
        mt: 4,
        width: "100%",
        position: "relative",
        bottom: 0,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid xs={12} sm={4} textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Datos generados aleatoriamente
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            © 2024 Todos los derechos reservados
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

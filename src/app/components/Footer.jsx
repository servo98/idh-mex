import { Box, Typography, Link, Grid2 as Grid } from "@mui/material";

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
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Datos generados aleatoriamente
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            © 2024 Todos los derechos reservados
          </Typography>
        </Grid>

        <Grid xs={12} sm={4} textAlign="center">
          <Link
            href="#"
            sx={{
              color: "white",
              "&:hover": { color: "#61dafb" },
              display: "block",
              mb: 1,
            }}
          >
            Política de Privacidad
          </Link>
          <Link
            href="#"
            sx={{ color: "white", "&:hover": { color: "#61dafb" } }}
          >
            Términos y Condiciones
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;

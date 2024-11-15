import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const EditModal = ({
  open,
  handleClose,
  editData,
  handleInputChange,
  handleSave,
  isLoading,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ maxWidth: "800px", margin: "auto" }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: "2px",
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
          mx: { xs: 0, sm: 4 },
          mt: { xs: 0, sm: 4 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            textAlign: "center", // Centrar el título
          }}
        >
          Editar Registro
        </Typography>

        {editData && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Estado"
              name="state"
              value={editData.state}
              fullWidth
              sx={{
                mb: 2,
                maxWidth: "400px", // Ajusta el ancho máximo
              }}
              disabled
            />

            <TextField
              label="Año"
              name="year"
              value={editData.year}
              fullWidth
              sx={{
                mb: 2,
                maxWidth: "400px", // Ajusta el ancho máximo
              }}
              disabled
            />

            <TextField
              label="IDH"
              name="idhIndex"
              type="number"
              value={editData.idhIndex}
              onChange={handleInputChange}
              fullWidth
              sx={{
                mb: 2,
                maxWidth: "400px", // Ajusta el ancho máximo
              }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 1,
                  step: 0.001,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // Centrar el botón
                mt: 2,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  fontSize: { xs: "16px", sm: "18px" },
                  padding: { xs: "12px", sm: "14px" },
                }}
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;

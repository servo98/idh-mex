import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const EditModal = ({
  open,
  handleClose,
  editData,
  handleInputChange,
  handleSave,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          // width: { xs: "calc(100% - 16px)", sm: 400 }, // Reduce el ancho en móvil para evitar el desbordamiento
          bgcolor: "background.paper",
          borderRadius: "2px",
          boxShadow: 24,
          p: { xs: 2, sm: 3 }, // Padding ajustado para móviles y pantallas grandes
          mx: { xs: 0, sm: 4 }, // Márgenes laterales en móvil
          mt: { xs: 0, sm: 4 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
        >
          Editar Registro
        </Typography>

        {editData && (
          <div>
            <TextField
              label="Estado"
              name="state"
              value={editData.state}
              fullWidth
              sx={{ mb: 2 }}
              disabled
            />

            <TextField
              label="Año"
              name="year"
              value={editData.year}
              fullWidth
              sx={{ mb: 2 }}
              disabled
            />

            <TextField
              label="IDH"
              name="idhIndex"
              type="number"
              value={editData.idhIndex}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: 1,
                  step: 0.001,
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Guardar
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;

import { Modal, Box, TextField, Button, Typography } from "@mui/material";

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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
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

import {
  Box,
  Button,
  Grid2 as Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

const EditModal = ({
  open,
  handleClose,
  states,
  handleCreateYear,
  isLoading,
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const newRecords = Array.from({ length: states.length }, (_, i) => ({
      stateNumber: i + 1,
      idhIndex: 0.0,
      state: states[i],
    }));
    setRecords(newRecords);
  }, [states]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setYear(newYear);
  };

  const handleRecordChange = (e, index) => {
    const newRecords = [...records];
    newRecords[index].idhIndex = parseFloat(e.target.value);
    setRecords(newRecords);
  };

  const handleAddSubmit = async () => {
    handleCreateYear({
      year,
      records,
    });
  };

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
          height: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            textAlign: "center",
          }}
        >
          Agregar Registros
        </Typography>

        {/* Año */}
        <Grid container spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
          <Grid xs={12} sm={6}>
            <TextField
              label="Año"
              type="number"
              fullWidth
              value={year}
              onChange={handleYearChange}
              slotProps={{
                htmlInput: {
                  min: 1900,
                  max: new Date().getFullYear(),
                },
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ maxHeight: "60vh", overflowY: "auto", mb: 2 }}>
          {/* Formulario */}
          <form>
            {records.length > 0 &&
              records.map((record, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {/* State */}
                    <Grid xs={12} sm={4}>
                      <TextField
                        label="Estado"
                        name="state"
                        value={states[index]}
                        fullWidth
                        type="text"
                        disabled
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                    </Grid>

                    {/* IDH */}
                    <Grid xs={12} sm={4}>
                      <TextField
                        label="IDH"
                        name="idhIndex"
                        value={record.idhIndex}
                        onChange={(e) => handleRecordChange(e, index)}
                        type="number"
                        fullWidth
                        slotProps={{
                          htmlInput: {
                            min: 0,
                            max: 1,
                            step: 0.001,
                          },
                        }}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </form>
        </Box>

        {/* Botón guardar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
            disabled={isLoading}
            onClick={handleAddSubmit}
          >
            {isLoading ? "Agregando..." : "Agregar"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;

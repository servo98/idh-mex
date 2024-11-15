import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";

function StateSelect({ states, selectedState, setSelectedState }) {
  const handleSelectedStateChange = (_, newValue) => {
    setSelectedState(newValue);
  };

  return (
    <Box sx={{ width: { xs: "90%", sm: 300 } }}>
      <InputLabel id="state-selected">Select State</InputLabel>
      <Autocomplete
        id="state-selected"
        disablePortal
        options={states}
        value={selectedState || null}
        onChange={handleSelectedStateChange}
        sx={{ width: "100%" }}
        popupIcon={<LocationOnIcon />}
        renderInput={(params) => <TextField {...params} label="Estado" />}
      />
    </Box>
  );
}

export default StateSelect;

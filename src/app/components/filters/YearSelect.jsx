import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

function YearSelect({ uniqueYears, selectedYears, setSelectedYears }) {
  const handleSelectedYearsChange = (e) => {
    const { value } = e.target;
    setSelectedYears([...value]);
  };

  return (
    <Box sx={{ width: { xs: "90%", sm: 300 } }}>
      <InputLabel id="years-selected">Select Years</InputLabel>
      <Select
        sx={{ width: "100%" }}
        endAdornment={<CalendarMonthIcon />}
        labelId="years-selected"
        id="years-selected"
        multiple
        value={selectedYears || []}
        onChange={handleSelectedYearsChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {Array.isArray(selected) &&
              selected.map((value) => <Chip key={value} label={value} />)}
          </Box>
        )}
      >
        {uniqueYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default YearSelect;

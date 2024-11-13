"use client";
import { useState, useMemo } from "react";

import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  InputLabel,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import DataTable from "./DataTable";
import Pagination from "./Pagination";

function Dropdowns({ states, data }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const availableSorts = ["ascending", "descending"];

  const uniqueYears = useMemo(() => {
    if (!data) return [];
    const yearsSet = new Set(data.map((idhRecord) => idhRecord.year));
    return [...yearsSet];
  }, [data]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleSelectedStateChange = (_, newValue) => {
    setSelectedState(newValue);
  };

  const handleSelectedYearsChange = (e) => {
    const { value } = e.target;
    setSelectedYears([...value]);
  };

  const handleSelectedSortChange = (e) => {
    const { value } = e.target;
    setSelectedSort(value);
  };

  /**
    data: un arreglo de objetos con los datos que se mostraran en la tabla.
    selectedYear: el año que se desea visualizar.
    selectedState: los estados seleccionados.
    sort: la forma de ordenar los datos.
    pagination: pagina los datos.
 */
  return (
    <div>
      <InputLabel id="state-selected">Select State</InputLabel>
      <Autocomplete
        id="state-selected"
        disablePortal
        options={states}
        value={selectedState}
        onChange={handleSelectedStateChange}
        sx={{ width: 300 }}
        popupIcon={<LocationOnIcon />}
        renderInput={(params) => <TextField {...params} label="Estado" />}
      />

      <InputLabel id="years-selected">Select Years</InputLabel>
      <Select
        endAdornment={<CalendarMonthIcon />}
        labelId="years-selected"
        id="years-selected"
        multiple
        value={selectedYears}
        onChange={handleSelectedYearsChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        sx={{ width: 300 }}
        MenuProps={MenuProps}
      >
        {uniqueYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      <InputLabel id="sort-selected">Sort</InputLabel>
      <Select
        sx={{ width: 300 }}
        labelId="sort-selected"
        id="sort-selected"
        value={selectedSort}
        label="Sort"
        onChange={handleSelectedSortChange}
      >
        {availableSorts.map((sortType) => (
          <MenuItem key={sortType} value={sortType}>
            {sortType}
            <ArrowDownwardIcon />
          </MenuItem>
        ))}
      </Select>

      <DataTable />

      <Pagination />
    </div>
  );
}

export default Dropdowns;

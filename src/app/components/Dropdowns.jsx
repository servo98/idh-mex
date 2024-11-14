"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import DataTable from "./DataTable";
import Pagination from "./Pagination";

/**
 *
 * @param {{states: String[], idhRecords: []}} param0
 * @returns
 */
function Dropdowns({ states, idhRecords }) {
  //TODO: move this
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

  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  //TODO: use query params
  const [searchParams, setSearchParams] = useState(null);

  const params = useSearchParams();

  console.log(params.values);

  const uniqueYears = useMemo(() => {
    if (Array.isArray(idhRecords)) {
      const yearsSet = new Set(idhRecords.map((idhRecord) => idhRecord.year));
      return [...yearsSet];
    }
    return [];
  }, [idhRecords]);

  // alfa
  // asc
  // desc
  const filteredData = useMemo(() => {
    if (Array.isArray(idhRecords)) {
      console.log("idhRecords NO vacio");

      return idhRecords
        .filter((record) => {
          // Here I used morgan rules to simplify comparators and avoid returning hardcoded trues
          const stateCondition =
            !selectedState || record.state === selectedState;

          const yearCondition =
            !selectedYears.length || selectedYears.includes(record.year);

          return stateCondition && yearCondition;
        })
        .sort((a, b) => {
          // Here I tried to avoid switch case or multiple ifs
          const sortFunctions = {
            alfa: (a, b) => a.state.localeCompare(b.state),
            asc: (a, b) => a.idhIndex - b.idhIndex,
            desc: (a, b) => b.idhIndex - a.idhIndex,
          };
          return (sortFunctions[selectedSort] || (() => 0))(a, b);
        });
    }
    console.log("idhRecords vacio");

    return [];
  }, [selectedSort, selectedState, selectedYears, idhRecords]);

  const handleSelectedStateChange = (_, newValue) => {
    setSelectedState(newValue);
  };

  //TODO: make single handle change
  const handleSelectedYearsChange = (e) => {
    const { value } = e.target;
    setSelectedYears([...value]);
  };

  const handleSelectedSortChange = (e) => {
    const { value } = e.target;
    setSelectedSort(value);
  };

  const handlePaginationChange = (data) => {
    console.log(data);
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
        <MenuItem
          value={"alfa"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Alfabéticamente
          <SortByAlphaIcon />
        </MenuItem>
        <MenuItem
          value={"asc"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          IDH
          <ArrowUpwardIcon />
        </MenuItem>
        <MenuItem
          value={"desc"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          IDH
          <ArrowDownwardIcon />
        </MenuItem>
      </Select>

      <DataTable idhRecords={filteredData} />

      <Pagination
        numberItems={filteredData.length}
        onchange={handlePaginationChange}
      />
    </div>
  );
}

export default Dropdowns;

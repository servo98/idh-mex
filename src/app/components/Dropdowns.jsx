"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  InputLabel,
  Fab,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";

import DataTable from "./DataTable";
import Pagination from "./Pagination";

// import useQueryParams from "../hooks/useQueryParams";

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

  //Getting and validation of query params
  // const [queryParams, updateQueryParam] = useQueryParams();

  // Filter states
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  //Pagination states
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  // Calculate unique years un records
  const uniqueYears = useMemo(() => {
    if (Array.isArray(idhRecords)) {
      const yearsSet = new Set(idhRecords.map((idhRecord) => idhRecord.year));
      return [...yearsSet];
    }
    return [];
  }, [idhRecords]);

  // Data filtered pre pagination no direct state neede, just dependencies to re calculate
  const filteredData = useMemo(() => {
    if (Array.isArray(idhRecords)) {
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
            //TODO: add year sort
          };
          return (sortFunctions[selectedSort] || (() => 0))(a, b);
        });
    }

    return [];
  }, [selectedSort, selectedState, selectedYears, idhRecords]);

  // Data to be displayed in current re calculated only when pagination state change
  const paginatedData = useMemo(() => {
    const startIndex =
      (paginationData.currentPage - 1) * paginationData.itemsPerPage;
    const endIndex = paginationData.currentPage * paginationData.itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, paginationData]);

  const isUpdatingRef = useRef(false);

  // change pagination data when new filter are aplied
  useEffect(() => {
    //Reset current page to 1 when data filtered change
    setPaginationData((prevData) => ({
      ...prevData,
      currentPage: 1,
    }));
  }, [selectedState, selectedYears, selectedSort, idhRecords]);

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

  const handlePaginationChange = (data) => {
    setPaginationData(data);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // En pantallas pequeñas columna, en grandes fila
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap", // Permite que los elementos se ajusten en pantallas pequeñas
        }}
      >
        {/* Select State */}
        <Box sx={{ width: { xs: "90%", sm: 300 } }}>
          {" "}
          {/* Ancho completo en pantallas pequeñas */}
          <InputLabel id="state-selected">Select State</InputLabel>
          <Autocomplete
            id="state-selected"
            disablePortal
            options={states}
            value={selectedState || null}
            onChange={handleSelectedStateChange}
            sx={{
              width: "100%", // Se asegura de ocupar todo el espacio disponible
            }}
            popupIcon={<LocationOnIcon />}
            renderInput={(params) => <TextField {...params} label="Estado" />}
          />
        </Box>

        {/* Select Years */}
        <Box sx={{ width: { xs: "90%", sm: 300 } }}>
          {" "}
          {/* Ancho completo en pantallas pequeñas */}
          <InputLabel id="years-selected">Select Years</InputLabel>
          <Select
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
            sx={{
              width: "100%", // Se asegura de ocupar todo el espacio disponible
            }}
            MenuProps={MenuProps}
          >
            {uniqueYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Select Sort */}
        <Box sx={{ width: { xs: "90%", sm: 300 } }}>
          {" "}
          {/* Ancho completo en pantallas pequeñas */}
          <InputLabel id="sort-selected">Sort</InputLabel>
          <Select
            sx={{
              width: "100%", // Se asegura de ocupar todo el espacio disponible
            }}
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
        </Box>
      </Box>

      {/* DataTable */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: 2,
          mt: 2,
        }}
      >
        <DataTable idhRecords={paginatedData} states={states} />
      </Box>

      {/* Paginación */}
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 2 }}
      >
        <Pagination
          numberItems={filteredData.length}
          currentPage={paginationData.currentPage}
          itemsPerPage={paginationData.itemsPerPage}
          onchange={handlePaginationChange}
        />
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed", // Lo coloca en una posición fija en la pantalla
          bottom: 16, // Lo posiciona a 16px del fondo
          right: 16, // Lo posiciona a 16px de la derecha
          zIndex: 1000, // Asegura que esté por encima de otros elementos
        }}
        // Maneja la acción de clic (si tienes alguna acción)
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Dropdowns;

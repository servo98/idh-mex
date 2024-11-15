"use client";

import { useState, useMemo, useEffect } from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DataTable from "./DataTable";
import Pagination from "./Pagination";
import StateSelect from "./filters/StateSelect";
import YearSelect from "./filters/YearSelect";
import SortSelect from "./filters/SortSelect";

import Graph from "./Graph";

/**
 * @param {{states: String[], idhRecords: []}} param0
 * @returns
 */
function Main({ states, idhRecords }) {
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  const uniqueYears = useMemo(() => {
    if (Array.isArray(idhRecords)) {
      const yearsSet = new Set(idhRecords.map((idhRecord) => idhRecord.year));
      return [...yearsSet];
    }
    return [];
  }, [idhRecords]);

  const filteredData = useMemo(() => {
    if (Array.isArray(idhRecords)) {
      return idhRecords
        .filter((record) => {
          const stateCondition =
            !selectedState || record.state === selectedState;
          const yearCondition =
            !selectedYears.length || selectedYears.includes(record.year);
          return stateCondition && yearCondition;
        })
        .sort((a, b) => {
          const sortFunctions = {
            alfa: (a, b) => a.state.localeCompare(b.state),
            asc: (a, b) => a.idhIndex - b.idhIndex,
            desc: (a, b) => b.idhIndex - a.idhIndex,
          };
          return (sortFunctions[selectedSort] || (() => 0))(a, b);
        });
    }
    return [];
  }, [selectedSort, selectedState, selectedYears, idhRecords]);

  const paginatedData = useMemo(() => {
    const startIndex =
      (paginationData.currentPage - 1) * paginationData.itemsPerPage;
    const endIndex = paginationData.currentPage * paginationData.itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, paginationData]);

  useEffect(() => {
    setPaginationData((prevData) => ({
      ...prevData,
      currentPage: 1,
    }));
  }, [selectedState, selectedYears, selectedSort, idhRecords]);

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
      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <StateSelect
          states={states}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
        <YearSelect
          uniqueYears={uniqueYears}
          selectedYears={selectedYears}
          setSelectedYears={setSelectedYears}
        />
        <SortSelect
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
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

      {/* Pagination */}
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

      {/* Graph */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mb: 2,
          borderRadius: "2px",
        }}
      >
        <Graph
          idhRecords={filteredData}
          availableYears={
            selectedYears.length === 0 ? uniqueYears : selectedYears
          }
        />
      </Box>

      {/* Add year button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default Main;

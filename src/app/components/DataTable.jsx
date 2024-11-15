import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Collapse,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

import api from "../lib/axios";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

const DataTable = ({ idhRecords, states }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState({});

  const [collapsed, setCollapsed] = useState(false);

  const openEdit = (row) => {
    setEditData(row);
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
  };

  const openAdd = () => {
    setOpenAddModal(true);
  };

  const handleCloseAdd = () => {
    setOpenAddModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { data } = await api.put("/editIDHRecord", {
        id: editData._id,
        idhIndex: editData.idhIndex,
      });
      console.log("Datos guardados:", data);
      setOpenEditModal(false);
    } catch (error) {
      console.error("Error editando datos");
      console.error(error);
    }
  };

  const handleCreateYear = async (data) => {
    try {
      const { data: resultData } = await api.post("/postIDHYearRecord", data);
      console.log(resultData);
      setOpenAddModal(false);
    } catch (error) {
      console.error("Error registrando año");
      console.error(error);
    }
  };

  const toggleTable = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* collapse button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton
          onClick={toggleTable}
          sx={{
            color: "primary.main",
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>

      <Collapse in={!collapsed}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                    padding: { xs: "6px 10px", sm: "16px 24px" },
                  }}
                >
                  Estado
                </TableCell>
                <TableCell align="right">Año</TableCell>
                <TableCell align="right">IDH</TableCell>
                <TableCell align="right">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(idhRecords) &&
                idhRecords.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "1rem" },
                        padding: { xs: "6px 10px", sm: "16px 24px" },
                      }}
                    >
                      {row.state}
                    </TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                    <TableCell align="right">
                      {(+row.idhIndex).toFixed(3)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => openEdit(row)}
                        aria-label="editar"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add year button */}
        <Fab
          onClick={openAdd}
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
      </Collapse>

      {/* Edit modal */}
      <EditModal
        states={states}
        open={openEditModal}
        handleClose={handleCloseEdit}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />

      <AddModal
        states={states}
        open={openAddModal}
        handleClose={handleCloseAdd}
        handleCreateYear={handleCreateYear}
      />
    </Box>
  );
};

export default DataTable;

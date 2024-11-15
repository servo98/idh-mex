import { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import api from "../lib/axios";
import EditModal from "./EditModal";

const DataTable = ({ idhRecords, states }) => {
  const [open, setOpen] = useState(false); // Estado para el modal de edición
  const [editData, setEditData] = useState({}); // Datos de la fila que se edita
  const [collapsed, setCollapsed] = useState(false); // Estado para colapsar/expandir la tabla

  const openEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const putRecord = async () => {
      try {
        const { data } = await api.put("/editIDHRecord", {
          id: editData._id,
          idhIndex: editData.idhIndex,
        });
        console.log("Datos guardados:", data);
        setOpen(false);
      } catch (error) {
        console.error("Error editando datos");
        console.error(error);
      }
    };
    putRecord();
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
      </Collapse>

      {/* Edit modal */}
      <EditModal
        states={states}
        open={open}
        handleClose={handleClose}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default DataTable;

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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import api from "../lib/axios";

import EditModal from "./EditModal";

const DataTable = ({ idhRecords, states }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

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
        console.error("Error editando datao");
        consoel.error(error);
      }
    };
    putRecord();
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: "100%", px: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  // Ajusta el tamaño solo en pantallas pequeñas (xs)
                  fontSize: { xs: "0.75rem", sm: "1rem" }, // Tamaño más pequeño en móviles
                  padding: { xs: "6px 10px", sm: "16px 24px" }, // Reduce el padding en móvil
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
                      // Ajustes en el tamaño solo para pantallas pequeñas
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

      <EditModal
        states={states}
        open={open}
        handleClose={handleClose}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </>
  );
};

export default DataTable;

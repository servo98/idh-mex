import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
const DataTable = ({ idhRecords }) => {
  return (
    <TableContainer component={Paper} sx={{ width: 700 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Año</TableCell>
            <TableCell align="right">IDH</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(idhRecords) &&
            idhRecords.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.state}
                </TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">
                  {(+row.idhIndex).toFixed(3)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

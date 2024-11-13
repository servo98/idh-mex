import { Pagination } from "@mui/material";

const CustomPagination = ({ totalPages }) => {
  return <Pagination count={totalPages} />;
};

export default CustomPagination;

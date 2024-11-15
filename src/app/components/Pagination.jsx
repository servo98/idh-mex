import { Pagination } from "@mui/material";

const CustomPagination = ({
  currentPage,
  numberItems,
  itemsPerPage,
  onchange,
}) => {
  const totalPages = Math.ceil(numberItems / itemsPerPage);

  const handleChange = (_, value) => {
    if (typeof onchange === "function") {
      onchange({
        currentPage: value,
        itemsPerPage,
      });
    }
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
    />
  );
};

export default CustomPagination;

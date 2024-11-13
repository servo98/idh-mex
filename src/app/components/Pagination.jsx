import { useState } from "react";

import { Pagination } from "@mui/material";

const CustomPagination = ({ numberItems, onchange }) => {
  //TODO: maybe select for choose number of item per page

  const ITEM_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(numberItems / ITEM_PER_PAGE);

  const handleChange = (_, value) => {
    setCurrentPage(value);
    if (typeof onchange === "function") {
      onchange({
        currentPage: value,
        itemsPerpage: ITEM_PER_PAGE,
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

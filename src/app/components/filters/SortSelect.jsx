import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { InputLabel, MenuItem, Select, Box } from "@mui/material";

function SortSelect({ selectedSort, setSelectedSort }) {
  const handleSelectedSortChange = (e) => {
    const { value } = e.target;
    setSelectedSort(value);
  };

  return (
    <Box sx={{ width: { xs: "90%", sm: 300 } }}>
      <InputLabel id="sort-selected">Sort</InputLabel>
      <Select
        sx={{ width: "100%" }}
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
  );
}

export default SortSelect;

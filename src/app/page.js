import { Box } from "@mui/material";

import Dropdowns from "./components/Dropdowns";
import DataTable from "./components/DataTable";

export default function Home() {
  return (
    <div>
      <main>
        <Box sx={{ marginTop: 2 }}>
          <Dropdowns />
          <DataTable />
        </Box>
      </main>
      {/* TODO: make footer */}
      {/* <footer>footer</footer> */}
    </div>
  );
}

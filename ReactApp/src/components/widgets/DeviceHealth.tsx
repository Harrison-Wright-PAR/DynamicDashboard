import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import deviceData from "./deviceHealth.json";
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
  { field: "col1", headerName: "DeviceName", width: 150 },
  {
    field: "col2",
    headerName: "Status",
    width: 150,
    valueGetter: (param) => (param.value == 1 ? "Online" : "Offline"),
    cellClassName: (param) => (param.value == "Online" ? "Online" : "Offline"),
  },
];

export default function DeviceHealthReport() {
  return (
    <Box sx={{ width: "700px" }}>
      <h1>Device Status</h1>
      <DataGrid
        rows={deviceData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

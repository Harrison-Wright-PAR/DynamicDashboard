import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import CustomerFeedbackData from "./customerFeedback.json";
import Box from "@mui/material/Box";

const columns: GridColDef[] = [
  { field: "col1", headerName: "CustomerName", width: 150 },
  { field: "col2", headerName: "Rating", width: 100 },
  {
    field: "col4",
    headerName: "Date",
    width: 200,
    valueGetter: (param) => formatDate(param.value),
  },
  { field: "col3", headerName: "Feedback", width: 200 },
];

export default function CustomerFeedback() {
  return (
    <Box sx={{ width: "700px" }}>
      <h1>Customer Feedback</h1>
      <DataGrid 
        rows={CustomerFeedbackData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7]}
        disableRowSelectionOnClick />
    </Box>
  );
}

const formatDate = (dateString: string) => {
  var date = new Date(dateString);

  return date.toLocaleString();
};

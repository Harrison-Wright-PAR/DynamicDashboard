import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CustomerFeedbackData from './customerFeedback.json';

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'CustomerName', width: 150 },
  { field: 'col2', headerName: 'Rating', width: 100}, 
  { field: 'col4', headerName: 'Date', width: 200,  valueGetter: (param) =>formatDate(param.value),},
  { field: 'col3', headerName: 'Feedback', width: 200},
];

export default function CustomerFeedback() {
  return (
    <div style={{ height: 400, width: '80%', marginLeft:"10%" }}>
      <DataGrid rows={CustomerFeedbackData} columns={columns} />
    </div>
  );
}

const formatDate = (dateString:string) => {
var date = new Date(dateString);

return date.toLocaleString();
}
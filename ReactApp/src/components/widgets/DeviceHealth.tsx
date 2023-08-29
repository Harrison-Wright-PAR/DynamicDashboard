import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import deviceData from './deviceHealth.json';

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'DeviceName', width: 150 },
  { 
    field: 'col2', headerName: 'Status', width: 150, 
    valueGetter: (param) =>(param.value ==1)? "Online":"Offline",
    cellClassName: (param) =>  (param.value =="Online")? "Online":"Offline"},
];

export default function DeviceHealth() {
  return (
    <div style={{ height: 300, width: '80%', marginLeft:"10%" }}>
      <DataGrid rows={deviceData} columns={columns} />
    </div>
  );
}
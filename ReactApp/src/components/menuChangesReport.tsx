import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

const columns: GridColDef[] = [
  {
    field: 'Name',
    headerName: 'Change Name',
    width: 400,
    editable: false,
  },
  {
    field: 'Date',
    headerName: 'Change Date',
    width: 200,
    type: 'dateTime',
    editable: false,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }
      // Convert the decimal value to a percentage
      return new Date(params.value);
    },
  }
];


export default function MenuChangesReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
      // Fetch the local JSON file
      fetch('./data/menuChanges.json')
          .then((response) => {
              console.log(response);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then((data) => {
              data.sort((a: any, b: any) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
              setData(data);
              setLoading(false);
          })
          .catch((error) => {
              setError(error);
              setLoading(false);
          });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

return (
  <Box sx={{ width: '700px' }}>
    <h1>Menu Changes</h1>
    <DataGrid
      getRowId={(row) => row.Id}
      rows={data}
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
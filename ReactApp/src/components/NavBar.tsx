import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, Link } from "react-router-dom";
import Button from '@mui/material/Button';


export default function NavBar() {
  return (
    <div>
    <Box sx={{ mr:2 }}>
      <AppBar position="fixed"  sx= { { backgroundColor: '#0a3450' }}>
        <Toolbar>
            <Link to="/">
                <img height='50px' src="https://cdn.brinkpos.net/images/PAR-LOGO_White_2023.png" />
            </Link>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, margin: '15px' }}>
              Board of Dreams
            </Typography>
            <Button variant="text"  sx= { { my: 2, color: 'white', display: 'block' }} href="/examples">Examples </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet/>
    </div>
  );
}

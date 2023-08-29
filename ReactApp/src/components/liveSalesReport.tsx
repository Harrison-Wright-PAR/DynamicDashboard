import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LiveSalesReport() {
  const [salesTotal, setSalesTotal] = useState(0);

  const fetchSalesData = () => {
    const randomIncrement = Math.floor(Math.random() * 100) + 1;
    setSalesTotal((prevSalesTotal) => prevSalesTotal + randomIncrement);
  };

  useEffect(() => {
    fetchSalesData(); // fetch initial sales data

    const interval = setInterval(() => {
      fetchSalesData();
    }, 20 * 1000); // refresh every 20 seconds

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Sales
        </Typography>
        <Typography variant="h3" component="div">
          ${salesTotal}
        </Typography>
        <span style={{ color: '#4CAF50' }}>+5% <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>since last week</span></span>
      </CardContent>
    </Card>
  );
}

import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesTrendReport() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        // Fetch the local JSON file
        fetch('./data/salesTrend.json')
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                data.sort((a: any, b: any) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
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
    <Box>
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tickFormatter = {t => new Date(t).toLocaleTimeString()}/>
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip labelFormatter={t => new Date(t).toLocaleTimeString()}/>
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="AverageTicketPrice" stroke="#8884d8" activeDot={{ r: 8 }} name="Average Ticket Price" />
          <Line  yAxisId="right" type="monotone" dataKey="LaborHours" stroke="#82ca9d" name="Labor Hours" />
        </LineChart>
    </Box>
  );
}

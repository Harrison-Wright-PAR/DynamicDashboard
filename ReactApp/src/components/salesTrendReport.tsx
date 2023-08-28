import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SalesTrendReport() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        // Fetch the local JSON file
        fetch('./data/orders.json')
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
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
    <div>
      <h1>Sales Trend Report</h1>
      <LineChart
        xAxis={[{ dataKey: 'Date', scaleType: 'time', valueFormatter: (date: Date) => date.toLocaleDateString()}]}
        series={[{ dataKey: 'Total'}]}
        dataset={data}
      />
    </div>
  );
}

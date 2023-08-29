import React, { useState, useEffect } from 'react';
import { ComposedChart, Bar, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function LaborCostReport() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        // Fetch the local JSON file
        fetch('./data/laborCost.json')
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
    <div>
      <h1>Labor Analysis - Past 2 Weeks</h1>
        <ComposedChart
          width={800}
          height={500}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
          barSize={25}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tickFormatter = {t => new Date(t).toLocaleDateString()}/>
          <YAxis />
          <Tooltip labelFormatter={t => new Date(t).toLocaleDateString()} />
          <Legend />
          <Area name="Target Hours" type="monotone" dataKey="TargetHours" fill="#8884d8" stroke="#8884d8"/>
          <Bar name="Actual Hours" dataKey="ActualHours" fill="#413ea0"/>
          {/* <Line type="monotone" dataKey="TargetHours" stroke="#ff7300" /> */}
        </ComposedChart>
    </div>
  );
}

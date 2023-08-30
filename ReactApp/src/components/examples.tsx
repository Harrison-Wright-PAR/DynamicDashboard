import React from "react";
import { Box, Card, Container } from "@mui/material";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { layout, componentMap, mapLayouts } from "../utils";

export default function Examples() {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  let components = [
    {
      goodFor: "all",
      id: 0,
      name: "HelloUser",
      purpose: "greet the user",
    },
    {
      goodFor: "management, franchise owner, franchisee",
      id: 2,
      name: "SalesTrendReport",
      purpose: "show the sales trend for a single location",
    },
    {
      name: "LaborCostReport",
      goodFor: "management, franchise owner, franchisee",
      id: 3,
      purpose: "show the labor cost for a single location",
    },
    {
      name: "LaborIrregularitiesReport",
      goodFor: "management, franchise owner, franchisee",
      id: 4,
      purpose: "show the labor irregularities for a single location",
    },
    {
      name: "LiveSalesReport",
      goodFor: "management, franchise owner, franchisee",
      id: 5,
      purpose: "show the live sales for a single location",
    },
    {
      name: "MenuChangesReport",
      goodFor: "management, franchise owner, franchisee",
      id: 6,
      purpose: "show the menu changes for a single location",
    },
    {
      name: "SalesDailyReport",
      goodFor: "management, franchise owner, franchisee",
      id: 7,
      purpose: "show the sales daily for a single location",
    },
    {
      name: "CustomerFeedback",
      goodFor: "management, franchise owner, franchisee",
      id: 8,
      purpose: "show the customer feedback for a single location",
    },
    {
      name: "CustomerRatings",
      goodFor: "management, franchise owner, franchisee",
      id: 9,
      purpose: "show the customer ratings for a single location",
    },
    {
      name: "DeviceHealth",
      goodFor: "management, franchise owner, franchisee",
      id: 10,
      purpose: "show the device health for a single location",
    },
    {
      name: "TotalSales",
      goodFor: "management, franchise owner, franchisee",
      id: 11,
      purpose: "show the total sales for a single location",
    },
  
  ];


  components = mapLayouts(components, layout);

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="MainApp"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {components &&
          components.length > 0 &&
          components.map((component: any) => {
            const Component = componentMap[component["name"]];
            if (Component) {
              return (
                <Card
                  sx={{ m: 2, p: 10 }}
                  key={component.id}
                  data-grid={{ ...component.layout }}
                >
                  <Component />
                </Card>
              );
            } else {
              console.error(
                `Component with name ${component["name"]} not found in componentMap`
              );
              return null;
            }
          })}
      </Box>
    </ThemeProvider>
  );
}
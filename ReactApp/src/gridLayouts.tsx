export const layout: Array<LayoutItem> = [
    { i: "HelloUser", x: 0, y: 0, w: 6, h: 4 },
    { i: "SalesReport", x: 1, y: 1, w: 6, h: 4 },
    { i: "SalesTrendReport", x: 2, y: 2, w: 7.7, h: 10.2 },
    { i: "LaborCostReport", x: 3, y: 3, w: 11, h: 15 },
    { i: "LaborIrregularitiesReport", x: 4, y: 4, w: 9.1, h: 11.5 },
    { i: "LiveSalesReport", x: 5, y: 5, w: 4, h: 4 },
    { i: "MenuChangesReport", x: 6, y: 6, w: 8.5, h: 11.5 },
    { i: "SalesDailyReport", x: 7, y: 7, w: 11, h: 15 },
  ];

  
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
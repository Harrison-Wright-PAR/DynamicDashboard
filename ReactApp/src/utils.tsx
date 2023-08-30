import HelloUser from "./components/helloUser";
import LaborCostReport from "./components/laborCostReport";
import LaborIrregularitiesReport from "./components/laborIrregularitiesReport";
import LiveSalesReport from "./components/liveSalesReport";
import MenuChangesReport from "./components/menuChangesReport";
import SalesDailyReport from "./components/salesDailyReport";
import SalesTrendReport from "./components/salesTrendReport";
import CustomerFeedbackReport from "./components/widgets/CustomerFeedback";
import CustomerRatingsReport from "./components/widgets/CustomerRatings";
import DeviceHealthReport from "./components/widgets/DeviceHealth";

export const layout: Array<LayoutItem> = [
    { i: "HelloUser", x: 0, y: 0, w: 6, h: 4 },
    { i: "SalesTrendReport", x: 2, y: 2, w: 7.7, h: 10.2 },
    { i: "LaborCostReport", x: 3, y: 3, w: 11, h: 15 },
    { i: "LaborIrregularitiesReport", x: 4, y: 4, w: 9.1, h: 11.5 },
    { i: "LiveSalesReport", x: 5, y: 5, w: 4, h: 4 },
    { i: "MenuChangesReport", x: 6, y: 6, w: 8.5, h: 11.5 },
    { i: "SalesDailyReport", x: 7, y: 7, w: 11, h: 15 },
    { i: "CustomerFeedbackReport", x: 8, y: 8, w: 4, h: 4 },
    { i: "CustomerRatingsReport", x: 9, y: 9, w: 6, h: 8 },
    { i: "DeviceHealthReport", x: 10, y: 10, w: 4, h: 4 },
  ];

  
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ComponentMap = {
  [key: string]: React.ComponentType<any>;
};

export const componentMap: ComponentMap = {
  HelloUser: HelloUser,
  SalesTrendReport: SalesTrendReport,
  LaborCostReport: LaborCostReport,
  LaborIrregularitiesReport: LaborIrregularitiesReport,
  LiveSalesReport: LiveSalesReport,
  MenuChangesReport: MenuChangesReport,
  SalesDailyReport: SalesDailyReport,
  CustomerFeedbackReport: CustomerFeedbackReport,
  CustomerRatingsReport: CustomerRatingsReport,
  DeviceHealthReport: DeviceHealthReport,
};


export const mapLayouts = (components: any[], layout: any[]) => {
  return components.map((x: any, i: number) => {
    x["id"] = i;
    var defaultLayout = layout.find((item) => item.i === x.name);
    if (defaultLayout == undefined) {
      defaultLayout = { i: x.name, x: 0, y: 0, w: 4, h: 4 };
    }
    defaultLayout["x"] = i;
    defaultLayout["y"] = i;
    x["layout"] = defaultLayout;
    console.log(x);
    return x;
  });
};
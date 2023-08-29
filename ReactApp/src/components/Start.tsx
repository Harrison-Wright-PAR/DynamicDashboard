import React, { useState } from 'react';
import Api from '../services/openAIApi';
//import './App.css';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import HelloUser from './helloUser';
import SalesReport from './salesReport';
import SalesTrendReport from './salesTrendReport';
import { Button, TextField, Box, Container, Grid, getListItemSecondaryActionClassesUtilityClass } from '@mui/material';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Start } from '@mui/icons-material';
import LaborIrregularitiesReport from './laborIrregularitiesReport';
import LiveSalesReport from './liveSalesReport';
import MenuChangesReport from './menuChangesReport';
import SalesDailyReport from './salesDailyReport';
import LaborCostReport from './laborCostReport';

type ComponentMap = {
  [key: string]: React.ComponentType<any>;
};

const componentMap: ComponentMap = {
  HelloUser: HelloUser,
  SalesReport: SalesReport,
  SalesTrendReport: SalesTrendReport,
  LaborCostReport: LaborCostReport,
  LaborIrregularitiesReport: LaborIrregularitiesReport,
  LiveSalesReport: LiveSalesReport,
  MenuChangesReport: MenuChangesReport,
  SalesDailyReport: SalesDailyReport
}

function StartPage() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [dashboard, setDashboard] = useState('');
  const [userRequest, setUserRequest] = useState('');
  const api = new Api();

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const layout: Array<LayoutItem> = [
    { i: 'HelloUser', x: 0, y: 0, w: 6, h: 4 },
    { i: 'SalesReport', x: 1, y: 1, w: 6, h: 4 },
    { i: "SalesTrendReport", x: 2, y: 2, w: 7.7, h: 10.2 },
    { i: "LaborCostReport", x: 3, y: 3, w: 11, h: 15 },
    { i: 'LaborIrregularitiesReport', x: 4, y: 4, w: 9.1, h: 11.5 },
    { i: 'LiveSalesReport', x: 5, y: 5, w: 4, h: 4 },
    { i: 'MenuChangesReport', x: 6, y: 6, w: 8.5, h: 11.5 },
    { i: "SalesDailyReport", x: 7, y: 7, w: 11, h: 15 },
  ];

  const handleButtonClick = async () => {
    setApiResponse("Calling API...");
    const response = await api.generate(inputValue);
    setApiResponse(response);
  };

  const fetchComponents = async () => {
    setApiResponse("Calling API...");
    const response = await api.fetchComponents();
    console.log(response);
    var components = response['components'];
    components = components.filter((x: any) => x['name'] in componentMap);
    components = components.map((x: any, i: number) => {
      x['id'] = i
      var defaultLayout = layout.find((item) => item.i === x.name);
      if (defaultLayout == undefined) {
        defaultLayout = { i: x.name, x: 0, y: 0, w: 4, h: 4 };
      }
      defaultLayout['x'] = i;
      defaultLayout['y'] = i;
      x['layout'] = defaultLayout;
      console.log(x);
      return x;
    })
    setComponents(response['components']);
    setDashboard(response['components']);
    setApiResponse(response);
  };
  const updateDashboard = async () => {
    var res = await api.updateDashboard(dashboard, userRequest)
    console.log(res);

    if (res['components']) {
      setComponents(res['components']);
    }

    setApiResponse(res);
  };

  const fetchComponentsLocal = async () => {
    var sampleComponents : Component[] = [
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
      
    ];

    sampleComponents = sampleComponents.map((component) => {
      const layoutItem = layout.find((item) => item.i === component.name);
      if (layoutItem) {
        component.layout = layoutItem;
      }
      return component;
    });
  
    setComponents(sampleComponents);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ width: '100%' }}>
        <Box className="MainApp" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
          <Box sx={{ mt: 3 }}>
            <TextField sx={{ width: '400px' }} rows={3} label="Input Value" value={inputValue} multiline={true} onChange={(e) => setInputValue(e.target.value)} />
            <Button color='parBlue' variant="contained" sx={{ margin: '10px' }} onClick={handleButtonClick}>Call API</Button>
          </Box>
          {apiResponse && (
            <Box sx={{ mt: 3 }}>
              <JsonView data={apiResponse} shouldInitiallyExpand={allExpanded} style={darkStyles} />
            </Box>
          )}
          <Box sx={{ mt: 3, }}>
            <Button color='parBlue' sx={{ margin: '5px' }} variant="contained" onClick={() => fetchComponents()}>Fetch Components - AI</Button>
            <Button color='parBlue' sx={{ margin: '5px' }} variant="contained" onClick={() => fetchComponentsLocal()}>Fetch Components - Local</Button>
          </Box>
          <Box sx={{ mt: 3, }}>

            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              breakpoints={{ lg: 1600 }}
              cols={{ lg: 16 }}
              rowHeight={30}
            >
              {components && components.length > 0 && (
                components.map((component: any) => {
                  const Component = componentMap[component['name']];
                  if (Component) {
                    return (
                      <div key={component.id} data-grid={{ ...component.layout }}>
                        <Component />
                      </div>
                    );
                  } else {
                    console.error(`Component with name ${component['name']} not found in componentMap`);
                    return null;
                  }
                })
              )}
            </ResponsiveGridLayout>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button color='parBlue' variant="contained" sx={{ margin: '10px' }} onClick={() => updateDashboard()}>Update Dashboard</Button>
            <TextField label="Any requests for updates?" value={userRequest} onChange={(e) => setUserRequest(e.target.value)} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

interface Component {
  goodFor: string;
  id?: number;
  layout?: { i: string; x: number; y: number; w: number; h: number };
  name: string;
  purpose: string;
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default StartPage;
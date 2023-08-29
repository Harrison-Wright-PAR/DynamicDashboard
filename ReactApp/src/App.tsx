import React, { useState } from 'react';
import Api from './services/openAIApi';
import './App.css';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import HelloUser from './components/helloUser';
import SalesReport from './components/salesReport';
import SalesTrendReport from './components/salesTrendReport';
import { Button, TextField, Box, Container, Grid } from '@mui/material';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import LaborCostReport from './components/laborCostReport';
import LaborIrregularitiesReport from './components/laborIrregularitiesReport';
import LiveSalesReport from './components/liveSalesReport';
import MenuChangesReport from './components/menuChangesReport';
import SalesDailyReport from './components/salesDailyReport';
type ComponentMap = {
  [key: string]: React.ComponentType<any>;
}

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

function App() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [dashboard, setDashboard] = useState('');
  const [userRequest, setUserRequest] = useState('');
  const api = new Api();

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const layout : Array<LayoutItem> = [
    { i: 'HelloUser', x: 0, y: 0, w: 6, h: 4 },
    { i: 'SalesReport', x: 6, y: 0, w: 6, h: 4 },
    { i: 'SalesTrendReport', x: 20, y: 4, w: 24, h: 16 },
    { i: 'LaborCostReport', x: 0, y: 4, w: 12, h: 8 },
    { i: 'LaborIrregularitiesReport', x: 12, y: 4, w: 8, h: 8 },
    { i: 'LiveSalesReport', x: 0, y: 12, w: 12, h: 8 },
    { i: 'MenuChangesReport', x: 12, y: 12, w: 8, h: 8 },
    { i: 'SalesDailyReport', x: 20, y: 0, w: 12, h: 4 },
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
      if(defaultLayout == undefined) {
        defaultLayout = { i: x.name, x: 0, y: 0, w: 4, h: 4 };
      }
      defaultLayout['x'] = i * 100;
      defaultLayout['y'] = i * 100;
      x['layout'] = 
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
    var sampleComponents = [
      {
        goodFor: "all",
        id: 0,
        layout: { i: "HelloUser", x: 0, y: 0, w: 6, h: 4 },
        name: "HelloUser",
        purpose: "greet the user",
      },
      {
        goodFor: "sales, management, marketing, store operator, franchisee",
        id: 1,
        layout: { i: "SalesReport", x: 20, y: 20, w: 6, h: 4 },
        name: "SalesReport",
        purpose: "show the sales report",
      },
      {
        goodFor: "management, franchise owner, franchisee",
        id: 2,
        layout: { i: "SalesTrendReport", x: 40, y: 40, w: 40, h: 10 },
        name: "SalesTrendReport",
        purpose: "show the sales trend for a single location",
      },
    ];
    setComponents(sampleComponents);
  };


  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
        <Box sx={{ mt: 3 }}>
          <TextField sx={{ width: '400px'  }} rows={3} label="Input Value" value={inputValue} multiline={true} onChange={(e) => setInputValue(e.target.value)} />
          <Button variant="contained" sx={{ margin: '10px'}}  onClick={handleButtonClick}>Call API</Button>
        </Box>
        {apiResponse && (
          <Box sx={{ mt: 3 }}>
            <JsonView data={apiResponse} shouldInitiallyExpand={allExpanded} style={darkStyles} />
          </Box>
        )}
        <Box sx={{ mt: 3 }}>
          <Button sx={{ margin: '5px'}} variant="contained" onClick={() => fetchComponents()}>Fetch Components - AI</Button>
          <Button sx={{ margin: '5px'}} variant="contained" onClick={() => fetchComponentsLocal()}>Fetch Components - Local</Button>

          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1600 }}
            cols={{ lg: 40 }}
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
          <Button variant="contained" sx={{ margin: '10px'}} onClick={() => updateDashboard()}>Update Dashboard</Button>
          <TextField label="Any requests for updates?" value={userRequest} onChange={(e) => setUserRequest(e.target.value)} />
        </Box>
      </Box>
    </Container>
  );
}
interface Component {
  goodFor: string;
  id?: number;
  layout?: { i: string; x: number; y: number; w: number; h: number };
  name: string;
  purpose: string;
}

interface LayoutItem{
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}


export default App;
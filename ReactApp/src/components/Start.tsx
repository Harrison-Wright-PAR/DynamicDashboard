import React, { useState } from 'react';
import Api from '../services/openAIApi';
//import './App.css';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import HelloUser from './helloUser';
import SalesReport from './salesReport';
import SalesTrendReport from './salesTrendReport';
import { Button, TextField, Box, Container, Grid } from '@mui/material';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Start } from '@mui/icons-material';
type ComponentMap = {
  [key: string]: React.ComponentType<any>;
}

const componentMap: ComponentMap = {
  HelloUser: HelloUser,
  SalesReport: SalesReport,
  SalesTrendReport: SalesTrendReport
}

function StartPage() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [components, setComponents] = useState<Component[]>([]);
  const [dashboard, setDashboard] = useState('');
  const [userRequest, setUserRequest] = useState('');
  const api = new Api();

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const layout = [
    { i: 'HelloUser', x: 0, y: 0, w: 6, h: 4 },
    { i: 'SalesReport', x: 6, y: 0, w: 6, h: 4 },
    { i: 'SalesTrendReport', x: 20, y: 4, w: 12, h: 8 }
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
      x['layout'] = layout.find((item) => item.i === x.name);
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
        layout: { i: "SalesReport", x: 6, y: 0, w: 6, h: 4 },
        name: "SalesReport",
        purpose: "show the sales report",
      },
      {
        goodFor: "management, franchise owner, franchisee",
        id: 2,
        layout: { i: "SalesTrendReport", x: 20, y: 4, w: 12, h: 8 },
        name: "SalesTrendReport",
        purpose: "show the sales trend for a single location",
      },
    ];
    setComponents(sampleComponents);
  };


  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="sm" sx={{}}>
      <Box className ="MainApp" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mt: 3 }}>
          <TextField sx={{ width: '400px'  }} rows={3} label="Input Value" value={inputValue} multiline={true} onChange={(e) => setInputValue(e.target.value)} />
          <Button color='parBlue' variant="contained" sx={{ margin: '10px'}}  onClick={handleButtonClick}>Call API</Button>
        </Box>
        {apiResponse && (
          <Box sx={{ mt: 3 }}>
            <JsonView data={apiResponse} shouldInitiallyExpand={allExpanded} style={darkStyles} />
          </Box>
        )}
        <Box sx={{ mt: 3 }}>
          <Button color='parBlue' sx={{ margin: '5px'}} variant="contained" onClick={() => fetchComponents()}>Fetch Components - AI</Button>
          <Button color='parBlue' sx={{ margin: '5px'}} variant="contained" onClick={() => fetchComponentsLocal()}>Fetch Components - Local</Button>

          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1600 }}
            cols={{ lg: 12 }}
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
          <Button color='parBlue' variant="contained" sx={{ margin: '10px'}} onClick={() => updateDashboard()}>Update Dashboard</Button>
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


export default StartPage;
import React, { useState, useEffect } from "react";
import Api from "../services/openAIApi";
//import './App.css';
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import HelloUser from "./helloUser";
import SalesTrendReport from "./salesTrendReport";
import {
  Button,
  TextField,
  Box,
  Container,
  Grid,
  getListItemSecondaryActionClassesUtilityClass,
  Typography,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Start } from "@mui/icons-material";
import LaborIrregularitiesReport from "./laborIrregularitiesReport";
import LiveSalesReport from "./liveSalesReport";
import MenuChangesReport from "./menuChangesReport";
import SalesDailyReport from "./salesDailyReport";
import LaborCostReport from "./laborCostReport";
import { layout, LayoutItem, mapLayouts, componentMap } from "../utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function StartPage() {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [components, setComponents] = useState<Component[]>([]);
  const [dashboard, setDashboard] = useState("");
  const [userRequest, setUserRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "If you wait for it, it will come... Crafting your Board of Dreams now! 🌟📊"
  );
  const [dashboardGenerated, setDashboardGenerated] = useState(false);
  const api = new Api();

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const handleButtonClick = async () => {
    setApiResponse("Calling API...");
    const response = await api.generate(inputValue);
    setApiResponse(response);
  };

  const fetchComponents = async () => {
    setLoading(true);
    setApiResponse("Calling API...");
    const response = await api.fetchComponents(inputValue);
    console.log(response);
    var components = response["components"];
    components = components.filter((x: any) => x["name"] in componentMap);
    components = components.map((x: any, i: number) => {
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
    setComponents(response["components"]);
    setDashboard(response["components"]);
    setDashboardGenerated(true);
    setApiResponse(response);
    setLoading(false);
  };

  const updateDashboard = async () => {
    setLoading(true);
    setLoadingMessage(
      "If you wait for it, it will come... Crafting your Board of Dreams now! 🌟📊"
    );
    var res = await api.updateDashboard(dashboard, userRequest);
    console.log(res);
    var components = res["components"];

    components = components.filter((x: any) => x["name"] in componentMap);
    components = mapLayouts(components, layout);

    if (res["components"]) {
      setComponents(res["components"]);
    }

    setApiResponse(res);
    setLoading(false);
  };

  const fetchComponentsLocal = async () => {
    var sampleComponents: Component[] = [
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

  useEffect(() => {
    const timeoutId1 = setTimeout(() => {
      setLoadingMessage("Good boards come to those who wait...🙇‍♂️📈");

      const timeoutId2 = setTimeout(() => {
        setLoadingMessage(
          "“I don’t always load, but when I do - it takes just a minute. 😎🏖️” - Most interesting board in the world"
        );
      }, 20000); // change the message after another 20 seconds (20000 milliseconds)

      return () => clearTimeout(timeoutId2);
    }, 20000); // change the message after 20 seconds (20000 milliseconds)

    return () => clearTimeout(timeoutId1);
  }, []); // run the effect only once, when the component mounts

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="MainApp"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        {!dashboardGenerated && (
          <Container maxWidth="sm" sx={{ mt: "8%" }}>
            <Box sx={{ mt: 3, alignItems: "left" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "parBlue",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Welcome to the Board of Dreams!
              </Typography>
              <Typography variant="body1">
                Tell us what you need to see to manage your brand in plain
                english!
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                (Example: I need to be able to quickly see sales and labor, top
                items sold, and device health.)
              </Typography>
            </Box>
            <Box sx={{ mt: 3, width: "100%" }}>
              {" "}
              {/* add the Box component and set the flexDirection property */}
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                rows={3}
                value={inputValue}
                multiline={true}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="parBlue"
                  variant="contained"
                  disabled={loading}
                  onClick={fetchComponents}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Container>
        )}
        {loading && (
          <Container maxWidth="xl" sx={{ mt: 10, width: "100%" }}>
            <Typography variant="body1">{loadingMessage}</Typography>
            <LinearProgress />
          </Container>
        )}
        {/* <Box sx={{ mt: 3, }}>
          <Button color='parBlue' sx={{ margin: '5px' }} variant="contained" onClick={() => fetchComponents()}>Fetch Components - AI</Button>
          <Button color='parBlue' sx={{ margin: '5px' }} variant="contained" onClick={() => fetchComponentsLocal()}>Fetch Components - Local</Button>
        </Box> */}
        {dashboardGenerated && (
          <Box>
            <Box sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}>
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
            <Container maxWidth="sm" sx={{ mt: 3, width: "100%" }}>
              <Typography variant="body1">
                Not happy with the dashboard? Request updates and regenerate the
                dashboard.
              </Typography>
              <Box sx={{ mt: 1, width: "100%" }}>
                {" "}
                {/* add the Box component and set the flexDirection property */}
                <TextField
                  sx={{ width: "100%", marginBottom: "10px" }}
                  rows={3}
                  value={userRequest}
                  onChange={(e) => setUserRequest(e.target.value)}
                  multiline={true}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    color="parBlue"
                    variant="contained"
                    onClick={updateDashboard}
                    disabled={loading}
                  >
                    Update Dashboard
                  </Button>
                </Box>
              </Box>
            </Container>
            <Box sx={{ mt: 20 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Developer Tools</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <JsonView
                    data={apiResponse}
                    shouldInitiallyExpand={allExpanded}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        )}
      </Box>
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

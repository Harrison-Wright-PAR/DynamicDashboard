import React, { useState } from 'react';
import Api from '../services/openAIApi';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import HelloUser from '../components/helloUser';
import SalesReport from '../components/salesReport';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

type ComponentMap = {
    [key: string]: React.ComponentType<any>;
  }
  
  const componentMap: ComponentMap = {
    HelloUser: HelloUser,
    SalesReport: SalesReport,
  }

  function Start() {
    const [inputValue, setInputValue] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [components, setComponents] = useState([]);
  
    const handleButtonClick = async () => {
      const api = new Api();
      setApiResponse("Calling API...");
      const response = await api.generate(inputValue);
      setApiResponse(response);
    };
  
    const fetchComponents = async () => {
      const api = new Api();
      setApiResponse("Calling API...");
      const response = await api.fetchComponents();
      console.log(response);
      setComponents(response['components']);
      setApiResponse(response);
    };
  
    return (
        <ThemeProvider theme={theme}>
      <div className="center-box">
        <div>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount"
          
          ></InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Amount"
            value={inputValue} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputValue(e.target.value)} 
          />
        </FormControl>
        {/* <TextField
          id="outlined-multiline-static"
        //   label="Multiline"
        //   multiline
        //   rows={2}
          defaultValue="Default Value"
         
        /> */}
          <Button color='parBlue'  sx={{ mt: 3, mb: 2 }} variant="contained" onClick={handleButtonClick}>Call PAR GPT</Button>
        </div>
        {apiResponse && (
          <div className="json-view-container">
            <JsonView data={apiResponse} shouldInitiallyExpand={allExpanded} style={darkStyles} />
          </div>
        )}
        <div>
            <Button color='parBlue' variant="contained" onClick={() => fetchComponents()}>Fetch Components</Button>
          {components && components.length > 0 && (
            components.map((component: any) => {
              const Component = componentMap[component['name']];
              if (Component) {
                return <Component key={component.id} />;
              } else {
                console.error(`Component with name ${component['name']} not found in componentMap`);
                return null;
              }
            })
          )}
        </div>
      </div>
      </ThemeProvider>
    );
  
  
  }
  
  
  export default Start;
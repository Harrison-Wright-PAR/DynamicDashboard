import React, { useState } from 'react';
import Api from './services/openAIApi';
import './App.css';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import HelloUser from './components/helloUser';
import SalesReport from './components/salesReport';

type ComponentMap = {
  [key: string]: React.ComponentType<any>;
}

const componentMap: ComponentMap = {
  HelloUser: HelloUser,
  SalesReport: SalesReport,
}

function App() {
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
    <div className="center-box">
      <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleButtonClick}>Call API</button>
      </div>
      {apiResponse && (
        <div className="json-view-container">
          <JsonView data={apiResponse} shouldInitiallyExpand={allExpanded} style={darkStyles} />
        </div>
      )}
      <div>
        <button onClick={() => fetchComponents()}>Fetch Components</button>
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
  );


}


export default App;
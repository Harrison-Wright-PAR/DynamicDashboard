import React, { useState } from 'react';
import Api from './services/openAIApi';
import './App.css';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import HelloUser from './components/helloUser';
import SalesReport from './components/salesReport';
import SalesTrendReport from './components/salesTrendReport';

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
      <SalesTrendReport />
    </div>
  );


}


export default App;
import React, { useState } from 'react';
import Api from './services/openAIApi';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const handleButtonClick = async () => {
    const api = new Api();
    setApiResponse("Calling API...");
    const response = await api.generate(inputValue);
    setApiResponse(JSON.stringify(response['choices'][0]['message']['content']));
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleButtonClick}>Call API</button>
      <p>{apiResponse}</p>
    </div>
  );
}

export default App;
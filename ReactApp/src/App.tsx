import React from 'react';
import logo from './logo.svg';
import './App.css';
import Api from './services/openAIApi';

function App() {
  var x = new Api();
  var y = x.generate("dog").then(x => console.log(x));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

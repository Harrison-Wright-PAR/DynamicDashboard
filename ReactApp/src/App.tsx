import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './components/Start';
import NavBar from './components/NavBar'
import Examples from './components/examples';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<StartPage />} />
           <Route path="examples" element={<Examples />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
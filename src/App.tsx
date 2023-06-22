import React from 'react';
import logo from './logo.svg';
import './App.css';

import PageRoutes from "./routes";
import MainLayout from "./Pattern/MainLayout";

function App() {
  return (
    <MainLayout>
      <PageRoutes/>
    </MainLayout>  
  );
}

export default App;

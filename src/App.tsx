import React from 'react';
import logo from './logo.svg';
import './App.css';

import PageRoutes from "./routes";
import MainLayout from "./Pattern/MainLayout";
import { ModalProvider } from "./Pattern/Modal";

function App() {
  return (
  <ModalProvider>
    <MainLayout>
      <PageRoutes/>
    </MainLayout>
  </ModalProvider>
  );
}

export default App;

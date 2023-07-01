import React from 'react';
import logo from './logo.svg';
import './App.css';

import PageRoutes from "./routes";
import { ModalProvider } from "./Pattern/Modal";
import { Provider } from 'react-redux';
import { store } from './interface/Redux';

function App() {
  return (
  <Provider store={store}>
    <ModalProvider>
        <PageRoutes/>
    </ModalProvider>
  </Provider>  
  );
}

export default App;

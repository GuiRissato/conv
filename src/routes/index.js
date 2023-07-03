import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// PAGES
import Main from "../pages/chat"
import Login from "../pages/login"

import Header from "../Pattern/Header";

import Private from './private.js';

function PageRoutes(){

  return(
    <Router basename='/'>
     <Routes>
    
     <Route path="*" element={<Login/>}/>  
     <Route path="/login" element={<Login/>}/>

        <Route element ={<Private/>}>
          <Route path="chat" element={<Main/>}/>
        </Route>

     </Routes>
    </Router>
  )

}

export default PageRoutes;

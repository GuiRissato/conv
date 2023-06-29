import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// PAGES
import Main from "../pages/chat"
import Login from "../pages/login"

import Header from "../Pattern/Header";

// import Private from './Private';

function PageRoutes(){

  return(
    <Router basename='/'>
     <Routes>
     <Route path="*" element={<Login/>}/>
     <Route path="chat" element={<Main/>}/>
     {/*<Route path="/" element={<MainLayout><EnterHash/></MainLayout>}/>

        <Route element ={<Private/>}>
            <Route path="/questions" element={<Questionnaire/>}/>
        </Route>
      */}
     </Routes>
    </Router>
  )

}

export default PageRoutes;

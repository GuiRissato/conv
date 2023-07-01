import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

// COMPONENTS
import { Spa } from './styles.js';
import Header from "../Header";

function MainLayout({ children }){


  return(
    <div style={{ display:'flex', flexDirection:'column', width:"100%" }}>

    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"1.7rem" }}>
      <Header/>
    </div>

      <Spa>
        {children}
      </Spa>
    </div>
  )

}

export default MainLayout;
